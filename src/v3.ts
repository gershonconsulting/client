// ─────────────────────────────────────────────────────────────────────────────
// v3 — the simplified client.gershonCRM: Dashboard, Client page, Reports,
// Settings, all in the Linalysis design with Gershon.ai red. Legacy pages keep
// working and get the same theme + a top bar back to the new pages.
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'
import {
  CLIENT_REGISTRY, registryByNo, readSettings, saveSettings, monthWin, lastFullMonthKey, todayNY,
  getClientMonth, portfolioOf, servicesFor, clientRecipientsOf, profilesFor, pipelineKeyOf, reportIdOf, type Deps, type V3Settings, type ClientMonth,
} from './v3-data'
import { registerHistory, clientProjection } from './v3-history'
import { registerCampaign } from './v3-campaign'
import { storyPage, insightsOf, reportLink, verifyReportSig, type StoryHistory } from './v3-story'
import { APPROVERS, recipientCheck, deliveryWindow, upcomingReportMonth, readApproval, approvalKey, deliveryKey, isValidated, approverLink, verifyApproverSig, type ApproverId, type ApprovalRecord } from './v3-approval'
import { clientModel, internalModel, straightinModel, gapsModel, gapsMatrixHtml, whereHtml, reportHtml, reportPdfBase64, pdfBytesFromBase64, type ReportKind, type ReportModel } from './v3-reports'

const esc = (s: any) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Unified Gershon design (v1.4.0, 2026-10-22): /static/unified-theme.css is the LAST
// stylesheet on every page — linked here for v3 pages and by the HTML middleware below
// for legacy pages. __APP_VERSION__ comes from package.json (vite define).
declare const __APP_VERSION__: string
const APP_VERSION = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : ''
const UNIFIED_THEME_HREF = '/static/unified-theme.css?v=' + APP_VERSION
const UNIFIED_THEME_LINK = '<link rel="stylesheet" href="' + UNIFIED_THEME_HREF + '">'
const withUnifiedTheme = (html: string) =>
  html.includes('/static/unified-theme.css') ? html : html.includes('</head>') ? html.replace('</head>', UNIFIED_THEME_LINK + '</head>') : UNIFIED_THEME_LINK + html

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
<link rel="stylesheet" href="/static/gershon.css?v=5">
<link rel="stylesheet" href="${UNIFIED_THEME_HREF}"></head>
<body${data}><div class="app">
<aside class="sidebar" id="sidebar">
  <a class="brand" href="/dashboard"><span class="brand-mark">G</span><span>Gershon<span class="tag">Client results</span></span></a>
  <div class="nav-group">${nav('/dashboard', 'fa-gauge-high', 'Dashboard', 'dashboard')}${nav('/reports', 'fa-file-lines', 'Monthly reports', 'reports')}${nav('/delivery', 'fa-circle-check', 'Client delivery', 'delivery')}</div>
  <div class="nav-group"><div class="nav-group-label">Clients</div>${clients}</div>
  <div class="nav-group"><div class="nav-group-label">Data</div>${nav('/gaps', 'fa-triangle-exclamation', 'Data gaps', 'gaps')}${nav('/straightin', 'fa-link', 'Straight-in links', 'straightin')}${nav('/settings', 'fa-sliders', 'Targets & recipients', 'settings')}${nav('/admin', 'fa-gear', 'Admin', 'admin')}${nav('/users', 'fa-user-shield', 'Users', 'users')}</div>
  <div class="nav-spacer"></div>
  <a class="nav-item" href="/api/auth/logout"><i class="fas fa-right-from-bracket"></i><span>Sign out</span></a>
  <div class="sidebar-footer">Promote · social.gershon.ai<br>Network · Straight-in<br>Engage · Streak<span class="ver">v${APP_VERSION}</span></div>
</aside>
<main>
  <header class="topbar"><div style="display:flex;align-items:center;gap:10px"><button class="btn menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')"><i class="fas fa-bars"></i></button><h1>${opts.h1}</h1></div><div class="topbar-right">${opts.right || ''}</div></header>
  <div class="content">${opts.body}</div>
</main></div>
<div id="toast"></div>
${opts.data && opts.data.page === 'client' ? '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script><script src="/static/campaign.js?v=2" defer></script>' : ''}
<script src="/static/v3.js?v=10"></script></body></html>`
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
    right: `${monthSeg()}<a class="btn primary" id="storyBtn" href="/client/${no}/story" target="_blank"><i class="fas fa-chart-line"></i> Interactive report</a><a class="btn" id="pdfBtn" href="#" target="_blank"><i class="fas fa-file-pdf"></i> PDF</a>${legacy}`,
    body: `
