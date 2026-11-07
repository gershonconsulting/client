// ─────────────────────────────────────────────────────────────────────────────
// Targets & recipients — several people per client (Olivier, 2026-11-06: "I need to
// add additional people per company to receive the reports").
// The stored format is unchanged (Settings clientEmails = comma-separated list, all
// professional addresses receive the report). This turns each client's single box
// into a list with "+ Add person" and a remove button per person; the original input
// stays in the form (hidden) and is kept in sync, so saving works as before.
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'

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
  var vals=String(inp.value||'').split(/[,;\\s]+/).filter(function(x){return x.indexOf('@')>0});
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

export function registerSettingsUi(app: Hono<any>) {
  app.use('/settings', async (c, next) => {
    await next()
    if (c.req.method !== 'GET' || !(c.res.headers.get('content-type') || '').includes('text/html')) return
    let html = await c.res.text()
    const h = new Headers(c.res.headers); h.delete('content-length')
    if (html.includes('name="ce_')) {
      const i = html.lastIndexOf('</body>')
      html = i >= 0 ? html.slice(0, i) + SCRIPT + html.slice(i) : html + SCRIPT
    }
    c.res = new Response(html, { status: c.res.status, headers: h })
  })
}
