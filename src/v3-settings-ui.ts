// ─────────────────────────────────────────────────────────────────────────────
// Targets & recipients — several people per client (Olivier, 2026-11-06: "I need to
// add additional people per company to receive the reports").
// The stored format is unchanged (Settings clientEmails = comma-separated list, all
// professional addresses receive the report). This turns each client's single box
// into a list with "+ Add person" and a remove button per person; the original input
// stays in the form (hidden) and is kept in sync, so saving works as before.
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'
import { CLIENT_REGISTRY, readSettings, servicesFor, profilesFor, clientRecipientsOf, linalysisFor, type Deps, type RegistryEntry, type V3Settings } from './v3-data'

const SCRIPT = `<script>(function(){
function build(inp){
  var wrap=document.createElement('div');wrap.className='gc-multi';
  var list=document.createElement('div');wrap.appendChild(list);
  var ph=inp.getAttribute('placeholder')||'name@company.com';
  function sync(){var v=[].map.call(list.querySelectorAll('input'),function(x){return x.value.trim()}).filter(function(x){return x}).join(', ');
    if(inp.value!==v){inp.value=v;inp.dispatchEvent(new Event('input',{bubbles:true}));inp.dispatchEvent(new Event('change',{bubbles:true}))}}
  function row(val){var r=document.createElement('div');r.style.cssText='display:flex;gap:6px;margin:0 0 6px;align-items:center';
    var e=document.createElement('input');e.type='email';e.value=val||'';e.placeholder=list.children.length?'another person@company.com':ph;
    e.style.cssText='flex:1;border:1px solid var(--border,#e5e7eb);border-radius:8px;padding:7px';e.addEventListener('input',sync);
    var x=document.createElement('button');x.type='button';x.textContent='×';x.title='Remove this person';
    x.style.cssText='border:1px solid #e5e7eb;background:#fff;border-radius:8px;width:32px;height:32px;cursor:pointer;font-size:16px;color:#b91c1c';
    x.onclick=function(){r.remove();if(!list.children.length)row('');sync()};
    r.appendChild(e);r.appendChild(x);list.appendChild(r);return e}
  var vals=String(inp.value||inp.getAttribute('data-onfile')||'').split(/[,;\\s]+/).filter(function(x){return x.indexOf('@')>0});
  if(!vals.length)vals=[''];vals.forEach(function(v){row(v)});
  var add=document.createElement('button');add.type='button';add.textContent='+ Add person';
  add.style.cssText='border:0;background:none;color:#CC3333;font-weight:800;cursor:pointer;padding:2px 0;font-size:13px';
  add.onclick=function(){row('').focus()};wrap.appendChild(add);
  inp.style.display='none';inp.parentNode.insertBefore(wrap,inp);
}
document.querySelectorAll('input[name^="ce_"]').forEach(build);
var th=[].filter.call(document.querySelectorAll('th'),function(t){return /Client report recipients/.test(t.textContent)})[0];
if(th)th.innerHTML='Client report recipients <span style="font-weight:400;text-transform:none">— every person listed receives the report (professional emails only)</span>';
})();</script>`

// ─────────────────────────────────────────────────────────────────────────────
// "What we already have for each client" (Olivier, 2026-11-09: "Targets & recipients — make
// sure to display what we already have in database for the clients with the profile we do
// campaigns for"). One row per client: the LinkedIn profile(s) we run the campaign for, the
// report recipients on file, the current Straight-in report, the Streak pipeline(s) and the
// Linalysis account. Red = missing, with the page where it is added. Recipient boxes are
// prefilled with the addresses on file instead of showing an empty box.
// ─────────────────────────────────────────────────────────────────────────────
const esc = (v: any) => String(v ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as any)[ch])
const emailsOf = (v: string) => String(v || '').split(/[,;\s]+/).map(x => x.trim()).filter(x => /.+@.+\..+/.test(x))
interface OnFile { pipelines: { name: string; url: string }[]; reports: { label: string; url: string }[] }

async function onFileOf(kv: any, deps: Deps, s: V3Settings): Promise<Record<string, OnFile>> {
  let wk: any = null
  try { const ks = (await kv.list({ prefix: 'straightin:week:' })).keys.map((k: any) => k.name).sort(); if (ks.length) wk = JSON.parse((await kv.get(ks[ks.length - 1])) || '{}') } catch { /* none stored */ }
  const out: Record<string, OnFile> = {}
  await Promise.all(CLIENT_REGISTRY.map(async (r: RegistryEntry) => {
    const companies = (await Promise.all(r.keys.map(k => deps.getCompany(kv, k).catch(() => null)))).filter(Boolean) as any[]
    const reps = new Map<string, string>()
    if (servicesFor(r, s).network) {
      for (const p of profilesFor(r, s)) { const id = (p.straightinUrl.match(/crp_[A-Za-z0-9_-]+/) || [''])[0]; if (id) reps.set(id, p.fullName || p.name) }
      for (const e of (wk?.entries || [])) if (e.reportId && e.companyKey && r.keys.includes(e.companyKey) && !reps.has(e.reportId)) reps.set(e.reportId, e.label || e.companyKey)
      for (const co of companies) if (co?.straightInReportId && !reps.has(co.straightInReportId)) reps.set(co.straightInReportId, co.name || co.key)
    }
    out[String(r.no)] = {
      pipelines: companies.filter(co => co?.pipelineKey).map(co => ({ name: (r.accountKeys || {})[co.key] || co.name || co.key, url: co.url && /streak\.com/.test(co.url) ? co.url : `https://www.streak.com/a/pipelines/${co.pipelineKey}` })),
      reports: [...reps.entries()].map(([id, label]) => ({ label, url: `https://prospecthub.straight-in.com/r/campaign-report/${id}` })),
    }
  }))
  return out
}