<div id="campaign" data-no="${no}"><div class="card"><span class="skeleton">Loading the whole campaign since launch…………………………</span></div></div>
<h2 class="sec-title" id="monthTitle"><i class="fas fa-calendar-day"></i> This month in detail</h2>
<div class="summary" id="summary"><div class="summary-text" id="summaryText"><span class="skeleton">Loading…………………………………</span></div><div id="scoreBox"></div></div>
<div class="grid cols-3" id="channels"></div>
<div id="accounts"></div>
<div class="grid cols-2" id="details"></div>
<div id="history"></div>`,
  })
}

function reportsPage(s: V3Settings): string {
  const opts = CLIENT_REGISTRY.map(r => `<option value="${r.no}">#${r.no} ${esc(r.name)}</option>`).join('')
  const card = (kind: ReportKind, icon: string, title: string, desc: string, to: string, extra = '') => `
<div class="card report-card"><div class="card-header" style="margin:0"><h3><i class="fas ${icon}" style="color:var(--brand)"></i> ${title}</h3></div>
<p>${desc}</p><p style="font-size:12px"><b>Sent to:</b> ${to}</p>${extra}
<div class="actions">${kind === 'client' ? `<button class="btn" data-story="1"><i class="fas fa-chart-line"></i> Interactive</button>` : ''}<button class="btn" data-preview="${kind}"><i class="fas fa-eye"></i> Preview</button><button class="btn" data-pdf="${kind}"><i class="fas fa-file-pdf"></i> PDF</button><button class="btn primary" data-send="${kind}"><i class="fas fa-paper-plane"></i> Send now</button></div></div>`
  return shell({
    title: 'Monthly reports', active: 'reports', h1: 'Monthly reports', data: { page: 'reports', lastmonth: lastFullMonthKey() },
    right: `<div class="field" style="margin:0"><input type="month" id="month" value="${lastFullMonthKey()}" max="${todayNY().slice(0, 7)}"></div>`,
    body: `
<div class="summary"><div class="summary-text">Three reports are built from the same live data on the <b>1st of every month</b> for the month just closed. Each email carries the report in its body and as a one-page PDF.</div><a class="btn" href="/settings"><i class="fas fa-sliders"></i> Recipients</a></div>
<div class="grid cols-3">
${card('straightin', 'fa-handshake', 'Straight-in — leads goal & acceptance goal', 'For our LinkedIn provider: two equally important goals per client — ' + s.leadsPerMonth + ' qualified leads per LinkedIn user per month (Finance Montreal and Altavia run 2 users) and an acceptance rate above ' + s.acceptTarget + '%. Shows how far each client is from each goal, in %, and ends with concrete requests for next month.', esc(s.straightinEmail || s.internalEmail + ' (to forward — add Straight-in\'s email in Settings)'))}
${card('internal', 'fa-chart-line', 'Gershon — our results', 'Portfolio score, every client against target on Promote, Network and Engage, and the sources of improvement ranked by impact.', esc(s.internalEmail))}
${card('client', 'fa-star', 'Client — one-pager', 'Always positive on the campaign\'s actions: what we did, insights, and an interactive web report with charts since launch (link in the email). One-page summary in the email, PDF attached.', 'review copy to ' + esc(s.internalEmail) + ' on the 1st; to the client (professional email) on the first Friday, from client@gershon.ai, once validated — <a href="/delivery" style="color:#CC3333">validation status</a>', `<div class="field" style="margin:0"><select id="clientSel">${opts}</select></div>`)}
</div>
<div class="card" id="previewCard" style="display:none"><div class="card-header"><h3 id="previewTitle">Preview</h3><button class="btn" onclick="document.getElementById('previewCard').style.display='none'">Close</button></div><iframe class="preview" id="previewFrame"></iframe></div>`,
  })
}

