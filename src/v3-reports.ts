// ─────────────────────────────────────────────────────────────────────────────
// v3 monthly reports — three audiences, one data model (v3-data.ts):
//   straightin : provider report to Straight-in — Network results + what reached Engage
//   internal   : our own results + ranked sources of improvement
//   client     : one per client, always positive — one-pager in the email body + PDF attached
// Email HTML uses inline styles only (Gmail strips <style>). PDFs are one Letter
// page each, drawn with the Linalysis/Social zero-dependency writer.
// ─────────────────────────────────────────────────────────────────────────────
import { MrPdf, strWidth as W, type RGB } from './pdf-writer'
import { band, clientLabel, overallScore, pctOf, type ClientMonth, type Portfolio, type V3Settings } from './v3-data'

export type ReportKind = 'straightin' | 'internal' | 'client'

const RED = '#FE1B04', INK = '#1d1d1f', MUT = '#6e6e73', RULE = '#e5e7eb', TINT = '#fafafa', GOOD = '#057642', WARN = '#b76b00'
const fmt = (n: number | null | undefined) => (n == null ? '—' : Math.round(n).toLocaleString('en-US'))
const esc = (s: any) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const plural = (n: number, w: string) => `${fmt(n)} ${w}${Math.round(n) === 1 ? '' : 's'}`
const bandColor = (p: number | null | undefined) => ({ good: GOOD, warn: WARN, crit: RED, none: MUT })[band(p)]
const arrow = (cur: number, prev: number) => {
  if (!prev && !cur) return ''
  const d = cur - prev
  return d === 0 ? '= vs last month' : `${d > 0 ? '▲' : '▼'} ${fmt(Math.abs(d))} vs last month`
}

export interface Tile { label: string; value: string; sub: string; color?: string }
export interface Section { title: string; lines?: string[]; table?: { head: string[]; rows: string[][]; align?: ('l' | 'r')[] } }
export interface ReportModel {
  kind: ReportKind
  title: string          // big heading
  eyebrow: string        // small line above
  month: string          // September 2026
  headline: string       // banner title
  subline: string        // banner line
  tiles: Tile[]
  daily?: { date: string; posts: number }[]
  dailyCaption?: string
  sections: Section[]
  footer: string
  subject: string
  filename: string
}

// ── Improvement sources (internal) / requests (Straight-in) ──────────────────
function improvementSources(p: Portfolio, s: V3Settings): string[] {
  const out: { w: number; t: string }[] = []
  for (const c of p.clients) {
    const L = clientLabel(c)
    if (!c.promote) out.push({ w: 90, t: `${L} — Promote: no social account is collecting in social.gershon.ai. Connect LinkedIn/X so posts count.` })
    else if (c.promote.posts === 0) out.push({ w: 85, t: `${L} — Promote: 0 posts this month (target ${c.promote.target}). Restart the posting schedule.` })
    else if (c.promote.pct < 40) out.push({ w: 60 - c.promote.pct / 2, t: `${L} — Promote: ${c.promote.posts} of ${c.promote.target} posts (${c.promote.pct}%). Add ${Math.max(0, c.promote.target - c.promote.posts)} posts to reach target.` })
    if (!c.network && c.keys.length) out.push({ w: 70, t: `${L} — Network: no Straight-in campaign report linked. Paste this week's link on the Straight-in page.` })
    else if (c.network && c.network.sent === 0) out.push({ w: 75, t: `${L} — Network: no invitations sent this month. Check the Straight-in campaign is running.` })
    else if (c.network && c.network.rate < s.acceptTarget * 0.8) out.push({ w: 55, t: `${L} — Network: acceptance ${c.network.rate}% vs ${s.acceptTarget}% target. Review targeting and the connection note with Straight-in.` })
    if (!c.engage && c.keys.length) out.push({ w: 65, t: `${L} — Engage: Streak pipeline could not be read.` })
    else if (!c.keys.length) out.push({ w: 80, t: `${L} — Engage: no Streak pipeline configured in this platform yet.` })
    else if (c.engage && c.engage.newLeads === 0) out.push({ w: 72, t: `${L} — Engage: 0 new leads this month (goal ${s.leadsPerMonth}). Push accepted connections into the pipeline.` })
    else if (c.engage && c.engage.pct < 50) out.push({ w: 50, t: `${L} — Engage: ${c.engage.newLeads} new leads (${c.engage.pct}% of goal).` })
  }
  return out.sort((a, b) => b.w - a.w).map(x => x.t)
}