export function onFileCard(s: V3Settings, onFile: Record<string, OnFile>): string {
  const muted = (t: string) => `<span style="color:var(--muted)">${t}</span>`
  const link = (u: string, t: string) => `<a href="${esc(u)}" target="_blank" rel="noopener" style="color:#CC3333">${esc(t)}</a>`
  const missing = (where: string, href: string) => `<span style="color:#b91c1c">● Missing</span> ${muted('— add in')} <a href="${href}" style="color:#CC3333">${where}</a>`
  const rows = CLIENT_REGISTRY.map(r => {
    const f = onFile[String(r.no)] || { pipelines: [], reports: [] }
    const sv: any = servicesFor(r, s)
    const ps = profilesFor(r, s)
    const recips = emailsOf(clientRecipientsOf(r, s))
    const saved = emailsOf(String((s.clientEmails || {})[String(r.no)] || '')).length > 0
    const people = ps.length
      ? ps.map(p => `<div><b>${esc(p.fullName || p.name)}</b>${p.linkedinUrl ? ' · ' + link(p.linkedinUrl, 'LinkedIn') : ''}</div>`).join('')
      : f.reports.length ? f.reports.map(x => `<div><b>${esc(x.label)}</b></div>`).join('')
      : recips.length ? recips.map(e => `<div>${esc(e)}</div>`).join('') : muted('Not on file')
    const lin = linalysisFor(r, s)
    const off = (k: string) => muted('— ' + k + ' not sold')
    const on = ['promote', 'network', 'engage'].filter(k => sv[k]).map(k => k[0].toUpperCase() + k.slice(1)).join(' + ') || 'No service on'
    return `<tr><td style="white-space:nowrap"><span class="cno">#${r.no}</span> <b>${esc(r.name)}</b><div style="font-size:11px;color:var(--muted)">${on}</div></td>
      <td>${people}</td>
      <td>${recips.length ? recips.map(e => `<div>${esc(e)}</div>`).join('') + `<div style="font-size:11px;color:var(--muted)">${saved ? 'Saved on this page' : 'From the client registry'}</div>` : missing('the list below', '#recipients')}</td>
      <td>${!sv.network ? off('Network') : f.reports.length ? f.reports.map(x => `<div>${link(x.url, x.label)}</div>`).join('') : missing('/straightin', '/straightin')}</td>
      <td>${!sv.engage ? off('Engage') : f.pipelines.length ? f.pipelines.map(x => `<div>${link(x.url, x.name)}</div>`).join('') : missing('Admin', '/admin')}</td>
      <td>${lin.length ? lin.map(e => `<div>${esc(e)}</div>`).join('') : `<span style="color:#b76b00">● Not mapped</span>`}</td></tr>`
  }).join('')
  return `<div class="card" style="padding:0;overflow:auto;margin-bottom:16px"><div class="card-header" style="padding:14px 16px 0"><h3><i class="fas fa-database" style="color:var(--brand)"></i> What we already have for each client</h3></div>
<div class="hint" style="padding:4px 16px 8px">Read from the database: the LinkedIn profile(s) we run the campaign for, who receives the monthly report, the current Straight-in campaign report, the Streak pipeline and the Linalysis account. Red = missing, with where to add it.</div>
<table class="ctable"><thead><tr><th>Client</th><th>Campaign profile(s)</th><th>Report recipients</th><th>Straight-in report</th><th>Streak pipeline</th><th>Linalysis account</th></tr></thead><tbody>${rows}</tbody></table></div>`
}

export function registerSettingsUi(app: Hono<any>, deps?: Deps) {
  app.use('/settings', async (c, next) => {
    await next()
    if (c.req.method !== 'GET' || !(c.res.headers.get('content-type') || '').includes('text/html')) return
    let html = await c.res.text()
    const h = new Headers(c.res.headers); h.delete('content-length')
    if (deps && html.includes('id="settingsForm"')) {
      try {
        const s = await readSettings(c.env.COMPANIES_KV)
        const card = onFileCard(s, await onFileOf(c.env.COMPANIES_KV, deps, s))
        html = html.replace('<form id="settingsForm">', card + '<form id="settingsForm">')
        // prefill each client's recipient list with the addresses on file
        for (const r of CLIENT_REGISTRY) html = html.replace(`name="ce_${r.no}"`, `name="ce_${r.no}" data-onfile="${esc(clientRecipientsOf(r, s))}"`)
        html = html.replace(/(<table class="ctable"><thead><tr><th>Client<\/th><th>Posts target)/, '<span id="recipients"></span>$1')
      } catch { /* page still works without the card */ }
    }
    if (html.includes('name="ce_')) {
      const i = html.lastIndexOf('</body>')
      html = i >= 0 ? html.slice(0, i) + SCRIPT + html.slice(i) : html + SCRIPT
    }
    c.res = new Response(html, { status: c.res.status, headers: h })
  })
}