function recipHint(raw: string): string {
  const rc = recipientCheck(raw)
  if (!rc.pro.length && !rc.personal.length) return `<div class="hint" style="color:#b91c1c">● No address — this client's report cannot be delivered.</div>`
  return (rc.pro.length ? `<div class="hint" style="color:#057642">● Delivered to ${esc(rc.pro.join(', '))}</div>` : `<div class="hint" style="color:#b91c1c">● No professional address — report blocked.</div>`)
    + (rc.personal.length ? `<div class="hint" style="color:#b76b00">● Personal address never used: ${esc(rc.personal.join(', '))}</div>` : '')
}
function settingsPage(s: V3Settings, resendOk: boolean, shared: Record<string, string> = {}): string {
  const sv = (r: any) => servicesFor(r, s)
  const box = (r: any, k: 'promote' | 'network' | 'engage') => `<td style="text-align:center"><label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer"><input type="checkbox" name="sv_${r.no}_${k}"${sv(r)[k] ? ' checked' : ''}><span style="font-size:12px;color:var(--muted)">${sv(r)[k] ? 'On' : 'Off'}</span></label></td>`
  const svcRows = CLIENT_REGISTRY.map(r => `<tr><td><span class="cno">#${r.no}</span> ${esc(r.name)}${(r.campaigns || []).length ? ` <span style="color:var(--muted);font-size:12px">(${esc((r.campaigns || []).join(', '))})</span>` : ''}</td>${box(r, 'promote')}${box(r, 'network')}${box(r, 'engage')}</tr>`).join('')
  const rows = CLIENT_REGISTRY.map(r => `<tr><td><span class="cno">#${r.no}</span> ${esc(r.name)}</td>
    <td><input name="pt_${r.no}" type="number" step="0.5" min="0" placeholder="${s.promoteTarget}" value="${s.promoteTargets[String(r.no)] ?? ''}" style="width:90px;border:1px solid var(--border);border-radius:8px;padding:7px"></td>
    <td><input name="ce_${r.no}" type="text" placeholder="${esc(r.reportTo || 'name@company.com (professional)')}" value="${esc(s.clientEmails[String(r.no)] || '')}" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:7px">${recipHint(clientRecipientsOf(r, s))}</td></tr>`).join('')
  // LinkedIn account profiles — one block per account for multi-account clients (Altavia: Anne + Alexandre)
  const inp = (no: number, i: number, k: string, v: string, ph: string) => `<input name="ap_${no}_${i}_${k}" type="text" placeholder="${esc(ph)}" value="${esc(v)}" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:7px">`
  const status = (ok: boolean, yes: string, no: string) => `<div class="hint" style="color:${ok ? '#057642' : 'var(--muted)'}">${ok ? '● ' + yes : '○ ' + no}</div>`
  const multi = CLIENT_REGISTRY.filter(r => (r.campaigns || []).length >= 2).sort((a, b) => (a.no === 229 ? -1 : b.no === 229 ? 1 : a.no - b.no))
  const profCards = multi.map(r => {
    const ps = profilesFor(r, s)
    const sharedUrl = shared[String(r.no)] || ''
    const adminUrl = (name: string) => shared[`${r.no}:${name}`] || ''
    const blocks = ps.map((p, i) => {
      const pk = pipelineKeyOf(p.streakUrl), rid = reportIdOf(p.straightinUrl)
      const same = pk && ps.some((q, j) => j !== i && pipelineKeyOf(q.streakUrl) === pk)
      return `<div style="border:1px solid var(--border);border-radius:10px;padding:12px 14px">
      <input type="hidden" name="ap_${r.no}_${i}_name" value="${esc(p.name)}">
      <div style="font-weight:800;font-size:14px;margin-bottom:8px"><i class="fab fa-linkedin" style="color:#0a66c2"></i> Profile ${i + 1} — ${esc(p.name)}</div>
      <div class="field"><label>Full name</label>${inp(r.no, i, 'fullName', p.fullName, p.name + ' …')}</div>
      <div class="field"><label>LinkedIn profile</label>${inp(r.no, i, 'linkedinUrl', p.linkedinUrl, 'https://www.linkedin.com/in/…')}</div>
      <div class="field"><label>Streak pipeline link</label>${inp(r.no, i, 'streakUrl', p.streakUrl, 'https://www.streak.com/a/pipelines/…')}${p.streakUrl && !pk ? status(false, '', 'Not a Streak pipeline link') : same ? status(true, 'Same pipeline as the other profile — leads shown combined', '') : status(!!pk || !!adminUrl(p.name), pk ? 'Own pipeline — leads counted for ' + p.name : 'Empty — uses the Admin entry ' + r.name + ' (' + p.name + ') pipeline', sharedUrl ? 'Empty — uses the shared ' + r.name + ' pipeline (combined)' : 'Empty — no pipeline yet (here or in Admin)')}</div>
      <div class="field"><label>Straight-in report link</label>${inp(r.no, i, 'straightinUrl', p.straightinUrl, 'https://prospecthub.straight-in.com/…crp_…')}${p.straightinUrl && !rid ? status(false, '', 'No crp_ report id in this link') : status(!!rid, 'Report linked to ' + p.name + ' (the newest week wins over /straightin)', 'Empty — taken from the weekly links on /straightin')}</div>
      <div class="field"><label>Linalysis account email</label>${inp(r.no, i, 'linalysis', p.linalysis, 'name@company.com')}</div>
      <div class="field" style="margin-bottom:0"><label>Notes</label>${inp(r.no, i, 'notes', p.notes, 'Optional')}</div>
    </div>`
    }).join('')
    return `<div class="card" style="margin-bottom:16px"><div class="card-header"><h3><span class="cno">#${r.no}</span> ${esc(r.name)} — LinkedIn account profiles</h3></div>
    <div class="hint" style="margin:-4px 0 10px">${ps.length} profiles, goal ${s.leadsPerMonth} leads each. ${sharedUrl ? `Shared client pipeline: <a href="${esc(sharedUrl)}" target="_blank" style="color:#CC3333">open in Streak</a>. ` : ''}Give each profile its own Streak link to split leads per person.</div>
    <div class="grid cols-2">${blocks}</div></div>`
  }).join('')
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
  <div class="hint" style="margin-bottom:10px">On the 1st, every client report comes to the internal address as a review copy. Clients get theirs on the <b>first Friday</b>, from client@gershon.ai, only if validated by Thursday 6:00 PM Eastern.</div>
  <div class="field"><label>Validation needed from</label><select name="approvalMode"><option value="either"${s.approvalMode !== 'both' ? ' selected' : ''}>Aina or Olivier (one is enough)</option><option value="both"${s.approvalMode === 'both' ? ' selected' : ''}>Aina and Olivier (both)</option></select></div>
  <div class="field"><label>Aina — validation email</label><input name="approverAina" type="text" value="${esc(s.approverEmails?.aina || '')}"></div>
  <div class="field"><label>Olivier — validation email</label><input name="approverOlivier" type="text" value="${esc(s.approverEmails?.olivier || '')}"></div>
 </div>
</div>
${profCards}
<div class="card" style="padding:0;overflow:auto;margin-bottom:16px"><div class="card-header" style="padding:14px 16px 0"><h3>Services we deliver</h3></div><div class="hint" style="padding:4px 16px 8px">Off = not collected, not in the client report, not in scores and not checked for data gaps.</div><table class="ctable"><thead><tr><th>Client</th><th style="text-align:center">Promote</th><th style="text-align:center">Network</th><th style="text-align:center">Engage</th></tr></thead><tbody>${svcRows}</tbody></table></div>
<div class="card" style="padding:0;overflow:auto"><table class="ctable"><thead><tr><th>Client</th><th>Posts target (override)</th><th>Client report recipients (professional email of the person we run the campaign for)</th></tr></thead><tbody>${rows}</tbody></table></div>
<div style="margin-top:16px;display:flex;gap:10px"><button class="btn primary" type="submit"><i class="fas fa-check"></i> Save</button></div>
</form>`,
  })
}

// ── Email ────────────────────────────────────────────────────────────────────
// Client reports go out from client@gershon.ai (Olivier, 2026-11-05) — report in the body + PDF attached.
const CLIENT_FROM = 'Gershon Consulting <client@gershon.ai>'
async function sendReport(env: any, m: ReportModel, to: string[], bcc: string[] = [], opts: { subjectPrefix?: string; replyTo?: string } = {}): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'RESEND_API_KEY not configured on the Cloudflare project' }
  const addr = ((env.REPORT_FROM_EMAIL || '').match(/<([^>]+)>/) || [])[1] || (env.REPORT_FROM_EMAIL && env.REPORT_FROM_EMAIL.includes('@') ? env.REPORT_FROM_EMAIL : 'reports@gershon.ai')
  const from = m.kind === 'client' ? CLIENT_FROM : m.kind === 'internal' ? `GC Client Reports <${addr}>` : m.kind === 'gaps' ? `GC Data Gaps <${addr}>` : `Gershon Consulting <${addr}>`
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, bcc: bcc.length ? bcc : undefined, reply_to: opts.replyTo || undefined, subject: (opts.subjectPrefix || '') + m.subject, html: reportHtml(m), attachments: m.kind === 'gaps' ? undefined : [{ filename: m.filename, content: reportPdfBase64(m) }] }),
  })
  const body = await r.text().catch(() => '')
  return r.ok ? { ok: true, id: (body.match(/"id"\s*:\s*"([^"]+)"/) || [])[1] } : { ok: false, error: body.slice(0, 300) }
}
const emails = (s: string) => String(s || '').split(/[,;\s]+/).map(x => x.trim()).filter(x => /.+@.+\..+/.test(x))
async function sendPlain(env: any, to: string[], subject: string, html: string, from = 'GC Client Reports <reports@gershon.ai>'): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'RESEND_API_KEY not configured on the Cloudflare project' }
  const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to, subject, html }) })
  const body = await r.text().catch(() => '')
  return r.ok ? { ok: true, id: (body.match(/"id"\s*:\s*"([^"]+)"/) || [])[1] } : { ok: false, error: body.slice(0, 300) }
}

// ── Registration ─────────────────────────────────────────────────────────────
// ── Data gaps page ───────────────────────────────────────────────────────────
function gapsPage(monthKey: string, label: string, rows: ClientMonth[]): string {
  const lvl = (l: string) => `<span style="display:inline-block;font-size:10px;font-weight:800;letter-spacing:.06em;padding:1px 6px;border:1.5px ${l === 'partial' ? 'dashed' : 'solid'} #111;white-space:nowrap">${l.toUpperCase()}</span>`
  const total = rows.reduce((a, r) => a + (r.gaps || []).length, 0)
  const blocks = rows.map(r => {
    const g = r.gaps || []
    const body = g.length
      ? `<table style="width:100%;border-collapse:collapse;font-size:13px">${g.map(x => `<tr style="border-top:1px solid #e5e7eb">
          <td style="padding:7px 8px;width:90px;color:#6e6e73;font-weight:600">${esc(x.area)}</td>
          <td style="padding:7px 8px"><b>${esc(x.what)}</b><div style="color:#6e6e73;font-size:12px;margin-top:2px">${esc(x.effect)}</div>${x.fix ? `<div style="font-size:12px;margin-top:3px"><a href="${esc(x.fix.url)}" target="_blank" style="color:#CC3333;font-weight:700;text-decoration:none">Add it →</a> <span style="color:#6e6e73">${esc(x.fix.place)}</span></div>` : ''}</td>
          <td style="padding:7px 8px;width:190px;color:#6e6e73">${esc(x.owner)}</td>
          <td style="padding:7px 8px;width:90px;text-align:right">${lvl(x.level)}</td></tr>`).join('')}</table>`
      : `<div style="padding:8px;color:#6e6e73">Nothing missing for ${esc(label)}.</div>`
    return `<div class="card" style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
      <a href="/client/${r.no}" style="font-weight:800;font-size:15px;color:#111;text-decoration:none">#${r.no} ${esc(r.name)}</a>
      <span style="color:#6e6e73;font-size:12px">${g.length} gap${g.length === 1 ? '' : 's'}</span></div>${body}</div>`
  }).join('')
  const right = `<form method="get" style="display:flex;gap:8px;align-items:center"><input type="month" name="month" value="${esc(monthKey)}" class="input" style="padding:6px 8px"><button class="btn" type="submit">Show</button><a class="btn" href="/gaps?month=${esc(monthKey)}&fresh=1">Refresh</a></form>`
  return shell({ title: 'Data gaps', active: 'gaps', h1: `Data gaps · ${esc(label)}`, right,
    body: `<p style="color:#6e6e73;margin:0 0 14px">${total} item${total === 1 ? '' : 's'} the ${esc(label)} reports cannot fill yet.</p><div class="card" style="margin-bottom:14px;overflow:auto">${gapsMatrixHtml(rows)}</div><div class="card" style="margin-bottom:14px;overflow:auto"><h3 style="margin:0 0 8px">Where to add the missing data</h3>${whereHtml(rows)}</div>${blocks}` })
}

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
      html = withUnifiedTheme(html)
      const h0 = new Headers(c.res.headers); h0.delete('content-length')
      c.res = new Response(html, { status: c.res.status, headers: h0 }); return
    }
    const theme = '<link rel="stylesheet" href="/static/gershon-theme.css?v=3">'
    html = html.includes('</head>') ? html.replace('</head>', theme + '</head>') : theme + html
    html = withUnifiedTheme(html)   // after gershon-theme.css, so it wins
    const showBar = path !== '/login' && !(path === '/' && !new URL(c.req.url).searchParams.get('company'))
    if (showBar) {
      const bar = `<div id="gc-topnav"><span class="b">Gershon</span><a href="/dashboard">Dashboard</a><a href="/reports">Monthly reports</a><a href="/gaps">Data gaps</a><a href="/straightin">Straight-in links</a><a href="/settings">Settings</a><a href="/admin">Admin</a><a href="/users">Users</a></div>`
      html = html.replace(/<body([^>]*)>/i, (m0) => m0 + bar)
    }
    const headers = new Headers(c.res.headers); headers.delete('content-length')
    c.res = new Response(html, { status: c.res.status, headers })
  })

  registerHistory(app, deps)
  registerCampaign(app, deps)

  const htmlV3 = (c: any, body: string) => { c.header('x-gc-v3', '1'); return c.html(body) }

  app.get('/dashboard', (c) => htmlV3(c, dashboardPage()))
  app.get('/overview', (c) => c.redirect('/dashboard', 302))
  app.get('/client/:no', (c) => {
    const r = registryByNo(c.req.param('no'))
    if (!r) return c.redirect('/dashboard', 302)
    return htmlV3(c, clientPage(r.no, r.name, r.keys))
  })
  app.get('/reports', async (c) => htmlV3(c, reportsPage(await readSettings(c.env.COMPANIES_KV))))

  // Data gaps — every number the month's reports could not fill, per client, with an owner.
  app.get('/gaps', async (c) => {
    const win = monthWin(c.req.query('month') || todayNY().slice(0, 7))
    const s = await readSettings(c.env.COMPANIES_KV)
    const fresh = c.req.query('fresh') === '1'
    const rows: ClientMonth[] = []
    for (const r of CLIENT_REGISTRY) rows.push(await getClientMonth(c.env, deps, r, win.key, { fresh, settings: s }))
    return htmlV3(c, gapsPage(win.key, win.label, rows))
  })
  app.get('/api/v3/gaps', async (c) => {
    const win = monthWin(c.req.query('month') || todayNY().slice(0, 7))
    const s = await readSettings(c.env.COMPANIES_KV)
    const out = []
    for (const r of CLIENT_REGISTRY) {
      const cm = await getClientMonth(c.env, deps, r, win.key, { fresh: c.req.query('fresh') === '1', settings: s })
      out.push({ no: cm.no, name: cm.name, gaps: cm.gaps })
    }
    return c.json({ month: win.key, clients: out })
  })
  app.get('/settings', async (c) => {
    const shared: Record<string, string> = {}
    for (const r of CLIENT_REGISTRY.filter(x => (x.campaigns || []).length >= 2)) {
      const co: any = await deps.getCompany(c.env.COMPANIES_KV, r.keys[0]).catch(() => null)
      if (co?.pipelineKey && r.keys.length === 1) shared[String(r.no)] = co.url || `https://www.streak.com/a/pipelines/${co.pipelineKey}`
      for (const [k, name] of Object.entries(r.accountKeys || {})) {
        const a: any = await deps.getCompany(c.env.COMPANIES_KV, k).catch(() => null)
        if (a?.pipelineKey) shared[`${r.no}:${name}`] = `https://www.streak.com/a/pipelines/${a.pipelineKey}`
      }
    }
    return htmlV3(c, settingsPage(await readSettings(c.env.COMPANIES_KV), !!c.env.RESEND_API_KEY, shared))
  })

  // ── API ──
  app.get('/api/v3/registry', async (c) => {
    const s = await readSettings(c.env.COMPANIES_KV)
    return c.json({ clients: CLIENT_REGISTRY, settings: s, today: todayNY(), lastMonth: lastFullMonthKey(), resend: !!c.env.RESEND_API_KEY })
  })
  app.post('/api/v3/settings', async (c) => {
    const b = await c.req.json().catch(() => ({})) as any
    const s = await saveSettings(c.env.COMPANIES_KV, b)
    // account links changed → drop this month's and last month's cached client records
    if (b && b.accounts) { for (const r of CLIENT_REGISTRY) for (const m of [monthWin(todayNY().slice(0, 7)).key, lastFullMonthKey()]) await c.env.COMPANIES_KV.delete(`v3:cm9:${m}:${r.no}`).catch(() => {}) }
    // targets changed → drop cached month records so percentages recompute
    await Promise.all([monthWin().key, lastFullMonthKey()].flatMap(m => CLIENT_REGISTRY.map(r => c.env.COMPANIES_KV.delete(`v3:cm9:${m}:${r.no}`).catch(() => null))))
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

  const originOf = (c: any) => { const u = new URL(c.req.url); return /localhost|127\.0\.0\.1/.test(u.host) ? u.origin : (c.env.PUBLIC_APP_URL || u.origin) }
  async function storyHistory(env: any, r: any, s: V3Settings): Promise<StoryHistory | null> {
    try { const p = await clientProjection(env, deps, r, s); return { start: p.start, series: p.series, next3RunRate: p.next3RunRate, basis: p.basis } } catch { return null }
  }
  async function renderStory(c: any, r: any, monthKey: string, withPdf: string | null) {
    const s = await readSettings(c.env.COMPANIES_KV)
    const win = monthWin(monthKey)
    const cm = await getClientMonth(c.env, deps, r, win.key, { settings: s })
    const h = await storyHistory(c.env, r, s)
    const m = clientModel(cm, win.label, win.key)
    const next = m.sections.find(x => x.title === 'Next month')?.lines || []
    c.header('x-gc-v3', '1')
    return c.html(storyPage(cm, win.key, win.label, m.headline, m.subline, h, withPdf, next))
  }
  // Interactive client report — public signed link (sent in the client email)
  app.get('/r/:no/:month/:sig', async (c) => {
    const { no, month, sig } = c.req.param()
    const r = registryByNo(no)
    if (!r || !/^\d{4}-\d{2}$/.test(month) || !(await verifyReportSig(c.env, no, month, sig))) return c.text('This report link is not valid.', 404)
    if (c.req.query('format') === 'pdf') {
      const m = await buildModel(c, 'client', month, no)
      if ('error' in m) return c.text(m.error, 400)
      return new Response(pdfBytesFromBase64(reportPdfBase64(m)), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename="${m.filename}"` } })
    }
    return renderStory(c, r, month, `/r/${no}/${month}/${sig}?format=pdf`)
  })
  // Signed-in shortcut: /client/:no/story?month=YYYY-MM → the client's signed link
  app.get('/client/:no/story', async (c) => {
    const r = registryByNo(c.req.param('no'))
    if (!r) return c.redirect('/dashboard', 302)
    const month = monthWin(c.req.query('month') || lastFullMonthKey()).key
    return c.redirect(await reportLink(c.env, new URL(c.req.url).origin, r.no, month), 302)
  })

  async function buildModel(c: any, kind: ReportKind, monthKey: string, no?: string | null): Promise<ReportModel | { error: string }> {
    const s = await readSettings(c.env.COMPANIES_KV)
    const win = monthWin(monthKey)
    if (kind === 'client') {
      const r = registryByNo(no || '')
      if (!r) return { error: 'client number required' }
      const cm = await getClientMonth(c.env, deps, r, win.key, { settings: s })
      const h = await storyHistory(c.env, r, s)
      const link = await reportLink(c.env, originOf(c), r.no, win.key)
      return clientModel(cm, win.label, win.key, { link, insights: insightsOf(cm, h, win.key) })
    }
    const all: ClientMonth[] = []
    for (const r of CLIENT_REGISTRY) all.push(await getClientMonth(c.env, deps, r, win.key, { settings: s }))
    const p = portfolioOf(win, all, s)
    return kind === 'internal' ? internalModel(p, s) : kind === 'gaps' ? gapsModel(p, s) : straightinModel(p, s)
  }
  const kindOf = (k: string): ReportKind | null => (['straightin', 'internal', 'client', 'gaps'].includes(k) ? k as ReportKind : null)

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
    if (kind === 'client' && c.req.query('direct') === '1' && no) {
      // Direct sends to a client follow the same rules as the first-Friday delivery: validated + professional address.
      const monthKey = monthWin(c.req.query('month') || lastFullMonthKey()).key
      const rec = await readApproval(c.env.COMPANIES_KV, monthKey, no)
      if (!isValidated(rec, s.approvalMode, new Date(8.64e15))) return c.json({ ok: false, error: 'Not validated yet by ' + (s.approvalMode === 'both' ? 'Aina and Olivier' : 'Aina or Olivier') }, 400)
      const pro = recipientCheck(clientRecipientsOf(registryByNo(no)!, s)).pro
      if (!pro.length) return c.json({ ok: false, error: 'No professional client email in Settings' }, 400)
      to = pro; bcc = internal
    }
    const res = await sendReport(c.env, m, to, bcc, kind === 'client' && to !== internal ? { replyTo: s.approverEmails?.olivier } : kind === 'client' ? { subjectPrefix: '[Review copy] ' } : {})
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
    if (!item || (part && !['internal', 'straightin', 'gaps'].includes(part))) return c.json({ error: 'pass ?no=<client> or ?part=internal|straightin|gaps' }, 400)
    const sentKey = `v3:sent:${month.key}:${item}`
    const already = await c.env.COMPANIES_KV.get(sentKey)
    if (already && c.req.query('force') !== '1') return c.json({ ok: true, skipped: true, already })
    const kind: ReportKind = no ? 'client' : part as ReportKind
    const m = await buildModel(c, kind, month.key, no)
    if ('error' in m) return c.json(m, 400)
    const internal = emails(s.internalEmail)
    let to = internal, bcc: string[] = []
    if (kind === 'straightin' && emails(s.straightinEmail).length) { to = emails(s.straightinEmail); bcc = internal }
    // Client reports on the 1st are REVIEW COPIES to the internal address only. The client gets it
    // on the first Friday through /api/v3/monthly/deliver, once validated (v3-approval.ts).
    // A client with nothing to show this month is not mailed.
    if (kind === 'client' && !m.tiles.length) return c.json({ ok: true, skipped: true, reason: 'no activity to report' })
    const res = await sendReport(c.env, m, to, bcc, kind === 'client' ? { subjectPrefix: '[Review copy — validate by ' + deliveryWindow(month.key).deadlineLabel + '] ' } : {})
    if (res.ok) await c.env.COMPANIES_KV.put(sentKey, `${new Date().toISOString()} ${res.id || ''} → ${to.join(',')}`, { expirationTtl: 60 * 60 * 24 * 400 })
    return c.json({ ...res, item, to, subject: m.subject }, res.ok ? 200 : 500)
  })

  // ── First-Friday client delivery with validation gate (Olivier, 2026-11-05) ──
  // Validation by Aina and/or Olivier (Settings) before Thursday 18:00 New York is required;
  // without it the report is not sent. Only professional client addresses are used.
  interface DeliveryRow { no: number; name: string; active: boolean; pro: string[]; personal: string[]; rec: ApprovalRecord; validated: boolean; delivered: string | null; link: string; pdf: string; blockers: string[] }
  async function deliveryRows(c: any, month: string, s: V3Settings): Promise<DeliveryRow[]> {
    const win = monthWin(month), dw = deliveryWindow(month), out: DeliveryRow[] = []
    for (const r of CLIENT_REGISTRY) {
      const cm = await getClientMonth(c.env, deps, r, win.key, { settings: s }).catch(() => null)
      const active = !!cm && clientModel(cm, win.label, win.key).tiles.length > 0
      const rc = recipientCheck(clientRecipientsOf(r, s))
      const rec = await readApproval(c.env.COMPANIES_KV, month, r.no)
      const validated = isValidated(rec, s.approvalMode, dw.deadline)
      const delivered = await c.env.COMPANIES_KV.get(deliveryKey(month, r.no))
      const link = await reportLink(c.env, originOf(c), r.no, month)
      const blockers: string[] = []
      if (!active) blockers.push('No activity to report this month')
      if (!rc.pro.length) blockers.push(rc.personal.length ? 'Only a personal email in Settings — add the professional one' : 'No client email in Settings')
      if (!validated) blockers.push(s.approvalMode === 'both' ? 'Needs validation by Aina AND Olivier' : 'Not validated yet')
      out.push({ no: r.no, name: r.name, active, pro: rc.pro, personal: rc.personal, rec, validated, delivered, link, pdf: link + '?format=pdf', blockers })
    }
    return out
  }
  const fmtNy = (iso?: string) => iso ? new Date(iso).toLocaleString('en-US', { timeZone: 'America/New_York', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' ET' : ''
  function deliveryTable(rows: DeliveryRow[], who: ApproverId | null, locked: boolean): string {
    const tr = rows.map(d => {
      const st = d.delivered ? `<span style="color:#057642;font-weight:800">✔ Sent</span>` : !d.active ? `<span style="color:#6e6e73">Nothing to send</span>` : d.blockers.length ? `<span style="color:#b91c1c;font-weight:800">✖ Will NOT be sent</span><div style="font-size:11px;color:#b91c1c">${d.blockers.map(esc).join('<br>')}</div>` : `<span style="color:#057642;font-weight:800">● Ready — goes out Friday</span>`
      const appr = APPROVERS.map(a => `<div style="font-size:12px">${d.rec[a.id] ? `<span style="color:#057642">✔</span> ${a.label} · ${esc(fmtNy(d.rec[a.id]))}` : `<span style="color:#b91c1c">○</span> ${a.label}`}</div>`).join('')
      const box = who && d.active && !locked && !d.delivered ? `<label style="display:inline-flex;gap:6px;align-items:center;font-weight:700;cursor:pointer"><input type="checkbox" name="ok" value="${d.no}"${d.rec[who] ? ' checked' : ''} style="width:18px;height:18px"> Validated</label>` : ''
      const to = d.pro.length ? esc(d.pro.join(', ')) : '<span style="color:#b91c1c">no professional email</span>'
      return `<tr style="border-top:1px solid #e5e7eb;vertical-align:top"><td style="padding:10px 8px"><b>#${d.no} ${esc(d.name)}</b><div style="font-size:12px;margin-top:3px">${d.active ? `<a href="${esc(d.link)}" target="_blank" style="color:#CC3333;font-weight:700">Open report</a> · <a href="${esc(d.pdf)}" target="_blank" style="color:#CC3333">PDF</a>` : ''}</div></td>
        <td style="padding:10px 8px;font-size:12px">${to}${d.personal.length ? `<div style="color:#b76b00">personal, not used: ${esc(d.personal.join(', '))}</div>` : ''}</td><td style="padding:10px 8px">${appr}</td><td style="padding:10px 8px">${st}</td>${who ? `<td style="padding:10px 8px">${box}</td>` : ''}</tr>`
    }).join('')
    return `<table style="width:100%;border-collapse:collapse;font-size:13px"><thead><tr style="text-align:left;color:#6e6e73;font-size:12px"><th style="padding:6px 8px">Client</th><th style="padding:6px 8px">Sent to (professional)</th><th style="padding:6px 8px">Validation</th><th style="padding:6px 8px">Friday</th>${who ? '<th style="padding:6px 8px">Your validation</th>' : ''}</tr></thead><tbody>${tr}</tbody></table>`
  }
  function approvePage(month: string, who: ApproverId, rows: DeliveryRow[], s: V3Settings, msg = ''): string {
    const dw = deliveryWindow(month), locked = Date.now() > dw.deadline.getTime(), label = monthWin(month).label
    const name = APPROVERS.find(a => a.id === who)!.label
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Validate client reports · ${esc(label)}</title><link rel="icon" type="image/svg+xml" href="/static/clients-icon.svg"><link rel="stylesheet" href="/static/gershon.css?v=5"><link rel="stylesheet" href="${UNIFIED_THEME_HREF}"></head>
<body style="background:#f6f6f7"><div style="max-width:1100px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,Segoe UI,sans-serif">
<div style="font-weight:900;color:#CC3333;letter-spacing:.04em">GERSHON · CLIENT REPORTS</div>
<h1 style="margin:6px 0 4px">Hi ${esc(name)} — validate the ${esc(label)} client reports</h1>
<p style="color:#444;margin:0 0 14px">Each report you tick is sent to the client on <b>${esc(new Date(dw.friday + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }))}</b> from client@gershon.ai (report in the email + PDF). ${s.approvalMode === 'both' ? 'Both Aina and Olivier must validate.' : 'One validation (Aina or Olivier) is enough.'} Deadline: <b>${esc(dw.deadlineLabel)}</b> — anything not validated by then is not sent.</p>
${msg ? `<div style="background:#ecfdf3;border:1px solid #057642;color:#057642;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-weight:700">${esc(msg)}</div>` : ''}
${locked ? `<div style="background:#fef2f2;border:1px solid #b91c1c;color:#b91c1c;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-weight:700">The deadline has passed — validations are locked for this month.</div>` : ''}
<form method="post"><div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:8px;overflow:auto">${deliveryTable(rows, who, locked)}</div>
${locked ? '' : `<div style="margin-top:14px;display:flex;gap:10px;align-items:center"><button type="submit" style="background:#CC3333;color:#fff;border:0;border-radius:999px;padding:12px 22px;font-weight:800;font-size:15px;cursor:pointer">Save my validation</button><span style="color:#6e6e73;font-size:13px">Unticking removes your validation.</span></div>`}</form>
</div></body></html>`
  }
  app.get('/approve/:month/:who/:sig', async (c) => {
    const { month, who, sig } = c.req.param()
    if (!/^\d{4}-\d{2}$/.test(month) || !(await verifyApproverSig(c.env, month, who, sig))) return c.text('This validation link is not valid.', 404)
    const s = await readSettings(c.env.COMPANIES_KV)
    c.header('x-gc-v3', '1')
    return c.html(approvePage(month, who as ApproverId, await deliveryRows(c, month, s), s, c.req.query('saved') ? 'Saved — thank you.' : ''))
  })
  app.post('/approve/:month/:who/:sig', async (c) => {
    const { month, who, sig } = c.req.param()
    if (!/^\d{4}-\d{2}$/.test(month) || !(await verifyApproverSig(c.env, month, who, sig))) return c.text('This validation link is not valid.', 404)
    const dw = deliveryWindow(month)
    if (Date.now() > dw.deadline.getTime()) return c.redirect(c.req.path, 303)
    const form = await c.req.parseBody({ all: true })
    const ticked = new Set(([] as any[]).concat(form['ok'] || []).map(String))
    const now = new Date().toISOString()
    for (const r of CLIENT_REGISTRY) {
      if (await c.env.COMPANIES_KV.get(deliveryKey(month, r.no))) continue
      const rec = await readApproval(c.env.COMPANIES_KV, month, r.no)
      const want = ticked.has(String(r.no)), has = !!rec[who as ApproverId]
      if (want === has) continue
      if (want) rec[who as ApproverId] = now; else delete rec[who as ApproverId]
      await c.env.COMPANIES_KV.put(approvalKey(month, r.no), JSON.stringify(rec), { expirationTtl: 60 * 60 * 24 * 400 })
    }
    return c.redirect(c.req.path + '?saved=1', 303)
  })
  // Signed-in overview of this month's first-Friday delivery
  app.get('/delivery', async (c) => {
    const month = /^\d{4}-\d{2}$/.test(c.req.query('month') || '') ? c.req.query('month')! : upcomingReportMonth(todayNY())
    const s = await readSettings(c.env.COMPANIES_KV), dw = deliveryWindow(month), rows = await deliveryRows(c, month, s)
    const links = (await Promise.all(APPROVERS.map(async a => `<a class="btn${a.id === 'olivier' ? ' primary' : ''}" href="${esc(await approverLink(c.env, originOf(c), month, a.id))}"><i class="fas fa-circle-check"></i> Validate as ${a.label}</a>`))).join(' ')
    return htmlV3(c, shell({ title: 'Client delivery', active: 'delivery', h1: `Client delivery · ${esc(monthWin(month).label)} reports`, right: links,
      body: `<div class="summary"><div class="summary-text">Sent on <b>${esc(dw.friday)}</b> (first Friday) from client@gershon.ai to the client's professional email, report in the email + PDF. Validation by ${s.approvalMode === 'both' ? '<b>Aina and Olivier</b>' : '<b>Aina or Olivier</b>'} required by <b>${esc(dw.deadlineLabel)}</b>; otherwise the report is not sent.</div><a class="btn" href="/settings"><i class="fas fa-sliders"></i> Recipients</a></div><div class="card" style="overflow:auto">${deliveryTable(rows, null, true)}</div>` }))
  })
  // Approval request / reminder to Aina and Olivier — called by the Thursday schedule (public, harmless: mails approvers only).
  app.post('/api/v3/approval/request', async (c) => {
    const s = await readSettings(c.env.COMPANIES_KV)
    const month = /^\d{4}-\d{2}$/.test(c.req.query('month') || '') ? c.req.query('month')! : upcomingReportMonth(todayNY())
    const dw = deliveryWindow(month)
    if (c.req.query('force') !== '1' && todayNY() !== dw.thursday) return c.json({ ok: true, skipped: true, reason: `not the Thursday before the first Friday (${dw.thursday})` })
    if (Date.now() > dw.deadline.getTime()) return c.json({ ok: true, skipped: true, reason: 'deadline passed' })
    const rows = await deliveryRows(c, month, s)
    const pending = rows.filter(r => r.active && !r.validated && !r.delivered)
    const reminder = c.req.query('reminder') === '1'
    if (reminder && !pending.length) return c.json({ ok: true, skipped: true, reason: 'everything validated' })
    const out: any[] = []
    for (const a of APPROVERS) {
      const to = emails((s.approverEmails as any)?.[a.id] || '')
      if (!to.length) continue
      // in "either" mode a reminder goes only if the other approver has not covered everything
      const link = await approverLink(c.env, originOf(c), month, a.id)
      const label = monthWin(month).label
      const html = `<div style="font-family:Arial,sans-serif;max-width:640px;color:#111"><div style="font-weight:900;color:#CC3333">GERSHON · CLIENT REPORTS</div>
<h2 style="margin:8px 0">${reminder ? 'Reminder — ' : ''}${esc(a.label)}, please validate the ${esc(label)} client reports</h2>
<p>They go out to clients <b>tomorrow (first Friday)</b> from client@gershon.ai. Deadline: <b>${esc(dw.deadlineLabel)}</b>. ${s.approvalMode === 'both' ? 'Both Aina and Olivier must validate.' : 'One validation (Aina or Olivier) is enough.'} Anything not validated is <b>not sent</b>.</p>
<p style="margin:20px 0"><a href="${esc(link)}" style="background:#CC3333;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:800">Review &amp; validate</a></p>
<p style="font-size:13px;color:#444">${pending.length} of ${rows.filter(r => r.active).length} reports still waiting for validation:</p><ul style="font-size:13px">${pending.map(r => `<li>#${r.no} ${esc(r.name)}${r.pro.length ? '' : ' — <span style="color:#b91c1c">no professional email</span>'}</li>`).join('')}</ul></div>`
      out.push({ who: a.id, to, ...(await sendPlain(c.env, to, `${reminder ? 'Reminder: ' : ''}Validate the ${label} client reports by ${dw.deadlineLabel}`, html)) })
    }
    return c.json({ ok: true, month, pending: pending.map(r => r.no), sent: out })
  })
  // First-Friday delivery — one call per client (public, idempotent, gated).
  app.post('/api/v3/monthly/deliver', async (c) => {
    const s = await readSettings(c.env.COMPANIES_KV)
    const month = /^\d{4}-\d{2}$/.test(c.req.query('month') || '') ? c.req.query('month')! : upcomingReportMonth(todayNY())
    const dw = deliveryWindow(month)
    const no = c.req.query('no') || ''
    const r = registryByNo(no)
    if (!r) return c.json({ error: 'pass ?no=<client>' }, 400)
    if (c.req.query('force') !== '1' && todayNY() !== dw.friday) return c.json({ ok: true, skipped: true, reason: `today is not the delivery Friday (${dw.friday})` })
    if (todayNY() < dw.friday) return c.json({ ok: false, skipped: true, reason: 'never before the delivery Friday' })
    const done = await c.env.COMPANIES_KV.get(deliveryKey(month, r.no))
    if (done) return c.json({ ok: true, skipped: true, already: done })
    const rec = await readApproval(c.env.COMPANIES_KV, month, r.no)
    const block = async (reason: string) => { await c.env.COMPANIES_KV.put(`v3:delivery-block:${month}:${r.no}`, reason, { expirationTtl: 60 * 60 * 24 * 400 }); return c.json({ ok: true, sent: false, no: r.no, reason }) }
    if (!isValidated(rec, s.approvalMode, dw.deadline)) return block(`not validated by ${s.approvalMode === 'both' ? 'Aina and Olivier' : 'Aina or Olivier'} before ${dw.deadlineLabel}`)
    const pro = recipientCheck(clientRecipientsOf(r, s)).pro
    if (!pro.length) return block('no professional client email in Settings')
    const m = await buildModel(c, 'client', month, String(r.no))
    if ('error' in m) return c.json(m, 400)
    if (!m.tiles.length) return block('no activity to report')
    const res = await sendReport(c.env, m, pro, emails(s.internalEmail), { replyTo: s.approverEmails?.olivier })
    if (res.ok) await c.env.COMPANIES_KV.put(deliveryKey(month, r.no), `${new Date().toISOString()} ${res.id || ''} → ${pro.join(',')}`, { expirationTtl: 60 * 60 * 24 * 400 })
    return c.json({ ...res, sent: res.ok, no: r.no, to: pro, subject: m.subject }, res.ok ? 200 : 500)
  })
  // Friday summary to Aina, Olivier and the internal address: what went out, what was held back and why.
  app.post('/api/v3/monthly/deliver/summary', async (c) => {
    const s = await readSettings(c.env.COMPANIES_KV)
    const month = /^\d{4}-\d{2}$/.test(c.req.query('month') || '') ? c.req.query('month')! : upcomingReportMonth(todayNY())
    const dw = deliveryWindow(month)
    if (c.req.query('force') !== '1' && todayNY() !== dw.friday) return c.json({ ok: true, skipped: true })
    const rows = await deliveryRows(c, month, s)
    const sent = rows.filter(r => r.delivered), held = rows.filter(r => r.active && !r.delivered)
    const html = `<div style="font-family:Arial,sans-serif;max-width:680px;color:#111"><div style="font-weight:900;color:#CC3333">GERSHON · CLIENT REPORTS</div><h2 style="margin:8px 0">${esc(monthWin(month).label)} client reports — ${sent.length} sent, ${held.length} held back</h2>${deliveryTable(rows, null, true)}</div>`
    const to = [...new Set([...emails(s.internalEmail), ...emails(s.approverEmails?.aina || ''), ...emails(s.approverEmails?.olivier || '')])]
    return c.json(await sendPlain(c.env, to, `Client reports ${monthWin(month).label}: ${sent.length} sent, ${held.length} held back`, html))
  })
}