function winsOf(p: Portfolio): string[] {
  const w: string[] = []
  const bestP = [...p.clients].filter(c => c.promote && c.promote.posts > 0).sort((a, b) => b.promote!.posts - a.promote!.posts)[0]
  if (bestP) w.push(`Promote: ${clientLabel(bestP)} published ${plural(bestP.promote!.posts, 'post')} (${bestP.promote!.pct}% of target).`)
  const bestN = [...p.clients].filter(c => c.network && c.network.sent >= 20).sort((a, b) => b.network!.rate - a.network!.rate)[0]
  if (bestN) w.push(`Network: ${clientLabel(bestN)} reached ${bestN.network!.rate}% acceptance on ${fmt(bestN.network!.sent)} invitations.`)
  const bestE = [...p.clients].filter(c => c.engage && c.engage.newLeads > 0).sort((a, b) => b.engage!.newLeads - a.engage!.newLeads)[0]
  if (bestE) w.push(`Engage: ${clientLabel(bestE)} added ${plural(bestE.engage!.newLeads, 'new lead')}.`)
  return w
}

// ── Model builders ───────────────────────────────────────────────────────────
export function internalModel(p: Portfolio, s: V3Settings): ReportModel {
  const t = p.totals
  const rows = [...p.clients].sort((a, b) => (overallScore(b) ?? -1) - (overallScore(a) ?? -1)).map(c => [
    `#${c.no}`, c.name,
    c.promote ? `${c.promote.posts}/${c.promote.target} · ${c.promote.pct}%` : '—',
    c.network ? `${c.network.rate}% · ${fmt(c.network.accepted)}/${fmt(c.network.sent)}` : '—',
    c.engage ? `${c.engage.newLeads} · ${c.engage.pct}%` : '—',
    overallScore(c) == null ? '—' : `${overallScore(c)}%`,
  ])
  const sources = improvementSources(p, s)
  return {
    kind: 'internal', eyebrow: 'GC · Internal monthly review', title: 'Our results', month: p.month.label,
    headline: t.score == null ? 'No data collected this month' : `Portfolio at ${t.score}% of plan`,
    subline: `${p.clients.length} clients · Promote ${t.postsPct}% · Network ${t.ratePct}% · Engage ${t.leadsPct}% of target`,
    tiles: [
      { label: 'PROMOTE', value: `${t.postsPct}%`, sub: `${fmt(t.posts)} of ${fmt(t.postsTarget)} posts`, color: bandColor(t.postsPct) },
      { label: 'NETWORK', value: `${t.rate}%`, sub: `acceptance · target ${s.acceptTarget}% · ${fmt(t.sent)} sent`, color: bandColor(t.ratePct) },
      { label: 'ENGAGE', value: fmt(t.newLeads), sub: `new leads · goal ${fmt(t.leadsTarget)} (${t.leadsPct}%)`, color: bandColor(t.leadsPct) },
      { label: 'MEETINGS', value: fmt(t.meetings), sub: `moved to meeting+ · ${fmt(t.opportunities)} Straight-in opps`, color: INK },
    ],
    sections: [
      { title: 'Results by client', table: { head: ['#', 'Client', 'Promote', 'Network', 'Engage', 'Score'], rows, align: ['l', 'l', 'r', 'r', 'r', 'r'] } },
      { title: 'Sources for improvement (highest impact first)', lines: sources.length ? sources.slice(0, 12) : ['Every channel is on plan this month.'] },
      { title: 'What worked', lines: winsOf(p) },
    ],
    footer: `client.gershoncrm.com · targets: ${s.promoteTarget} posts/${s.promoteUnit === 'day' ? 'working day' : 'week'}, ${s.acceptTarget}% acceptance, ${s.leadsPerMonth} leads/client/month`,
    subject: `GC Monthly review — ${p.month.label} — ${t.score ?? 0}% of plan`,
    filename: `GC-internal-review-${p.month.key}.pdf`,
  }
}

