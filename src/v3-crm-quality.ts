// ─────────────────────────────────────────────────────────────────────────────
// CRM quality — Fit and Interest across all clients (Olivier, 2026-11-06: "a graph
// for all our clients on % of FIT (High, Medium, Low) and same for Interest and
// the % of missing").
//
//   GET /crm-quality              signed-in page: 100% stacked bars per client + table
//   GET /api/v3/crm-quality       JSON (?fresh=1 to bypass the 30-min cache)
//
// Source: every Streak pipeline of every client we run Engage for (registry company
// keys + per-account Streak links in Settings). Active accounts only (recycled stages
// excluded), same rule as the monthly report. Dropdown values are read by their label
// and grouped into High / Medium / Low; any other label is shown as "Other".
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'
import { CLIENT_REGISTRY, readSettings, servicesFor, profilesFor, pipelineKeyOf, todayNY, type Deps } from './v3-data'

export type Bucket = 'High' | 'Medium' | 'Low' | 'Other' | 'Missing'
export const BUCKETS: Bucket[] = ['High', 'Medium', 'Low', 'Other', 'Missing']
type Dist = Record<Bucket, number>
const zero = (): Dist => ({ High: 0, Medium: 0, Low: 0, Other: 0, Missing: 0 })
const esc = (s: any) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function bucketOf(label: string): Bucket {
  const t = String(label || '').trim().toLowerCase()
  if (!t) return 'Missing'
  if (/\b(high|hot|strong|very|excellent|top|élev|eleve|fort|haut)|^a\b|^3\b|^5\b|🔥/.test(t)) return 'High'
  if (/\b(med|medium|moy|moyen|warm|average|mid)|^b\b|^2\b/.test(t)) return 'Medium'
  if (/\b(low|cold|weak|faible|bas|poor|none)|^c\b|^1\b/.test(t)) return 'Low'
  return 'Other'
}
function valueLabel(field: any, raw: any): string {
  if (raw == null || raw === '' || (Array.isArray(raw) && !raw.length)) return ''
  const items: any[] = field?.dropdownSettings?.items || field?.tagSettings?.tags || []
  const one = (v: any) => { const it = items.find(i => String(i.key) === String(v)); return it ? String(it.name ?? it.tag ?? v) : String(v) }
  return Array.isArray(raw) ? raw.map(one).join(', ') : one(raw)
}

export interface ClientQuality {
  no: number; name: string; active: number
  fieldsFound: { fit: boolean; interest: boolean }
  fit: Dist; interest: Dist
  otherLabels: string[]
  pipelines: string[]
  error?: string
}

export async function crmQuality(env: any, deps: Deps): Promise<{ clients: ClientQuality[]; total: { active: number; fit: Dist; interest: Dist }; generatedAt: string }> {
  const s = await readSettings(env.COMPANIES_KV)
  const clients: ClientQuality[] = []
  for (const r of CLIENT_REGISTRY) {
    if (!servicesFor(r, s).engage) continue
    const q: ClientQuality = { no: r.no, name: r.name, active: 0, fieldsFound: { fit: false, interest: false }, fit: zero(), interest: zero(), otherLabels: [], pipelines: [] }
    const keys = new Set<string>()
    for (const k of r.keys) { const co = await deps.getCompany(env.COMPANIES_KV, k).catch(() => null); if (co?.pipelineKey) keys.add(String(co.pipelineKey)) }
    for (const p of profilesFor(r, s)) { const k = pipelineKeyOf(p.streakUrl); if (k) keys.add(k) }
    const others = new Set<string>()
    for (const pk of keys) {
      const [pipeline, boxes] = await Promise.all([deps.callStreakAPI(`/pipelines/${pk}`).catch(() => null), deps.callStreakAPI(`/pipelines/${pk}/boxes`).catch(() => null)])
      if (!Array.isArray(boxes)) { q.error = 'Streak did not answer for one pipeline'; continue }
      q.pipelines.push(`https://www.streak.com/a/pipelines/${pk}`)
      const fields: any[] = pipeline?.fields || []
      const fitF = fields.find(f => String(f.name || '').trim().toLowerCase() === 'fit')
      const intF = fields.find(f => String(f.name || '').trim().toLowerCase() === 'interest')
      if (fitF) q.fieldsFound.fit = true
      if (intF) q.fieldsFound.interest = true
      const stageName = (k: string) => pipeline?.stages?.[k]?.name || ''
      for (const b of boxes) {
        if (deps.classifyStage(stageName(b.stageKey)) === 'recycled') continue
        q.active++
        for (const [F, d] of [[fitF, q.fit], [intF, q.interest]] as [any, Dist][]) {
          const label = F ? valueLabel(F, b.fields?.[F.key]) : ''
          const bk = bucketOf(label)
          d[bk]++
          if (bk === 'Other') others.add(label)
        }
      }
    }
    q.otherLabels = [...others].slice(0, 12)
    if (keys.size || q.error) clients.push(q)
  }
  const total = { active: 0, fit: zero(), interest: zero() }
  for (const c of clients) { total.active += c.active; for (const b of BUCKETS) { total.fit[b] += c.fit[b]; total.interest[b] += c.interest[b] } }
  return { clients, total, generatedAt: new Date().toISOString() }
}

