// ─────────────────────────────────────────────────────────────────────────────
// v3 — the simplified client.gershonCRM: Dashboard, Client page, Reports,
// Settings, all in the Linalysis design with Gershon.ai red. Legacy pages keep
// working and get the same theme + a top bar back to the new pages.
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'
import {
  CLIENT_REGISTRY, registryByNo, readSettings, saveSettings, monthWin, lastFullMonthKey, todayNY,
  getClientMonth, portfolioOf, type Deps, type V3Settings, type ClientMonth,
} from './v3-data'
import { registerHistory } from './v3-history'
import { clientModel, internalModel, straightinModel, reportHtml, reportPdfBase64, pdfBytesFromBase64, type ReportKind, type ReportModel } from './v3-reports'

const esc = (s: any) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ── Shell ────────────────────────────────────────────────────────────────────
export function shell(opts: { title: string; active: string; h1: string; right?: string; body: string; data?: Record<string, string> }): string {
  const nav = (href: string, icon: string, label: string, key: string) =>
    `<a class="nav-item${opts.active === key ? ' active' : ''}" href="${href}"><i class="fas ${icon}"></i><span>${label}</span></a>`
  const clients = CLIENT_REGISTRY.map(r =>
    `<a class="nav-item${opts.active === 'c' + r.no ? ' active' : ''}" href="/client/${r.no}" style="padding:6px 12px;font-size:13px"><span class="cno" style="min-width:30px;${opts.active === 'c' + r.no ? 'color:#fff' : ''}">${r.no}</span><span>${esc(r.name)}</span></a>`).join('')
  const data = Object.entries(opts.data || {}).map(([k, v]) => ` data-${k}="${esc(v)}"`).join('')
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${esc(opts.title)} · client.gershonCRM</title>
<link rel="icon" type="image/svg+xml" href="/static/clients-icon.svg"><link rel="apple-touch-icon" href="/static/clients-icon.svg">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<link rel="stylesheet" href="/static/gershon.css?v=4"></head>
<body${data}><div class="app">
<aside class="sidebar" id="sidebar">
  <a class="brand" href="/dashboard"><span class="brand-mark">G</span><span>Gershon<span class="tag">Client results</span></span></a>
  <div class="nav-group">${nav('/dashboard', 'fa-gauge-high', 'Dashboard', 'dashboard')}${nav('/reports', 'fa-file-lines', 'Monthly reports', 'reports')}</div>
  <div class="nav-group"><div class="nav-group-label">Clients</div>${clients}</div>
  <div class="nav-group"><div class="nav-group-label">Data</div>${nav('/straightin', 'fa-link', 'Straight-in links', 'straightin')}${nav('/settings', 'fa-sliders', 'Targets & recipients', 'settings')}${nav('/admin', 'fa-gear', 'Admin', 'admin')}${nav('/users', 'fa-user-shield', 'Users', 'users')}</div>
  <div class="nav-spacer"></div>
  <a class="nav-item" href="/api/auth/logout"><i class="fas fa-right-from-bracket"></i><span>Sign out</span></a>
  <div class="sidebar-footer">Promote · social.gershon.ai<br>Network · Straight-in<br>Engage · Streak</div>
</aside>
<main>
  <header class="topbar"><div style="display:flex;align-items:center;gap:10px"><button class="btn menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')"><i class="fas fa-bars"></i></button><h1>${opts.h1}</h1></div><div class="topbar-right">${opts.right || ''}</div></header>
  <div class="content">${opts.body}</div>
</main></div>
<div id="toast"></div>
<script src="/static/v3.js?v=8"></script></body></html>`
}

function monthSeg(): string {
  return `<div class="seg" id="monthSeg"><button data-m="cur" class="active">This month</button><button data-m="last">Last month</button></div>`
}

// ── Pages ────────────────────────────────────────────────────────────────────
function dashboardPage(): string {
  return shell({
    title: 'Dashboard', active: 'dashboard', h1: 'Dashboard', right: monthSeg(), data: { page: 'dashboard' },
    body: `
<div class="summary" id="summary"><div class="summary-text" id="summaryText"><span class="skeleton">Loading the portfolio…………………………</span></div><a class="btn primary" href="/reports"><i class="fas fa-file-lines"></i> Monthly reports</a></div>
<div class="kpi-row" id="kpis"></div>
<div id="track"></div>
<div class="card" style="padding:0;overflow:auto">
  <table class="ctable"><thead><tr><th>Client</th><th>Promote <span class="muted" id="thP" style="text-transform:none;font-weight:500"></span></th><th>Network <span class="muted" id="thN" style="text-transform:none;font-weight:500"></span></th><th>Engage <span class="muted" id="thE" style="text-transform:none;font-weight:500"></span></th><th class="hide-sm" style="text-align:center">Score</th></tr></thead>
  <tbody id="rows"></tbody></table>
</div>
<p class="muted" style="font-size:12px;margin-top:12px">Each channel is measured against its target; the score averages the channels the client has, each capped at 100%. Green ≥ 80% · amber 40–79% · red &lt; 40%. Clients are identified by their Gershon number on every platform.</p>`,
  })
}

function clientPage(no: number, name: string, keys: string[]): string {
  const legacy = keys[0] ? `<a class="btn" href="/?company=${encodeURIComponent(keys[0])}"><i class="fas fa-table-list"></i> Detailed view</a>` : ''
  return shell({
    title: `#${no} ${name}`, active: 'c' + no, h1: `<span class="cno">#${no}</span> ${esc(name)}`, data: { page: 'client', no: String(no) },
    right: `${monthSeg()}<a class="btn" id="pdfBtn" href="#" target="_blank"><i class="fas fa-file-pdf"></i> Client report</a>${legacy}`,
    body: `
<div class="summary" id="summary"><div class="summary-text" id="summaryText"><span class="skeleton">Loading…………………………………</span></div><div id="scoreBox"></div></div>
<div class="grid cols-3" id="channels"></div>
<div class="grid cols-2" id="details"></div>
<div id="history"></div>`,
  })
}