export function straightinModel(p: Portfolio, s: V3Settings): ReportModel {
  const N = p.clients.filter(c => c.network || c.engage)
  const t = p.totals
  const rows = N.map(c => [
    `#${c.no}`, c.name,
    c.network ? fmt(c.network.sent) : '—',
    c.network ? fmt(c.network.accepted) : '—',
    c.network ? `${c.network.rate}%` : '—',
    c.network ? fmt(c.network.opportunities) : '—',
    c.engage ? `${c.engage.newLeads}/${s.leadsPerMonth}` : '—',
    c.engage ? fmt(c.engage.meetings) : '—',
  ])
  const opps = p.clients.flatMap(c => (c.network?.namedOpps || []).map(o => `#${c.no} ${c.name} — ${o.name}${o.title ? ', ' + o.title : ''}${o.company ? ' at ' + o.company : ''} (${o.type}, ${o.date})`))
  const asks: string[] = []
  for (const c of p.clients) {
    if (!c.network) continue
    if (c.network.sent === 0) asks.push(`#${c.no} ${c.name}: no invitations this month — please confirm the campaign is live.`)
    else if (c.network.rate < s.acceptTarget) asks.push(`#${c.no} ${c.name}: acceptance ${c.network.rate}% (target ${s.acceptTarget}%) — please refresh targeting / connection note.`)
    if (c.engage && c.engage.newLeads < s.leadsPerMonth) asks.push(`#${c.no} ${c.name}: ${c.engage.newLeads} of ${s.leadsPerMonth} qualified leads reached our pipeline — more conversations to hand over please.`)
  }
  return {
    kind: 'straightin', eyebrow: 'Gershon Consulting · Monthly report for Straight-in', title: 'Network & Engage', month: p.month.label,
    headline: `${fmt(t.accepted)} new connections · ${fmt(t.newLeads)} qualified leads in our pipeline`,
    subline: `${fmt(t.sent)} invitations · ${t.rate}% acceptance (target ${s.acceptTarget}%) · ${fmt(t.opportunities)} opportunities logged · goal ${s.leadsPerMonth} qualified leads per client`,
    tiles: [
      { label: 'INVITATIONS', value: fmt(t.sent), sub: 'connection requests sent', color: INK },
      { label: 'ACCEPTANCE', value: `${t.rate}%`, sub: `${fmt(t.accepted)} accepted · target ${s.acceptTarget}%`, color: bandColor(t.ratePct) },
      { label: 'OPPORTUNITIES', value: fmt(t.opportunities), sub: 'logged in Straight-in', color: INK },
      { label: 'QUALIFIED LEADS', value: fmt(t.newLeads), sub: `in our CRM · goal ${fmt(t.leadsTarget)}`, color: bandColor(t.leadsPct) },
    ],
    sections: [
      { title: 'By client (Gershon client number)', table: { head: ['#', 'Client', 'Sent', 'Accepted', 'Rate', 'Opps', 'Leads', 'Meetings'], rows, align: ['l', 'l', 'r', 'r', 'r', 'r', 'r', 'r'] } },
      { title: 'Opportunities logged this month', lines: opps.length ? opps.slice(0, 10) : ['None logged in the weekly reports this month.'] },
      { title: 'Requests for next month', lines: asks.length ? asks.slice(0, 10) : ['Keep the same pace — every campaign is on target.'] },
    ],
    footer: 'Gershon Consulting · client numbers are shared across all Gershon platforms',
    subject: `Gershon × Straight-in — ${p.month.label} Network & Engage report`,
    filename: `Gershon-Straight-in-${p.month.key}.pdf`,
  }
}

