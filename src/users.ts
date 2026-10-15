// ─────────────────────────────────────────────────────────────────────────────
// Sign in with LinkedIn + Users admin panel (owner only).
//
//   GET  /api/auth/linkedin/login      → LinkedIn (app "Client", id 78up2kwkdki2kh)
//   GET  /api/auth/linkedin/callback   ← registered on LinkedIn: https://client.gershon.ai/api/auth/linkedin/callback
//   GET  /api/auth/linkedin/health     → is it wired? (never returns a secret)
//   GET  /users                        → Users panel (owner only: olivier@attia.com & Olivier's other addresses)
//   /api/users  GET | POST | PATCH | DELETE ;  POST /api/users/invite
//
// Users live in KV (COMPANIES_KV, key __app_users__). A LinkedIn account gets in
// only when it matches a user: bound LinkedIn id → e-mail → owner address →
// one-time invite link (/login?invite=…) → exact name + LinkedIn profile set.
// The existing e-mail/password login keeps working as a fallback.
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'

export interface AppUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'team'
  linkedin?: string
  linkedinEmail?: string
  linkedinSub?: string
  picture?: string
  lastLogin?: string
  inviteToken?: string
  invitedAt?: string
  createdAt?: string
}

export interface UsersDeps {
  createSessionToken: (env: any, user: string) => Promise<string>
  sessionUser: (c: any) => Promise<string | null>
  sessionCookie: string
  sessionTtl: number
}

const USERS_KEY = '__app_users__'
const DEFAULT_CLIENT_ID = '78up2kwkdki2kh'
const SITE = 'https://client.gershon.ai'
/** Olivier — always let in, always owner of the Users panel. The password login (admin@gershonconsulting) is his too. */
export const OWNER_EMAILS = ['olivier@attia.com', 'oattia@gmail.com', 'olivier@gershonconsulting.com', 'admin@gershonconsulting', 'admin@gershonconsulting.com']
const DEFAULT_USERS: AppUser[] = [{ id: 'olivier', name: 'Olivier Attia', email: 'olivier@attia.com', role: 'admin', linkedinEmail: 'oattia@gmail.com' }]

const esc = (s: any) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const norm = (s: any) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9@.]+/g, ' ').trim()
const token = () => crypto.randomUUID().replace(/-/g, '')

export function siteUrl(c: any): string {
  const host = new URL(c.req.url).host
  return host.endsWith('gershon.ai') ? SITE : `https://${host}`
}

export function linkedInConfigured(env: any): boolean { return !!env.LINKEDIN_CLIENT_SECRET }