function reportsPage(s: V3Settings): string {
  const opts = CLIENT_REGISTRY.map(r => `<option value="${r.no}">#${r.no} ${esc(r.name)}</option>`).join('')
  const card = (kind: ReportKind, icon: string, title: string, desc: string, to: string, extra = '') => `
<div class="card report-card"><div class="card-header" style="margin:0"><h3><i class="fas ${icon}" style="color:var(--brand)"></i> ${title}</h3></div>
<p>${desc}</p><p style="font-size:12px"><b>Sent to:</b> ${to}</p>${extra}
<div class="actions"><button class="btn" data-preview="${kind}"><i class="fas fa-eye"></i> Preview</button><button class="btn" data-pdf="${kind}"><i class="fas fa-file-pdf"></i> PDF</button><button class="btn primary" data-send="${kind}"><i class="fas fa-paper-plane"></i> Send now</button></div></div>`
  return shell({
    title: 'Monthly reports', active: 'reports', h1: 'Monthly reports', data: { page: 'reports', lastmonth: lastFullMonthKey() },
    right: `<div class="field" style="margin:0"><input type="month" id="month" value="${lastFullMonthKey()}" max="${todayNY().slice(0, 7)}"></div>`,
    body: `
<div class="summary"><div class="summary-text">Three reports are built from the same live data on the <b>1st of every month</b> for the month just closed. Each email carries the report in its body and as a one-page PDF.</div><a class="btn" href="/settings"><i class="fas fa-sliders"></i> Recipients</a></div>
<div class="grid cols-3">
${card('straightin', 'fa-handshake', 'Straight-in — leads goal & acceptance goal', 'For our LinkedIn provider: two equally important goals per client — ' + s.leadsPerMonth + ' qualified leads per LinkedIn user per month (Finance Montreal and Altavia run 2 users) and an acceptance rate above ' + s.acceptTarget + '%. Shows how far each client is from each goal, in %, and ends with concrete requests for next month.', esc(s.straightinEmail || s.internalEmail + ' (to forward — add Straight-in\'s email in Settings)'))}
${card('internal', 'fa-chart-line', 'Gershon — our results', 'Portfolio score, every client against target on Promote, Network and Engage, and the sources of improvement ranked by impact.', esc(s.internalEmail))}
${card('client', 'fa-star', 'Client — one-pager', 'Always positive and encouraging: wins, highlights and what comes next. One-page summary in the email, PDF attached.', s.autoSendClients ? 'each client\'s address (Settings), copy to ' + esc(s.internalEmail) : esc(s.internalEmail) + ' for review before forwarding', `<div class="field" style="margin:0"><select id="clientSel">${opts}</select></div>`)}
</div>
<div class="card" id="previewCard" style="display:none"><div class="card-header"><h3 id="previewTitle">Preview</h3><button class="btn" onclick="document.getElementById('previewCard').style.display='none'">Close</button></div><iframe class="preview" id="previewFrame"></iframe></div>`,
  })
}