export function clientModel(c: ClientMonth, monthLabel: string, monthKey: string): ReportModel {
  const tiles: Tile[] = []
  const P = c.promote, N = c.network, E = c.engage
  if (P && P.posts > 0) tiles.push({ label: 'POSTS PUBLISHED', value: fmt(P.posts), sub: P.platforms.join(' + ') || 'social', color: RED })
  if (P && P.engagement > 0) tiles.push({ label: 'ENGAGEMENTS', value: fmt(P.engagement), sub: `${fmt(P.likes)} likes · ${fmt(P.comments)} comments`, color: RED })
  if (N && N.accepted > 0) tiles.push({ label: 'NEW CONNECTIONS', value: fmt(N.accepted), sub: `decision-makers in your network`, color: RED })
  if (N && N.messages > 0 && tiles.length < 4) tiles.push({ label: 'CONVERSATIONS', value: fmt(N.messages), sub: 'personal messages sent', color: RED })
  if (E && E.newLeads > 0 && tiles.length < 4) tiles.push({ label: 'NEW LEADS', value: fmt(E.newLeads), sub: 'added to your pipeline', color: RED })
  if (E && E.meetings > 0 && tiles.length < 4) tiles.push({ label: 'MEETINGS', value: fmt(E.meetings), sub: 'prospects moved to meeting', color: RED })
  if (P && P.followersGrowth > 0 && tiles.length < 4) tiles.push({ label: 'NEW FOLLOWERS', value: `+${fmt(P.followersGrowth)}`, sub: `${fmt(P.followers)} total`, color: RED })
  if (N && N.sent > 0 && tiles.length < 4) tiles.push({ label: 'INVITATIONS', value: fmt(N.sent), sub: 'targeted US prospects reached', color: RED })

  // Positive headline: lead with the strongest real number
  let headline = `Your US presence kept growing in ${monthLabel}`
  if (E && E.meetings > 0) headline = `${plural(E.meetings, 'prospect')} moved to a meeting in ${monthLabel}`
  else if (E && E.newLeads > 0) headline = `${plural(E.newLeads, 'new lead')} added to your US pipeline`
  else if (N && N.accepted > 0) headline = `${plural(N.accepted, 'new US connection')} in ${monthLabel}`
  else if (P && P.posts > 0) headline = `${plural(P.posts, 'post')} kept your brand visible in the US`

  const reach: string[] = []
  if (P && P.posts > 0) reach.push(`${plural(P.posts, 'post')}`)
  if (N && N.accepted > 0) reach.push(`${plural(N.accepted, 'new connection')}`)
  if (E && E.newLeads > 0) reach.push(`${plural(E.newLeads, 'new lead')}`)
  const subline = reach.length ? `This month: ${reach.join(' · ')}. Every action builds on the last.` : 'Your campaign foundations are in place and the momentum is building.'

  const hl: string[] = []
  if (P && P.prevPosts > 0 && P.posts > P.prevPosts) hl.push(`Posting up ${fmt(P.posts - P.prevPosts)} vs last month — more visibility for your brand.`)
  if (P && P.engagement > 0) hl.push(`Your content earned ${plural(P.engagement, 'engagement')} (likes, comments and shares).`)
  if (P && P.followersGrowth > 0) hl.push(`Your audience grew by ${plural(P.followersGrowth, 'follower')}.`)
  if (N && N.accepted > 0) hl.push(`${plural(N.accepted, 'decision-maker')} accepted your invitation${N.rate >= 15 ? ` — a ${N.rate}% acceptance rate` : ''}.`)
  if (N && N.accepted > N.prevAccepted && N.prevAccepted > 0) hl.push(`More new connections than last month (+${fmt(N.accepted - N.prevAccepted)}).`)
  if (N && N.opportunities > 0) hl.push(`${plural(N.opportunities, 'conversation')} turned into a concrete opportunity.`)
  for (const o of (N?.namedOpps || []).slice(0, 3)) hl.push(`Opportunity: ${o.title || 'decision-maker'}${o.company ? ' at ' + o.company : ''} (${o.type}).`)
  if (E && E.newLeads > 0) hl.push(`${plural(E.newLeads, 'qualified prospect')} added to your pipeline, ${fmt(E.activeLeads)} active in total.`)
  if (E && E.meetingsTotal > 0) hl.push(`${plural(E.meetingsTotal, 'prospect')} now at meeting stage or beyond.`)
  if (P?.topPost && P.topPost.engagement > 0) hl.push(`Top post (${P.topPost.engagement} engagements): "${P.topPost.snippet.slice(0, 110)}${P.topPost.snippet.length > 110 ? '…' : ''}"`)
  if (!hl.length) hl.push('Campaign set-up, targeting and content are in place — results build from here.')

  const next = [
    'Keep the publishing rhythm so your brand stays visible to US buyers.',
    'Turn new connections into conversations with personal follow-ups.',
    'Book qualified prospects into calls — we will keep you posted as they move.',
  ]
  return {
    kind: 'client', eyebrow: `Gershon Consulting · Monthly report · Client #${c.no}`, title: c.name, month: monthLabel,
    headline, subline, tiles: tiles.slice(0, 4),
    daily: P && P.posts > 0 ? P.daily : undefined, dailyCaption: 'Posts published per day',
    sections: [
      { title: 'Highlights', lines: hl.slice(0, 7) },
      { title: 'Next month', lines: next },
    ],
    footer: 'Gershon Consulting · US market entry · gershonconsulting.com',
    subject: `${c.name} — your ${monthLabel} results with Gershon`,
    filename: `Gershon-${c.name.replace(/[^A-Za-z0-9]+/g, '-')}-${monthKey}.pdf`,
  }
}