const COLORS: Record<Bucket, string> = { High: '#057642', Medium: '#B88300', Low: '#8E9196', Other: '#4A7BC0', Missing: '#D92D20' }
const pct = (n: number, t: number) => (t > 0 ? Math.round((n / t) * 100) : 0)

function pageHtml(data: Awaited<ReturnType<typeof crmQuality>>): string {
  const rows = [{ no: 0, name: 'All clients', active: data.total.active, fit: data.total.fit, interest: data.total.interest, fieldsFound: { fit: true, interest: true }, otherLabels: [], pipelines: [] } as ClientQuality, ...data.clients]
  const used = BUCKETS.filter(b => b !== 'Other' || rows.some(r => r.fit.Other || r.interest.Other))
  const chartData = { labels: rows.map(r => r.no ? `#${r.no} ${r.name} (${r.active})` : `ALL CLIENTS (${r.active})`), fit: used.map(b => ({ b, v: rows.map(r => pct(r.fit[b], r.active)), n: rows.map(r => r.fit[b]) })), interest: used.map(b => ({ b, v: rows.map(r => pct(r.interest[b], r.active)), n: rows.map(r => r.interest[b]) })), colors: COLORS }
  const json = JSON.stringify(chartData).replace(/</g, '\\u003c')
  const cell = (d: Dist, a: number, b: Bucket) => `<td style="text-align:right;padding:7px 8px;${b === 'Missing' && d[b] ? 'color:#D92D20;font-weight:800' : ''}">${pct(d[b], a)}%<span style="color:#9a9aa0;font-size:11px"> ${d[b]}</span></td>`
  const table = rows.map(r => `<tr style="border-top:1px solid #e5e7eb;${r.no ? '' : 'background:#fafafa;font-weight:800'}"><td style="padding:7px 8px;white-space:nowrap">${r.no ? `<b>#${r.no}</b> ${esc(r.name)}` : 'All clients'}${r.pipelines.map((u, i) => ` <a href="${esc(u)}" target="_blank" style="color:#CC3333;font-size:11px">pipeline${r.pipelines.length > 1 ? ' ' + (i + 1) : ''}</a>`).join('')}${r.no && (!r.fieldsFound.fit || !r.fieldsFound.interest) ? `<div style="font-size:11px;color:#D92D20">No ${[!r.fieldsFound.fit && '"Fit"', !r.fieldsFound.interest && '"Interest"'].filter(Boolean).join(' / ')} field in the pipeline</div>` : ''}${r.error ? `<div style="font-size:11px;color:#b76b00">${esc(r.error)}</div>` : ''}</td><td style="text-align:right;padding:7px 8px">${r.active}</td>${used.map(b => cell(r.fit, r.active, b)).join('')}<td style="width:10px"></td>${used.map(b => cell(r.interest, r.active, b)).join('')}</tr>`).join('')
  const head = used.map(b => `<th style="text-align:right;padding:6px 8px;color:${COLORS[b]}">${b}</th>`).join('')
  const others = data.clients.filter(c => c.otherLabels.length).map(c => `#${c.no} ${esc(c.name)}: ${c.otherLabels.map(esc).join(', ')}`).join(' · ')
  const h = Math.max(260, rows.length * 34 + 70)
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>CRM quality — Fit &amp; Interest · Gershon</title><link rel="icon" type="image/svg+xml" href="/static/clients-icon.svg"><link rel="stylesheet" href="/static/gershon.css?v=5">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script></head>
<body style="background:#f6f6f7"><div style="max-width:1200px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,Segoe UI,sans-serif">
<div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:900;color:#CC3333;letter-spacing:.04em">GERSHON · CRM QUALITY</div><div><a href="/dashboard" style="color:#CC3333;font-weight:700">Dashboard</a> · <a href="/gaps" style="color:#CC3333;font-weight:700">Data gaps</a> · <a href="?fresh=1" style="color:#CC3333;font-weight:700">Refresh</a></div></div>
<h1 style="margin:6px 0 4px">Fit &amp; Interest in our clients' CRMs</h1>
<p style="color:#444;margin:0 0 16px">Share of <b>active accounts</b> in each client's Streak pipeline by <b>Fit</b> (how well the company matches the client's ideal US customer) and <b>Interest</b> (how engaged the contact is). <b style="color:#D92D20">Red = missing</b>. Number of active accounts in brackets.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px"><h2 style="margin:0 0 8px;font-size:17px">Fit</h2><div style="position:relative;height:${h}px"><canvas id="cFit"></canvas></div></div>
<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px"><h2 style="margin:0 0 8px;font-size:17px">Interest</h2><div style="position:relative;height:${h}px"><canvas id="cInt"></canvas></div></div>
</div>
<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:12px;margin-top:14px;overflow:auto"><table style="width:100%;border-collapse:collapse;font-size:13px"><thead><tr style="color:#6e6e73;font-size:11px;text-transform:uppercase"><th style="text-align:left;padding:6px 8px">Client</th><th style="text-align:right;padding:6px 8px">Active</th><th colspan="${used.length}" style="text-align:center;padding:6px 8px;color:#111">Fit</th><th></th><th colspan="${used.length}" style="text-align:center;padding:6px 8px;color:#111">Interest</th></tr><tr style="font-size:11px">${'<th></th><th></th>'}${head}<th></th>${head}</tr></thead><tbody>${table}</tbody></table>
${others ? `<div style="font-size:12px;color:#6e6e73;margin-top:8px">"Other" = values that are not High / Medium / Low: ${others}</div>` : ''}
<div style="font-size:11px;color:#9a9aa0;margin-top:6px">Data as of ${esc(data.generatedAt.slice(0, 16).replace('T', ' '))} UTC · active accounts = not in a recycled stage</div></div>
</div>
<script>(function(){var D=${json};if(!window.Chart)return;
function mk(id,set){new Chart(document.getElementById(id),{type:'bar',data:{labels:D.labels,datasets:set.map(function(s){return{label:s.b,data:s.v,counts:s.n,backgroundColor:D.colors[s.b],borderColor:'#fff',borderWidth:1,barThickness:22}})},
options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,scales:{x:{stacked:true,max:100,ticks:{callback:function(v){return v+'%'}},grid:{color:'#eef0f3'}},y:{stacked:true,grid:{display:false},ticks:{font:function(c){return{weight:c.index===0?'bold':'normal'}}}}},
plugins:{legend:{position:'top',align:'start',labels:{boxWidth:10,boxHeight:10}},tooltip:{callbacks:{label:function(c){return ' '+c.dataset.label+': '+c.parsed.x+'% ('+c.dataset.counts[c.dataIndex]+' accounts)'}}}}}})}
mk('cFit',D.fit);mk('cInt',D.interest);})();</script>
</body></html>`
}

export function registerCrmQuality(app: Hono<any>, deps: Deps) {
  const load = async (c: any) => {
    const ck = `v3:crmq1:${todayNY()}`
    if (c.req.query('fresh') !== '1') { try { const raw = await c.env.COMPANIES_KV.get(ck); if (raw) return JSON.parse(raw) } catch { /* miss */ } }
    const out = await crmQuality(c.env, deps)
    try { await c.env.COMPANIES_KV.put(ck, JSON.stringify(out), { expirationTtl: 1800 }) } catch { /* ignore */ }
    return out
  }
  const signedIn = (c: any) => !!String(c.get('authUser' as never) || '')
  app.get('/api/v3/crm-quality', async (c) => { if (!signedIn(c)) return c.json({ error: 'Unauthorized' }, 401); return c.json(await load(c)) })
  app.get('/crm-quality', async (c) => { if (!signedIn(c)) return c.redirect('/', 302); return c.html(pageHtml(await load(c))) })
}