function settingsPage(s: V3Settings, resendOk: boolean): string {
  const rows = CLIENT_REGISTRY.map(r => `<tr><td><span class="cno">#${r.no}</span> ${esc(r.name)}</td>
    <td><input name="pt_${r.no}" type="number" step="0.5" min="0" placeholder="${s.promoteTarget}" value="${s.promoteTargets[String(r.no)] ?? ''}" style="width:90px;border:1px solid var(--border);border-radius:8px;padding:7px"></td>
    <td><input name="ce_${r.no}" type="text" placeholder="client@company.com" value="${esc(s.clientEmails[String(r.no)] || '')}" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:7px"></td></tr>`).join('')
  return shell({
    title: 'Targets & recipients', active: 'settings', h1: 'Targets & recipients', data: { page: 'settings' },
    body: `
${resendOk ? '' : `<div class="summary" style="border-left-color:var(--warn)"><div class="summary-text"><b>Email sending is not switched on yet.</b> Reports can be previewed and downloaded as PDF; sending needs the Resend key on the Cloudflare project (handoff for Charles).</div></div>`}
<form id="settingsForm">
<div class="grid cols-2">
 <div class="card"><div class="card-header"><h3>Targets</h3></div>
  <div class="field"><label>Promote — posts target</label><div style="display:flex;gap:8px"><input name="promoteTarget" type="number" step="0.5" min="0.5" value="${s.promoteTarget}" style="width:110px"><select name="promoteUnit"><option value="day"${s.promoteUnit === 'day' ? ' selected' : ''}>per working day</option><option value="week"${s.promoteUnit === 'week' ? ' selected' : ''}>per week</option></select></div><div class="hint">Counted from social.gershon.ai — every post published on LinkedIn or X.</div></div>
  <div class="field"><label>Network — acceptance-rate target (%)</label><input name="acceptTarget" type="number" min="1" max="100" value="${s.acceptTarget}"></div>
  <div class="field"><label>Engage — new qualified leads per LinkedIn user per month</label><input name="leadsPerMonth" type="number" min="1" value="${s.leadsPerMonth}"></div>
 </div>
 <div class="card"><div class="card-header"><h3>Report recipients</h3></div>
  <div class="field"><label>Our monthly review (internal)</label><input name="internalEmail" type="text" value="${esc(s.internalEmail)}"></div>
  <div class="field"><label>Straight-in report</label><input name="straightinEmail" type="text" placeholder="contact@straight-in.com" value="${esc(s.straightinEmail)}"><div class="hint">Empty = sent to the internal address so you can forward it.</div></div>
  <div class="field"><label><input name="autoSendClients" type="checkbox"${s.autoSendClients ? ' checked' : ''}> Send client reports directly to clients on the 1st</label><div class="hint">Off = client reports come to the internal address first, ready to forward.</div></div>
 </div>
</div>
<div class="card" style="padding:0;overflow:auto"><table class="ctable"><thead><tr><th>Client</th><th>Posts target (override)</th><th>Client report recipients</th></tr></thead><tbody>${rows}</tbody></table></div>
<div style="margin-top:16px;display:flex;gap:10px"><button class="btn primary" type="submit"><i class="fas fa-check"></i> Save</button></div>
</form>`,
  })
}

// ── Email ────────────────────────────────────────────────────────────────────
async function sendReport(env: any, m: ReportModel, to: string[], bcc: string[] = []): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'RESEND_API_KEY not configured on the Cloudflare project' }
  const addr = ((env.REPORT_FROM_EMAIL || '').match(/<([^>]+)>/) || [])[1] || (env.REPORT_FROM_EMAIL && env.REPORT_FROM_EMAIL.includes('@') ? env.REPORT_FROM_EMAIL : 'reports@gershon.ai')
  const from = m.kind === 'internal' ? `GC Client Report <${addr}>` : `Gershon Consulting <${addr}>`
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, bcc: bcc.length ? bcc : undefined, subject: m.subject, html: reportHtml(m), attachments: [{ filename: m.filename, content: reportPdfBase64(m) }] }),
  })
  const body = await r.text().catch(() => '')
  return r.ok ? { ok: true, id: (body.match(/"id"\s*:\s*"([^"]+)"/) || [])[1] } : { ok: false, error: body.slice(0, 300) }
}
const emails = (s: string) => String(s || '').split(/[,;\s]+/).map(x => x.trim()).filter(x => /.+@.+\..+/.test(x))