// ── Email HTML (inline styles) ───────────────────────────────────────────────
export function reportHtml(m: ReportModel): string {
  const tile = (t: Tile) => `<td valign="top" style="width:25%;padding:0 5px 0 0;"><div style="border:1px solid ${RULE};border-top:3px solid ${t.color || INK};border-radius:10px;padding:12px 12px 10px;background:#fff;">
    <div style="font-size:10px;font-weight:700;color:${MUT};letter-spacing:.06em;">${esc(t.label)}</div>
    <div style="font-size:24px;font-weight:800;color:${t.color || INK};margin-top:4px;line-height:1.1;">${esc(t.value)}</div>
    <div style="font-size:11px;color:${MUT};margin-top:4px;">${esc(t.sub)}</div></div></td>`
  const sec = (s: Section) => {
    let body = ''
    if (s.table) {
      body = `<table style="width:100%;border-collapse:collapse;font-size:12px;">
        <tr>${s.table.head.map((h, i) => `<th style="text-align:${s.table!.align?.[i] === 'r' ? 'right' : 'left'};font-size:10px;color:${MUT};text-transform:uppercase;letter-spacing:.05em;padding:7px 8px;border-bottom:1px solid ${RULE};background:${TINT};">${esc(h)}</th>`).join('')}</tr>
        ${s.table.rows.map(r => `<tr>${r.map((v, i) => `<td style="padding:8px;border-bottom:1px solid ${RULE};text-align:${s.table!.align?.[i] === 'r' ? 'right' : 'left'};${i === 0 ? `color:${RED};font-weight:800;` : ''}${i === 1 ? 'font-weight:600;' : ''}">${esc(v)}</td>`).join('')}</tr>`).join('')}
      </table>`
    }
    if (s.lines) body += `<ul style="margin:0;padding:0 0 0 18px;">${s.lines.map(l => `<li style="margin:0 0 6px;font-size:13px;line-height:1.5;color:${INK};">${esc(l)}</li>`).join('')}</ul>`
    return `<div style="margin:22px 0 0;"><div style="font-size:11px;font-weight:800;color:${MUT};text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid ${RULE};padding-bottom:6px;margin-bottom:10px;">${esc(s.title)}</div>${body}</div>`
  }
  const bars = m.daily ? (() => {
    const max = Math.max(1, ...m.daily!.map(d => d.posts))
    return `<div style="margin:22px 0 0;"><div style="font-size:11px;font-weight:800;color:${MUT};text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;">${esc(m.dailyCaption || '')}</div>
      <table style="width:100%;border-collapse:collapse;height:70px;"><tr>${m.daily!.map(d => `<td valign="bottom" style="padding:0 1px;"><div style="height:${Math.max(2, Math.round((d.posts / max) * 64))}px;background:${d.posts ? RED : '#e7e8eb'};border-radius:2px 2px 0 0;"></div></td>`).join('')}</tr></table>
      <table style="width:100%;font-size:10px;color:${MUT};"><tr><td>${esc(m.daily![0].date.slice(5))}</td><td style="text-align:right;">${esc(m.daily![m.daily!.length - 1].date.slice(5))}</td></tr></table></div>`
  })() : ''
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(m.subject)}</title></head>
<body style="margin:0;padding:0;background:#f3f3f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
<div style="max-width:720px;margin:0 auto;padding:22px 14px 34px;">
 <div style="background:#fff;border:1px solid ${RULE};border-radius:14px;padding:24px 24px 20px;">
  <table style="width:100%;border-collapse:collapse;"><tr>
   <td style="border-left:4px solid ${RED};padding-left:12px;"><div style="font-size:11px;font-weight:700;color:${MUT};letter-spacing:.04em;">${esc(m.eyebrow)}</div>
     <div style="font-size:22px;font-weight:800;margin-top:2px;">${esc(m.title)}</div></td>
   <td style="text-align:right;vertical-align:top;"><div style="font-size:18px;font-weight:800;color:${RED};">${esc(m.month)}</div><div style="font-size:10px;font-weight:800;color:${RED};letter-spacing:.12em;">GERSHON.AI</div></td>
  </tr></table>
  <div style="margin:18px 0 16px;padding:14px 16px;background:#fff5f5;border-left:4px solid ${RED};border-radius:8px;">
   <div style="font-size:16px;font-weight:800;">${esc(m.headline)}</div><div style="font-size:13px;color:${INK};margin-top:4px;">${esc(m.subline)}</div></div>
  ${m.tiles.length ? `<table style="width:100%;border-collapse:collapse;"><tr>${m.tiles.map(tile).join('')}</tr></table>` : ''}
  ${bars}
  ${m.sections.map(sec).join('')}
  <div style="margin-top:22px;padding-top:10px;border-top:1px solid ${RULE};font-size:10px;color:${MUT};">${esc(m.footer)}${m.kind === 'client' ? ' · The full one-page report is attached as a PDF.' : ' · PDF attached.'}</div>
 </div>