export function normalizeLinkedInUrl(raw: any): string | null {
  const m = String(raw ?? '').trim().match(/linkedin\.com\/in\/([^/?#\s]+)/i)
  if (!m) return null
  let slug = m[1]
  try { slug = decodeURIComponent(slug) } catch { /* keep */ }
  return `https://www.linkedin.com/in/${slug.toLowerCase()}/`
}
const slugOf = (u: any) => (normalizeLinkedInUrl(u) || '').slice(28, -1)

export async function loadUsers(kv: KVNamespace): Promise<AppUser[]> {
  try {
    const raw = await kv.get(USERS_KEY)
    const list = raw ? JSON.parse(raw) : null
    if (Array.isArray(list) && list.length) return list
  } catch { /* fall through */ }
  return DEFAULT_USERS
}
async function saveUsers(kv: KVNamespace, users: AppUser[]) { await kv.put(USERS_KEY, JSON.stringify(users)) }

export function isOwnerUser(u: string | null | undefined, users: AppUser[]): boolean {
  const e = norm(u)
  if (!e) return false
  if (OWNER_EMAILS.includes(e)) return true
  const m = users.find(x => norm(x.email) === e)
  return !!m && m.role === 'admin' && (OWNER_EMAILS.includes(norm(m.email)) || OWNER_EMAILS.includes(norm(m.linkedinEmail)))
}

interface LiIdentity { sub: string; email?: string; name?: string; given_name?: string; family_name?: string; picture?: string }

function matchUser(users: AppUser[], li: LiIdentity): AppUser | null {
  const bySub = users.find(m => m.linkedinSub && m.linkedinSub === li.sub)
  if (bySub) return bySub
  const email = norm(li.email)
  if (email) {
    const byEmail = users.find(m => norm(m.email) === email || (m.linkedinEmail && norm(m.linkedinEmail) === email))
    if (byEmail) return byEmail
    if (OWNER_EMAILS.includes(email)) {
      return users.find(m => OWNER_EMAILS.includes(norm(m.email)) || OWNER_EMAILS.includes(norm(m.linkedinEmail)))
        ?? { id: 'olivier', name: li.name || 'Olivier Attia', email, role: 'admin' }
    }
  }
  const liName = norm(li.name || [li.given_name, li.family_name].filter(Boolean).join(' '))
  if (liName) {
    const byName = users.filter(m => !m.linkedinSub && !!m.linkedin && norm(m.name) === liName)
    if (byName.length === 1) return byName[0]
  }
  return null
}

function publicUser(m: AppUser, site: string) {
  const { linkedinSub, inviteToken, ...rest } = m
  return {
    ...rest,
    linkedinLinked: !!linkedinSub,
    inviteUrl: inviteToken && !linkedinSub ? `${site}/login?invite=${inviteToken}` : undefined,
    owner: OWNER_EMAILS.includes(norm(m.email)) || OWNER_EMAILS.includes(norm(m.linkedinEmail)),
  }
}

const cookie = (name: string, value: string, maxAge: number) => `${name}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`
function readCookie(header: string | undefined, name: string): string | null {
  if (!header) return null
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=')
    if (k === name) return rest.join('=')
  }
  return null
}

function inviteEmailHtml(name: string, url: string): string {
  return `<!doctype html><html><body style="margin:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1d1d1f;">
<div style="max-width:560px;margin:0 auto;padding:28px 16px;">
  <div style="margin-bottom:18px;font-weight:800;font-size:18px;color:#FE1B04;">Gershon <span style="color:#6e6e73;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Client results</span></div>
  <div style="background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:24px;">
    <h1 style="margin:0 0 10px;font-size:20px;">Hi ${esc(name.split(' ')[0])}, your access is ready</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:#3a3a3c;">Olivier Attia gave you access to <strong>client.gershon.ai</strong>, the Gershon Consulting client results dashboard. Sign in once with your LinkedIn account through the button below — after that, the normal “Sign in with LinkedIn” button works.</p>
    <a href="${esc(url)}" style="display:inline-block;background:#0a66c2;color:#fff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px;font-size:15px;">Sign in with LinkedIn</a>
    <p style="margin:18px 0 0;font-size:12px;color:#6e6e73;">This link is personal and works once. If the button does not work, open: ${esc(url)}</p>
  </div>
</div></body></html>`
}

// ── Users page ───────────────────────────────────────────────────────────────
export function usersPageBody(): string {
  return `
<style>
 .u-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:18px}
 @media(max-width:700px){.u-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}
 .u-kpi{background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px 16px}
 .u-kpi .l{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}
 .u-kpi .v{font-size:24px;font-weight:800;letter-spacing:-.02em}
 .u-form{display:grid;grid-template-columns:1fr 1fr;gap:12px}
 @media(max-width:700px){.u-form{grid-template-columns:1fr}}
 .u-form .full{grid-column:1/-1}
 .u-form label{display:block;font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:5px}
 .u-in{width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font:inherit;font-size:14px;background:#fff;box-sizing:border-box}
 .u-in:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px rgba(254,27,4,.12)}
 .u-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px;padding:14px 18px;border-top:1px solid #f0f0f2}
 .u-av{width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0;background:var(--brand);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:14px}
 .u-main{flex:1;min-width:220px}
 .u-meta{font-size:13px;color:var(--text-muted);display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:2px}
 .u-pill{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:2px 8px;border-radius:999px;border:1px solid var(--border);color:var(--text-muted);background:#fff}
 .u-pill.admin{color:#a80f02;background:#fff5f5;border-color:#ffc9c2}
 .u-pill.owner{background:#1d1d1f;color:#fff;border-color:#1d1d1f}
 .u-pill.ok{color:#057642;background:#effaf3;border-color:#bfe6cd;text-transform:none;letter-spacing:0}
 .u-pill.wait{color:#8a5300;background:#fff8eb;border-color:#f5d9a6;text-transform:none;letter-spacing:0}
 .u-act{display:flex;flex-wrap:wrap;gap:6px}
 .u-act .btn{font-size:12.5px;padding:6px 10px}
 .u-msg{border-radius:8px;padding:10px 14px;font-size:14px;margin:0 0 14px;display:none}
 .u-msg.ok{display:block;background:#effaf3;border:1px solid #bfe6cd;color:#05532f}
 .u-msg.err{display:block;background:#fff5f5;border:1px solid #ffc9c2;color:#a80f02}
 .u-edit{width:100%;display:grid;grid-template-columns:1fr 1fr;gap:10px}
 @media(max-width:700px){.u-edit{grid-template-columns:1fr}}
</style>
<div id="cfgNote"></div>
<div class="u-kpis" id="kpis"></div>
<div class="card" style="margin-bottom:18px">
  <h2 style="margin:0 0 4px;font-size:16px">Create a user</h2>
  <p class="muted" style="margin:0 0 14px;font-size:13px">Paste their LinkedIn profile. They get a personal invite link — their first LinkedIn sign-in through it binds their account; after that the normal “Sign in with LinkedIn” button works.</p>
  <form id="createForm" class="u-form">
    <div class="full"><label>LinkedIn profile link *</label><input class="u-in" name="linkedin" required placeholder="https://www.linkedin.com/in/…"></div>
    <div><label>Full name *</label><input class="u-in" name="name" required placeholder="Jane Doe"></div>
    <div><label>E-mail (the invite goes here)</label><input class="u-in" name="email" type="email" placeholder="name@company.com"></div>
    <div><label>LinkedIn login e-mail, if different (optional)</label><input class="u-in" name="linkedinEmail" type="email" placeholder="optional"></div>
    <div><label>Role</label><select class="u-in" name="role"><option value="team">Team</option><option value="admin">Admin</option></select></div>
    <div class="full" style="display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin-top:4px">
      <button class="btn primary" type="submit" id="createBtn"><i class="fas fa-user-plus"></i> Create user</button>
      <label style="display:inline-flex;align-items:center;gap:8px;margin:0;font-size:13px;font-weight:500;color:var(--text)"><input type="checkbox" name="send" checked style="accent-color:#FE1B04"> E-mail the invite</label>
    </div>
  </form>
</div>
<div class="u-msg" id="msg"></div>
<div class="card" style="padding:0">
  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px">
    <h2 style="margin:0;font-size:16px">Users</h2>
    <input class="u-in" id="q" placeholder="Search name, e-mail, LinkedIn…" style="max-width:280px">
  </div>
  <div id="list"><div class="u-row muted">Loading…</div></div>
</div>
<script>
(function(){
  var users=[], configured=true, editing=null;
  var $=function(id){return document.getElementById(id)};
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var day=function(d){return d?new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):''};
  function msg(kind,text){var m=$('msg');m.className='u-msg '+kind;m.textContent=text;window.scrollTo({top:m.offsetTop-90,behavior:'smooth'})}
  function nameFromUrl(u){var m=String(u).match(/linkedin\\.com\\/in\\/([^/?#\\s]+)/i);if(!m)return'';var s=m[1];try{s=decodeURIComponent(s)}catch(e){}
    return s.split('-').filter(function(p){return p&&!/\\d/.test(p)}).map(function(p){return p[0].toUpperCase()+p.slice(1)}).join(' ')}
  function api(method,url,body){return fetch(url,{method:method,headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined}).then(function(r){return r.json().then(function(d){if(!r.ok)throw new Error(d.error||'Request failed');return d})})}
  function load(){return api('GET','/api/users').then(function(d){users=d.users||[];configured=d.linkedinConfigured;render()}).catch(function(e){msg('err',e.message)})}
  function render(){
    $('cfgNote').innerHTML=configured?'':'<div class="u-msg err" style="display:block"><b>LinkedIn sign-in is not switched on yet.</b> One last setting (the LinkedIn password of this app) must be added in Cloudflare by Charles. Until then the LinkedIn button is grey. You can already add people here — their invite will work the moment it is switched on.</div>';
    var c={t:users.length,a:users.filter(function(u){return u.linkedinLinked}).length,ad:users.filter(function(u){return u.role==='admin'}).length};
    $('kpis').innerHTML=[['Users',c.t],['Signed in',c.a],['Waiting for first sign-in',c.t-c.a],['Admins',c.ad]].map(function(k){return '<div class="u-kpi"><div class="l">'+k[0]+'</div><div class="v">'+k[1]+'</div></div>'}).join('');
    var q=$('q').value.trim().toLowerCase();
    var list=users.filter(function(u){return !q||[u.name,u.email,u.linkedin,u.linkedinEmail].some(function(x){return String(x||'').toLowerCase().indexOf(q)>=0})})
      .sort(function(a,b){return (b.owner-a.owner)||a.name.localeCompare(b.name)});
    $('list').innerHTML=list.length?list.map(row).join(''):'<div class="u-row muted">No user matches.</div>';
  }
  function row(u){
    if(editing===u.id){return '<div class="u-row"><div class="u-edit" data-id="'+esc(u.id)+'">'+
      ['name','email','linkedin','linkedinEmail'].map(function(f){return '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">'+{name:'Full name',email:'E-mail',linkedin:'LinkedIn profile link',linkedinEmail:'LinkedIn login e-mail'}[f]+'</label><input class="u-in" data-f="'+f+'" value="'+esc(u[f]||'')+'"></div>'}).join('')+
      '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">Role</label><select class="u-in" data-f="role"><option value="team"'+(u.role==='team'?' selected':'')+'>Team</option><option value="admin"'+(u.role==='admin'?' selected':'')+'>Admin</option></select></div>'+
      '<div style="display:flex;align-items:flex-end;gap:8px"><button class="btn primary" data-a="save" data-id="'+esc(u.id)+'">Save</button><button class="btn" data-a="cancel">Cancel</button></div></div></div>'}
    var ini=(u.name||'?').split(/\\s+/).slice(0,2).map(function(p){return p[0]}).join('').toUpperCase();
    var av=u.picture?'<img class="u-av" src="'+esc(u.picture)+'" referrerpolicy="no-referrer" alt="">':'<span class="u-av">'+esc(ini)+'</span>';
    var st=u.linkedinLinked?'<span class="u-pill ok">Active'+(u.lastLogin?' · last sign-in '+day(u.lastLogin):'')+'</span>':'<span class="u-pill wait">'+(u.invitedAt?'Invited '+day(u.invitedAt)+' · ':'')+'not signed in yet</span>';
    var acts='';
    if(!u.linkedinLinked){acts+='<button class="btn" data-a="copy" data-id="'+esc(u.id)+'"><i class="fas fa-link"></i> Copy invite link</button>';if(u.email)acts+='<button class="btn" data-a="mail" data-id="'+esc(u.id)+'"><i class="fas fa-envelope"></i> E-mail invite</button>'}
    else if(!u.owner)acts+='<button class="btn" data-a="reset" data-id="'+esc(u.id)+'">Reset LinkedIn</button>';
    acts+='<button class="btn" data-a="edit" data-id="'+esc(u.id)+'">Edit</button>';
    if(!u.owner)acts+='<button class="btn" data-a="del" data-id="'+esc(u.id)+'" style="color:var(--text-muted)">Remove</button>';
    return '<div class="u-row">'+av+'<div class="u-main"><div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px"><b>'+esc(u.name)+'</b><span class="u-pill '+(u.role==='admin'?'admin':'')+'">'+u.role+'</span>'+(u.owner?'<span class="u-pill owner">owner</span>':'')+st+'</div>'+
      '<div class="u-meta">'+(u.email?'<span>'+esc(u.email)+'</span>':'')+(u.linkedin?'<a href="'+esc(u.linkedin)+'" target="_blank" rel="noreferrer" style="color:#0a66c2">LinkedIn profile ↗</a>':'<span style="color:#8a5300">No LinkedIn profile</span>')+(u.linkedinEmail&&u.linkedinEmail!==u.email?'<span>LinkedIn: '+esc(u.linkedinEmail)+'</span>':'')+'</div></div><div class="u-act">'+acts+'</div></div>';
  }
  function copy(t){(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){msg('ok','Invite link copied.')},function(){window.prompt('Copy this invite link',t)})}
  function byId(id){return users.find(function(u){return u.id===id})}
  $('q').addEventListener('input',render);
  $('createForm').linkedin.addEventListener('input',function(e){var f=$('createForm');if(!f.name.dataset.touched)f.name.value=nameFromUrl(e.target.value)});
  $('createForm').name.addEventListener('input',function(e){e.target.dataset.touched='1'});
  $('createForm').addEventListener('submit',function(e){e.preventDefault();var f=e.target,b=$('createBtn');b.disabled=true;
    var body={linkedin:f.linkedin.value,name:f.name.value,email:f.email.value,linkedinEmail:f.linkedinEmail.value,role:f.role.value};
    api('POST','/api/users',body).then(function(d){
      if(f.send.checked&&body.email){return api('POST','/api/users/invite',{id:d.user.id,send:true}).then(function(){return d.user.name+' created — invite e-mailed to '+body.email+'.'},function(er){return d.user.name+' created — e-mail not sent ('+er.message+'). Copy the invite link below.'})}
      return d.user.name+' created — copy the invite link below and send it to them.'
    }).then(function(t){msg('ok',t);f.reset();delete f.name.dataset.touched;return load()}).catch(function(er){msg('err',er.message)}).then(function(){b.disabled=false})});
  $('list').addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a,id=b.dataset.id,u=byId(id);
    if(a==='copy'){if(u.inviteUrl)copy(u.inviteUrl);else api('POST','/api/users/invite',{id:id}).then(function(d){copy(d.inviteUrl);load()}).catch(function(er){msg('err',er.message)})}
    if(a==='mail')api('POST','/api/users/invite',{id:id,send:true}).then(function(){msg('ok','Invite e-mailed to '+u.email+'.');load()}).catch(function(er){msg('err',er.message)});
    if(a==='reset'&&confirm('Reset '+u.name+"'s LinkedIn link? They will need a new invite to sign in."))api('PATCH','/api/users',{id:id,unlink:true}).then(function(){msg('ok',u.name+"'s LinkedIn link reset — a new invite link is ready.");load()}).catch(function(er){msg('err',er.message)});
    if(a==='del'&&confirm('Remove '+u.name+'? They will no longer be able to sign in.'))api('DELETE','/api/users?id='+encodeURIComponent(id)).then(function(){msg('ok',u.name+' removed.');load()}).catch(function(er){msg('err',er.message)});
    if(a==='edit'){editing=id;render()}
    if(a==='cancel'){editing=null;render()}
    if(a==='save'){var box=b.closest('.u-edit'),body={id:id};box.querySelectorAll('[data-f]').forEach(function(i){body[i.dataset.f]=i.value});
      api('PATCH','/api/users',body).then(function(){editing=null;msg('ok','Saved.');load()}).catch(function(er){msg('err',er.message)})}
  });
  load();
})();
</script>`
}

// ── Routes ───────────────────────────────────────────────────────────────────
export function registerUsers(app: Hono<any>, deps: UsersDeps, shell: (body: string) => string) {
  const fail = (c: any, reason: string, detail?: string) => {
    const u = new URL('/login', siteUrl(c))
    u.searchParams.set('li_error', reason)
    if (detail) u.searchParams.set('detail', detail.slice(0, 160))
    const h = new Headers({ Location: u.toString() })
    h.append('Set-Cookie', cookie('li_state', '', 0)); h.append('Set-Cookie', cookie('li_invite', '', 0))
    return new Response(null, { status: 302, headers: h })
  }

  app.get('/api/auth/linkedin/health', (c) => c.json({
    site: siteUrl(c),
    redirectUri: `${siteUrl(c)}/api/auth/linkedin/callback`,
    clientId: c.env.LINKEDIN_CLIENT_ID || `${DEFAULT_CLIENT_ID} (default)`,
    clientSecretConfigured: linkedInConfigured(c.env),
  }))

  app.get('/api/auth/linkedin/login', (c) => {
    if (!linkedInConfigured(c.env)) return fail(c, 'not_configured')
    const state = crypto.randomUUID()
    const nextRaw = c.req.query('next') || '/dashboard'
    const next = nextRaw.startsWith('/') && !nextRaw.startsWith('//') ? nextRaw : '/dashboard'
    const invite = (c.req.query('invite') || '').replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64)
    const url = new URL('https://www.linkedin.com/oauth/v2/authorization')
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('client_id', c.env.LINKEDIN_CLIENT_ID || DEFAULT_CLIENT_ID)
    url.searchParams.set('redirect_uri', `${siteUrl(c)}/api/auth/linkedin/callback`)
    url.searchParams.set('scope', 'openid profile email')
    url.searchParams.set('state', state)
    const h = new Headers({ Location: url.toString() })
    h.append('Set-Cookie', cookie('li_state', state + '|' + encodeURIComponent(next), 600))
    if (invite) h.append('Set-Cookie', cookie('li_invite', invite, 600))
    return new Response(null, { status: 302, headers: h })
  })

  app.get('/api/auth/linkedin/callback', async (c) => {
    if (c.req.query('error')) return fail(c, 'cancelled', c.req.query('error_description') || '')
    const code = c.req.query('code'), state = c.req.query('state')
    const ck = c.req.header('Cookie')
    const [expected, nextEnc] = (readCookie(ck, 'li_state') || '').split('|')
    if (!code || !state || !expected || state !== expected) return fail(c, 'state')
    const secret = c.env.LINKEDIN_CLIENT_SECRET
    if (!secret) return fail(c, 'not_configured')

    const tokRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: `${siteUrl(c)}/api/auth/linkedin/callback`, client_id: c.env.LINKEDIN_CLIENT_ID || DEFAULT_CLIENT_ID, client_secret: secret }),
    })
    if (!tokRes.ok) return fail(c, 'token', await tokRes.text().catch(() => ''))
    const { access_token } = await tokRes.json() as { access_token?: string }
    if (!access_token) return fail(c, 'token')
    const infoRes = await fetch('https://api.linkedin.com/v2/userinfo', { headers: { Authorization: `Bearer ${access_token}` } })
    if (!infoRes.ok) return fail(c, 'userinfo', await infoRes.text().catch(() => ''))
    const li = await infoRes.json() as LiIdentity
    if (!li.sub) return fail(c, 'userinfo')

    const kv = c.env.COMPANIES_KV as KVNamespace
    const users = await loadUsers(kv)
    const invite = readCookie(ck, 'li_invite')
    const invited = invite ? users.find(m => m.inviteToken && m.inviteToken === invite && (!m.linkedinSub || m.linkedinSub === li.sub)) : undefined
    const bound = users.find(m => m.linkedinSub === li.sub)
    const member = (invited && (!bound || bound.id === invited.id) ? invited : null) ?? matchUser(users, li)
    if (!member) return fail(c, 'not_registered', li.name || li.email || '')

    try {
      const now = new Date().toISOString()
      const updated: AppUser = { ...member, linkedinSub: li.sub, linkedinEmail: member.linkedinEmail || li.email || undefined, lastLogin: now, picture: li.picture || member.picture, inviteToken: undefined }
      const exists = users.some(m => m.id === member.id)
      await saveUsers(kv, exists ? users.map(m => m.id === member.id ? updated : m) : [...users, updated])
    } catch { /* sign-in still succeeds */ }

    const sessionId = member.email || li.email || member.id
    const tokenStr = await deps.createSessionToken(c.env, sessionId)
    let next = '/dashboard'
    try { const n = decodeURIComponent(nextEnc || ''); if (n.startsWith('/') && !n.startsWith('//')) next = n } catch { /* keep */ }
    const h = new Headers({ Location: new URL(next, siteUrl(c)).toString() })
    h.append('Set-Cookie', cookie(deps.sessionCookie, tokenStr, deps.sessionTtl))
    h.append('Set-Cookie', cookie('li_state', '', 0)); h.append('Set-Cookie', cookie('li_invite', '', 0))
    return new Response(null, { status: 302, headers: h })
  })

  // ── owner-only admin ──
  const owner = async (c: any): Promise<string | Response> => {
    const u = await deps.sessionUser(c)
    if (!u) return c.json({ error: 'Not signed in' }, 401)
    if (!isOwnerUser(u, await loadUsers(c.env.COMPANIES_KV))) return c.json({ error: 'Only Olivier (owner) can manage users' }, 403)
    return u
  }

  app.get('/users', async (c) => {
    const u = await deps.sessionUser(c)
    if (!u || !isOwnerUser(u, await loadUsers(c.env.COMPANIES_KV))) return c.redirect('/dashboard', 302)
    c.header('x-gc-v3', '1')
    return c.html(shell(usersPageBody()))
  })

  app.get('/api/users', async (c) => {
    const g = await owner(c); if (g instanceof Response) return g
    const users = await loadUsers(c.env.COMPANIES_KV)
    return c.json({ users: users.map(m => publicUser(m, siteUrl(c))), linkedinConfigured: linkedInConfigured(c.env) })
  })

  app.post('/api/users', async (c) => {
    const g = await owner(c); if (g instanceof Response) return g
    const b = await c.req.json().catch(() => ({} as any))
    const linkedin = normalizeLinkedInUrl(b.linkedin)
    if (!linkedin) return c.json({ error: 'Paste the LinkedIn profile link (https://www.linkedin.com/in/…)' }, 400)
    const name = String(b.name ?? '').trim()
    if (!name) return c.json({ error: 'Full name is required' }, 400)
    const email = String(b.email ?? '').trim().toLowerCase()
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return c.json({ error: 'E-mail looks wrong' }, 400)
    const kv = c.env.COMPANIES_KV
    const users = await loadUsers(kv)
    const dupe = users.find(m => (m.linkedin && slugOf(m.linkedin) === slugOf(linkedin)) || (email && norm(m.email) === email))
    if (dupe) return c.json({ error: `${dupe.name} already has this ${email && norm(dupe.email) === email ? 'e-mail' : 'LinkedIn profile'}` }, 409)
    const now = new Date().toISOString()
    const m: AppUser = {
      id: (norm(name).replace(/[^a-z0-9]+/g, '-') || 'user') + '-' + Date.now().toString(36),
      name, email, role: b.role === 'admin' ? 'admin' : 'team', linkedin,
      linkedinEmail: String(b.linkedinEmail ?? '').trim().toLowerCase() || undefined,
      inviteToken: token(), invitedAt: now, createdAt: now,
    }
    await saveUsers(kv, [...users, m])
    return c.json({ ok: true, user: publicUser(m, siteUrl(c)) })
  })

  app.patch('/api/users', async (c) => {
    const g = await owner(c); if (g instanceof Response) return g
    const b = await c.req.json().catch(() => ({} as any))
    const kv = c.env.COMPANIES_KV
    const users = await loadUsers(kv)
    const i = users.findIndex(m => m.id === b.id)
    if (i < 0) return c.json({ error: 'User not found' }, 404)
    const m = { ...users[i] }
    if (b.name !== undefined) { const n = String(b.name).trim(); if (!n) return c.json({ error: 'Name cannot be empty' }, 400); m.name = n }
    if (b.email !== undefined) m.email = String(b.email).trim().toLowerCase()
    if (b.linkedinEmail !== undefined) m.linkedinEmail = String(b.linkedinEmail).trim().toLowerCase() || undefined
    if (b.linkedin !== undefined && String(b.linkedin).trim()) {
      const l = normalizeLinkedInUrl(b.linkedin); if (!l) return c.json({ error: 'Not a LinkedIn profile link' }, 400); m.linkedin = l
    }
    if (b.role !== undefined) m.role = b.role === 'admin' ? 'admin' : 'team'
    if (b.unlink) { m.linkedinSub = undefined; m.inviteToken = token(); m.invitedAt = new Date().toISOString() }
    const isOwnerRow = OWNER_EMAILS.includes(norm(users[i].email)) || OWNER_EMAILS.includes(norm(users[i].linkedinEmail))
    if (isOwnerRow && m.role !== 'admin') return c.json({ error: 'The owner stays admin' }, 400)
    const next = [...users]; next[i] = m
    await saveUsers(kv, next)
    return c.json({ ok: true, user: publicUser(m, siteUrl(c)) })
  })

  app.delete('/api/users', async (c) => {
    const g = await owner(c); if (g instanceof Response) return g
    const id = c.req.query('id')
    const kv = c.env.COMPANIES_KV
    const users = await loadUsers(kv)
    const m = users.find(x => x.id === id)
    if (!m) return c.json({ error: 'User not found' }, 404)
    if (OWNER_EMAILS.includes(norm(m.email)) || OWNER_EMAILS.includes(norm(m.linkedinEmail))) return c.json({ error: 'The owner cannot be removed' }, 400)
    await saveUsers(kv, users.filter(x => x.id !== id))
    return c.json({ ok: true })
  })

  app.post('/api/users/invite', async (c) => {
    const g = await owner(c); if (g instanceof Response) return g
    const b = await c.req.json().catch(() => ({} as any))
    const kv = c.env.COMPANIES_KV
    const users = await loadUsers(kv)
    const i = users.findIndex(m => m.id === b.id)
    if (i < 0) return c.json({ error: 'User not found' }, 404)
    const m = { ...users[i] }
    if (m.linkedinSub) return c.json({ error: `${m.name} already signs in with LinkedIn — use "Reset LinkedIn" first` }, 409)
    if (!m.inviteToken || b.regenerate) { m.inviteToken = token(); m.invitedAt = new Date().toISOString() }
    const next = [...users]; next[i] = m
    await saveUsers(kv, next)
    const url = `${siteUrl(c)}/login?invite=${m.inviteToken}`
    if (b.send) {
      if (!m.email) return c.json({ error: 'This user has no e-mail — copy the link instead' }, 400)
      if (!c.env.RESEND_API_KEY) return c.json({ error: 'E-mail is not configured — copy the link instead' }, 500)
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST', headers: { Authorization: `Bearer ${c.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'Gershon Consulting <reports@gershon.ai>', to: [m.email], reply_to: 'olivier@gershonconsulting.com', subject: 'Your access to Gershon client results', html: inviteEmailHtml(m.name, url) }),
      })
      if (!r.ok) return c.json({ error: 'E-mail failed: ' + (await r.text()).slice(0, 200) }, 502)
    }
    return c.json({ ok: true, sent: !!b.send, inviteUrl: url, user: publicUser(m, siteUrl(c)) })
  })
}