// ── Registration ─────────────────────────────────────────────────────────────
export function registerV3(app: Hono<any>, deps: Deps) {
  // Theme + top bar on every legacy HTML page (v3 pages are already styled).
  app.use('*', async (c, next) => {
    await next()
    const ct = c.res.headers.get('content-type') || ''
    if (!ct.includes('text/html') || c.res.headers.get('x-gc-v3')) return
    const path = new URL(c.req.url).pathname
    let html = await c.res.text()
    // App icon (red "clients" badge) on every page
    const icon = '<link rel="icon" type="image/svg+xml" href="/static/clients-icon.svg"><link rel="apple-touch-icon" href="/static/clients-icon.svg">'
    html = html.replace(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>/gi, '')
    html = html.includes('</head>') ? html.replace('</head>', icon + '</head>') : icon + html
    if (html.includes('/static/gershon.css')) {
      const h0 = new Headers(c.res.headers); h0.delete('content-length')
      c.res = new Response(html, { status: c.res.status, headers: h0 }); return
    }
    const theme = '<link rel="stylesheet" href="/static/gershon-theme.css?v=3">'
    html = html.includes('</head>') ? html.replace('</head>', theme + '</head>') : theme + html
    const showBar = path !== '/login' && !(path === '/' && !new URL(c.req.url).searchParams.get('company'))
    if (showBar) {
      const bar = `<div id="gc-topnav"><span class="b">Gershon</span><a href="/dashboard">Dashboard</a><a href="/reports">Monthly reports</a><a href="/straightin">Straight-in links</a><a href="/settings">Settings</a><a href="/admin">Admin</a><a href="/users">Users</a></div>`
      html = html.replace(/<body([^>]*)>/i, (m0) => m0 + bar)
    }
    const headers = new Headers(c.res.headers); headers.delete('content-length')
    c.res = new Response(html, { status: c.res.status, headers })
  })

  registerHistory(app, deps)

  const htmlV3 = (c: any, body: string) => { c.header('x-gc-v3', '1'); return c.html(body) }

  app.get('/dashboard', (c) => htmlV3(c, dashboardPage()))
  app.get('/overview', (c) => c.redirect('/dashboard', 302))
  app.get('/client/:no', (c) => {
    const r = registryByNo(c.req.param('no'))
    if (!r) return c.redirect('/dashboard', 302)
    return htmlV3(c, clientPage(r.no, r.name, r.keys))
  })
  app.get('/reports', async (c) => htmlV3(c, reportsPage(await readSettings(c.env.COMPANIES_KV))))
  app.get('/settings', async (c) => htmlV3(c, settingsPage(await readSettings(c.env.COMPANIES_KV), !!c.env.RESEND_API_KEY)))

  // ── API ──
  app.get('/api/v3/registry', async (c) => {
    const s = await readSettings(c.env.COMPANIES_KV)
    return c.json({ clients: CLIENT_REGISTRY, settings: s, today: todayNY(), lastMonth: lastFullMonthKey(), resend: !!c.env.RESEND_API_KEY })
  })
  app.post('/api/v3/settings', async (c) => {
    const b = await c.req.json().catch(() => ({})) as any
    const s = await saveSettings(c.env.COMPANIES_KV, b)
    // targets changed → drop cached month records so percentages recompute
    await Promise.all([monthWin().key, lastFullMonthKey()].flatMap(m => CLIENT_REGISTRY.map(r => c.env.COMPANIES_KV.delete(`v3:cm6:${m}:${r.no}`).catch(() => null))))
    return c.json({ ok: true, settings: s })
  })
  app.get('/api/v3/client/:no', async (c) => {
    const r = registryByNo(c.req.param('no'))
    if (!r) return c.json({ error: 'Unknown client number' }, 404)
    const month = monthWin(c.req.query('month')).key
    const s = await readSettings(c.env.COMPANIES_KV)
    const cm = await getClientMonth(c.env, deps, r, month, { fresh: c.req.query('fresh') === '1', settings: s })
    return c.json({ client: cm, month: monthWin(month), settings: s })
  })

  async function buildModel(c: any, kind: ReportKind, monthKey: string, no?: string | null): Promise<ReportModel | { error: string }> {
    const s = await readSettings(c.env.COMPANIES_KV)
    const win = monthWin(monthKey)
    if (kind === 'client') {
      const r = registryByNo(no || '')
      if (!r) return { error: 'client number required' }
      const cm = await getClientMonth(c.env, deps, r, win.key, { settings: s })
      return clientModel(cm, win.label, win.key)
    }
    const all: ClientMonth[] = []
    for (const r of CLIENT_REGISTRY) all.push(await getClientMonth(c.env, deps, r, win.key, { settings: s }))
    const p = portfolioOf(win, all, s)
    return kind === 'internal' ? internalModel(p, s) : straightinModel(p, s)
  }
  const kindOf = (k: string): ReportKind | null => (['straightin', 'internal', 'client'].includes(k) ? k as ReportKind : null)

  app.get('/api/v3/report/:kind', async (c) => {
    const kind = kindOf(c.req.param('kind'))
    if (!kind) return c.json({ error: 'kind must be straightin, internal or client' }, 400)
    const m = await buildModel(c, kind, c.req.query('month') || lastFullMonthKey(), c.req.query('client'))
    if ('error' in m) return c.json(m, 400)
    if (c.req.query('format') === 'pdf') {
      return new Response(pdfBytesFromBase64(reportPdfBase64(m)), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename="${m.filename}"` } })
    }
    c.header('x-gc-v3', '1')
    return c.html(reportHtml(m))
  })

  app.post('/api/v3/report/:kind/send', async (c) => {
    const kind = kindOf(c.req.param('kind'))
    if (!kind) return c.json({ error: 'bad kind' }, 400)
    const s = await readSettings(c.env.COMPANIES_KV)
    const no = c.req.query('client')
    const m = await buildModel(c, kind, c.req.query('month') || lastFullMonthKey(), no)
    if ('error' in m) return c.json(m, 400)
    const internal = emails(s.internalEmail)
    let to = internal, bcc: string[] = []
    if (kind === 'straightin' && emails(s.straightinEmail).length) { to = emails(s.straightinEmail); bcc = internal }
    if (kind === 'client' && c.req.query('direct') === '1' && no && emails(s.clientEmails[no] || '').length) { to = emails(s.clientEmails[no]); bcc = internal }
    const res = await sendReport(c.env, m, to, bcc)
    return c.json({ ...res, to, subject: m.subject }, res.ok ? 200 : 500)
  })

  // Monthly run — called by the GitHub Actions schedule on the 1st (public, idempotent).
  //   ?no=<client>   warm that client's data and send its client report
  //   ?part=internal | straightin   send the portfolio reports
  app.post('/api/v3/monthly/run', async (c) => {
    const month = monthWin(c.req.query('month') || lastFullMonthKey())
    if (month.isCurrent) return c.json({ error: 'month not closed yet' }, 400)
    const s = await readSettings(c.env.COMPANIES_KV)
    const no = c.req.query('no'), part = c.req.query('part')
    const item = no ? `client-${no}` : part
    if (!item || (part && !['internal', 'straightin'].includes(part))) return c.json({ error: 'pass ?no=<client> or ?part=internal|straightin' }, 400)
    const sentKey = `v3:sent:${month.key}:${item}`
    const already = await c.env.COMPANIES_KV.get(sentKey)
    if (already && c.req.query('force') !== '1') return c.json({ ok: true, skipped: true, already })
    const kind: ReportKind = no ? 'client' : part as ReportKind
    const m = await buildModel(c, kind, month.key, no)
    if ('error' in m) return c.json(m, 400)
    const internal = emails(s.internalEmail)
    let to = internal, bcc: string[] = []
    if (kind === 'straightin' && emails(s.straightinEmail).length) { to = emails(s.straightinEmail); bcc = internal }
    if (kind === 'client' && s.autoSendClients && no && emails(s.clientEmails[no] || '').length) { to = emails(s.clientEmails[no]); bcc = internal }
    // A client with nothing to show this month is not mailed.
    if (kind === 'client' && !m.tiles.length) return c.json({ ok: true, skipped: true, reason: 'no activity to report' })
    const res = await sendReport(c.env, m, to, bcc)
    if (res.ok) await c.env.COMPANIES_KV.put(sentKey, `${new Date().toISOString()} ${res.id || ''} → ${to.join(',')}`, { expirationTtl: 60 * 60 * 24 * 400 })
    return c.json({ ...res, item, to, subject: m.subject }, res.ok ? 200 : 500)
  })
}