</div></body></html>`
}

// ── One-page PDF ─────────────────────────────────────────────────────────────
const hex = (h: string): RGB => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255) as RGB
const C = { RED: hex(RED), INK: hex('#111317'), MUT: hex(MUT), RULE: hex('#E4E2DC'), TINT: hex('#FFF5F5'), WHITE: [1, 1, 1] as RGB, BG: hex('#F5F4F0'), ZERO: hex('#E7E8EB') }
const PW = 612, PH = 792, M = 40, CW = PW - 2 * M
function clip(s: string, size: number, bold: boolean, max: number): string {
  s = String(s ?? '')
  if (W(s, bold, size) <= max) return s
  while (s.length && W(s + '…', bold, size) > max) s = s.slice(0, -1)
  return s + '…'
}
function wrap(s: string, size: number, bold: boolean, max: number, maxLines: number): string[] {
  const words = String(s).split(/\s+/), lines: string[] = []
  let cur = ''
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w
    if (W(t, bold, size) <= max) cur = t
    else { if (cur) lines.push(cur); cur = w }
    if (lines.length >= maxLines) break
  }
  if (cur && lines.length < maxLines) lines.push(cur)
  if (lines.length === maxLines) lines[maxLines - 1] = clip(lines[maxLines - 1], size, bold, max)
  return lines
}
export function reportPdfBase64(m: ReportModel): string {
  const p = new MrPdf(PW, PH)
  let y = PH - M
  // head
  p.rect(M, y - 6, 4, 36, C.RED)
  p.text(M + 14, y + 16, clip(m.title, 18, true, 330), 18, true, C.INK)
  p.text(M + 14, y + 2, clip(m.eyebrow, 8.5, false, 330), 8.5, false, C.MUT)
  p.rtext(PW - M, y + 16, m.month, 15, true, C.RED)
  p.rtext(PW - M, y + 3, 'GERSHON.AI', 8, true, C.RED)
  y -= 22
  p.line(M, y, PW - M, C.INK, 1.2)
  // banner
  y -= 50
  p.rect(M, y, CW, 42, C.TINT); p.rect(M, y, 3, 42, C.RED)
  p.text(M + 14, y + 25, clip(m.headline, 12.5, true, CW - 26), 12.5, true, C.INK)
  p.text(M + 14, y + 10, clip(m.subline, 8.4, false, CW - 26), 8.4, false, C.INK)
  // tiles
  if (m.tiles.length) {
    const n = m.tiles.length, gap = 9, tw = (CW - (n - 1) * gap) / n, h = 60
    y -= h + 12
    m.tiles.forEach((t, i) => {
      const x = M + i * (tw + gap), col = t.color ? hex(t.color) : C.INK
      p.rect(x, y, tw, h, C.WHITE)
      p.line(x, y, x + tw, C.RULE, 0.6); p.line(x, y + h, x + tw, C.RULE, 0.6)
      p.rect(x, y, 0.6, h, C.RULE); p.rect(x + tw - 0.6, y, 0.6, h, C.RULE)
      p.rect(x, y + h - 3, tw, 3, col)
      p.text(x + 10, y + h - 17, clip(t.label, 6.6, true, tw - 16), 6.6, true, C.MUT)
      p.text(x + 10, y + h - 39, clip(t.value, 20, true, tw - 16), 20, true, col)
      p.text(x + 10, y + 9, clip(t.sub, 6.6, false, tw - 16), 6.6, false, C.MUT)
    })
  }
  // daily bars
  if (m.daily && m.daily.length) {
    y -= 22
    const L = (m.dailyCaption || '').toUpperCase()
    p.text(M, y, L, 7.5, true, C.MUT); p.line(M + W(L, true, 7.5) + 8, y + 2.5, PW - M, C.RULE, 0.5)
    const h = 64, base = y - 10 - h, n = m.daily.length, bw = CW / n
    const max = Math.max(1, ...m.daily.map(d => d.posts))
    m.daily.forEach((d, i) => {
      const bh = d.posts ? Math.max(2, (d.posts / max) * h) : 1.5
      p.rect(M + i * bw + 1, base, Math.max(1, bw - 2), bh, d.posts ? C.RED : C.ZERO)
    })
    p.text(M, base - 10, m.daily[0].date.slice(5), 6.5, false, C.MUT)
    p.rtext(PW - M, base - 10, m.daily[n - 1].date.slice(5), 6.5, false, C.MUT)
    p.rtext(PW - M, base + h + 2, `max ${max}/day`, 6.5, false, C.MUT)
    y = base - 12
  }
  // sections
  for (const s of m.sections) {
    if (y < M + 70) break
    y -= 22
    const L = s.title.toUpperCase()
    p.text(M, y, L, 7.5, true, C.MUT); p.line(M + W(L, true, 7.5) + 8, y + 2.5, PW - M, C.RULE, 0.5)
    y -= 6
    if (s.table) {
      const cols = s.table.head.length
      const widths = s.table.head.map((_, i) => i === 0 ? 34 : i === 1 ? 150 : (CW - 184) / (cols - 2))
      const xs: number[] = []; let acc = M; widths.forEach(w => { xs.push(acc); acc += w })
      const row = (vals: string[], bold: boolean, size: number, color: RGB, bg?: RGB) => {
        y -= 15
        if (bg) p.rect(M, y - 4, CW, 15, bg)
        vals.forEach((v, i) => {
          const right = s.table!.align?.[i] === 'r'
          const t = clip(v, size, bold || i <= 1, widths[i] - 6)
          const col = i === 0 && !bg ? C.RED : color
          if (right) p.rtext(xs[i] + widths[i] - 4, y, t, size, bold || i <= 1, col)
          else p.text(xs[i] + 2, y, t, size, bold || i <= 1, col)
        })
        p.line(M, y - 4, PW - M, C.RULE, 0.4)
      }
      row(s.table.head.map(h => h.toUpperCase()), true, 6.6, C.MUT, C.BG)
      for (const r of s.table.rows) { if (y < M + 40) break; row(r, false, 7.8, C.INK) }
    }
    if (s.lines) {
      for (const l of s.lines) {
        const ls = wrap(l, 8.4, false, CW - 14, 2)
        if (y - ls.length * 11 < M + 24) break
        y -= 13
        p.rect(M + 2, y + 2.2, 3.2, 3.2, C.RED)
        ls.forEach((t, i) => { if (i) y -= 11; p.text(M + 12, y, t, 8.4, false, C.INK) })
      }
    }
  }
  // footer
  p.line(M, M + 6, PW - M, C.RULE, 0.5)
  p.text(M, M - 4, clip(m.footer, 6.6, false, 420), 6.6, false, C.MUT)
  p.rtext(PW - M, M - 4, `Generated ${new Date().toISOString().slice(0, 10)}`, 6.6, false, C.MUT)
  return p.base64()
}

export function pdfBytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64); const u = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i)
  return u
}

export { pctOf }
