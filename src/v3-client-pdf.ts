// ─────────────────────────────────────────────────────────────────────────────
// Client monthly report — multi-page PDF (Olivier, 2026-11-05: "much more
// professional, more graphs, no link to the interactive report, longer than
// one page").
//
// Page 1  : cover band, headline, "What we did for you", campaign since launch,
//           key insights.
// Page 2+ : flowing chapters with charts — network since launch, monthly
//           activity, acceptance, opportunities, the month week by week, per
//           LinkedIn account, who you are talking to, pipeline, brand
//           visibility, LinkedIn presence, next month.
//
// Same rules as the rest of the client report: always positive on the
// campaign's actions, every number comes from the ClientMonth record and the
// Straight-in history, nothing is estimated. A chapter with no data is left out.
// Drawn with the zero-dependency writer (pdf-writer.ts), edge-runtime safe.
// ─────────────────────────────────────────────────────────────────────────────
import { MrPdf, strWidth as W, type RGB } from './pdf-writer'
import type { ClientMonth } from './v3-data'
import { actionsOf, insightsOf, seniorityOf, type StoryHistory } from './v3-story'
import { HISTORY_BENCHMARKS as B } from './history-benchmarks'

export interface ClientPdfInput {
  cm: ClientMonth
  monthKey: string
  monthLabel: string
  headline: string
  subline: string
  history: StoryHistory | null
  next: string[]
  acceptTarget: number
  footer: string
}

const hex = (h: string): RGB => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255) as RGB
const C = {
  RED: hex('#CC3333'), RED_D: hex('#A8281F'), RED_T: hex('#F6D6D6'), RED_TT: hex('#FFF5F5'),
  BLUE: hex('#4A7BC0'), BLUE_T: hex('#DCE6F4'), GOLD: hex('#B88300'), GREEN: hex('#057642'),
  INK: hex('#111317'), MUT: hex('#6E6E73'), RULE: hex('#E4E2DC'), GRID: hex('#EEEDE9'),
  BG: hex('#F5F4F0'), GREY: hex('#C9CBD0'), WHITE: [1, 1, 1] as RGB,
}
const PW = 612, PH = 792, M = 40, CW = PW - 2 * M, TOP = PH - 66, BOTTOM = M + 30
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MLONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const mShort = (k: string) => `${MONTHS[Number(k.slice(5, 7)) - 1]} ${k.slice(2, 4)}`
const mLong = (k: string) => `${MLONG[Number(k.slice(5, 7)) - 1]} ${k.slice(0, 4)}`
const fmt = (n: number | null | undefined) => (n == null ? '—' : Math.round(n).toLocaleString('en-US'))
const pct1 = (n: number) => `${(Math.round(n * 10) / 10).toString()}%`
const plural = (n: number, w: string, pl?: string) => `${fmt(n)} ${Math.round(n) === 1 ? w : (pl || w + 's')}`

function clip(s: string, size: number, bold: boolean, max: number): string {
  s = String(s ?? '')
  if (W(s, bold, size) <= max) return s
  while (s.length && W(s + '…', bold, size) > max) s = s.slice(0, -1)
  return s + '…'
}
function wrap(s: string, size: number, bold: boolean, max: number, maxLines: number): string[] {
  const words = String(s ?? '').split(/\s+/).filter(Boolean), lines: string[] = []
  let cur = '', cut = false
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w
    if (W(t, bold, size) <= max) cur = t
    else { if (cur) lines.push(cur); cur = w }
    if (lines.length >= maxLines) { cut = true; break }
  }
  if (cur && lines.length < maxLines) lines.push(cur)
  if (cut || (lines.length === maxLines && words.join(' ').length > lines.join(' ').length)) lines[maxLines - 1] = clip(lines[maxLines - 1] + ' …', size, bold, max)
  return lines
}
function niceMax(v: number): number {
  if (!(v > 0)) return 1
  const e = Math.pow(10, Math.floor(Math.log10(v))), f = v / e
  const s = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10
  return s * e
}
const short = (n: number) => (n >= 10000 ? `${Math.round(n / 1000)}k` : n >= 1000 ? `${(Math.round(n / 100) / 10)}k` : fmt(n))

// ── Document with flowing layout ─────────────────────────────────────────────
class Doc {
  p = new MrPdf(PW, PH)
  y = TOP
  page = 1
  constructor(public client: string, public month: string) {}
  newPage() {
    this.p.addPage()
    this.page++
    this.runningHeader()
    this.y = TOP
  }
  ensure(h: number) { if (this.y - h < BOTTOM) this.newPage() }
  runningHeader() {
    const p = this.p
    p.rect(M, PH - 44, 4, 14, C.RED)
    p.text(M + 10, PH - 40, clip(this.client, 10, true, 300), 10, true, C.INK)
    p.rtext(PW - M, PH - 40, `Monthly campaign report · ${this.month}`, 8, false, C.MUT)
    p.line(M, PH - 52, PW - M, C.RULE, 0.8)
  }
  footers(footer: string) {
    const n = this.p.pageCount()
    for (let i = 0; i < n; i++) this.p.drawOn(i, () => {
      this.p.line(M, M + 4, PW - M, C.RULE, 0.5)
      this.p.text(M, M - 8, clip(footer, 6.8, false, 380), 6.8, false, C.MUT)
      this.p.rtext(PW - M, M - 8, `Page ${i + 1} of ${n}`, 6.8, true, C.MUT)
    })
  }
}

// ── Building blocks ──────────────────────────────────────────────────────────
function chapter(d: Doc, title: string, sub: string, reserve: number) {
  d.ensure(40 + reserve)
  const p = d.p
  d.y -= 16
  p.rect(M, d.y - 1, 9, 9, C.RED)
  p.text(M + 16, d.y, clip(title, 13, true, CW - 16), 13, true, C.INK)
  if (sub) { d.y -= 13; p.text(M + 16, d.y, clip(sub, 8.2, false, CW - 16), 8.2, false, C.MUT) }
  d.y -= 9
  p.line(M, d.y, PW - M, C.RULE, 0.6)
  d.y -= 10
}
function legend(p: MrPdf, x: number, y: number, items: { name: string; color: RGB; dash?: boolean }[]) {
  let cx = x
  for (const it of items) {
    if (it.dash) p.stroke([[cx, y + 3], [cx + 12, y + 3]], it.color, 1.2, [3, 2])
    else p.rect(cx, y, 8, 7, it.color)
    p.text(cx + (it.dash ? 16 : 12), y, it.name, 7.2, false, C.INK)
    cx += (it.dash ? 16 : 12) + W(it.name, false, 7.2) + 14
  }
}
interface Series { name: string; values: number[]; color: RGB; labels?: boolean }
interface Ref { value: number; label: string; color: RGB }

/** Vertical (grouped) bar chart. Height h includes axis labels. */
function barChart(p: MrPdf, x: number, yTop: number, w: number, h: number, cats: string[], series: Series[], o: { ref?: Ref; fmtV?: (n: number) => string; maxV?: number } = {}) {
  const fv = o.fmtV || short
  const axisW = 30, base = yTop - h + 14, ph = h - 26, pw = w - axisW, x0 = x + axisW
  const raw = Math.max(o.maxV || 0, o.ref ? o.ref.value : 0, ...series.flatMap(s => s.values))
  const ints = series.every(s => s.values.every(v => Number.isInteger(v)))
  const max = ints && raw <= 4 ? 4 : niceMax(raw * 1.08)
  for (let i = 0; i <= 4; i++) {
    const gy = base + (ph * i) / 4
    p.line(x0, gy, x + w, i ? C.GRID : C.GREY, i ? 0.4 : 0.7)
    p.rtext(x0 - 4, gy - 2.5, fv((max * i) / 4), 6.4, false, C.MUT)
  }
  const n = Math.max(1, cats.length), gw = pw / n
  const bw = Math.min(22, (gw * 0.72) / series.length)
  const every = n > 14 ? Math.ceil(n / 12) : 1
  cats.forEach((cat, i) => {
    const gx = x0 + i * gw + (gw - bw * series.length) / 2
    series.forEach((s, j) => {
      const v = s.values[i] || 0, bh = (v / max) * ph
      const bx = gx + j * bw
      if (v > 0) p.rect(bx + 0.6, base, bw - 1.2, Math.max(0.8, bh), s.color)
      if (s.labels && v > 0 && bw >= 7) p.ctext(bx + bw / 2, base + bh + 3, fv(v), bw >= 14 ? 6.6 : 5.8, true, s.color)
    })
    if (i % every === 0) p.ctext(x0 + i * gw + gw / 2, base - 10, clip(cat, 6.4, false, Math.max(gw * every - 2, 18)), 6.4, false, C.MUT)
  })
  if (o.ref && o.ref.value > 0) {
    const ry = base + (o.ref.value / max) * ph
    p.stroke([[x0, ry], [x + w, ry]], o.ref.color, 1, [3, 2])
    const t = o.ref.label
    p.rect(x + w - W(t, true, 6.4) - 6, ry + 2, W(t, true, 6.4) + 6, 9, C.WHITE)
    p.rtext(x + w - 3, ry + 4, t, 6.4, true, o.ref.color)
  }
}

/** Line chart with soft area under the first series and a label on the last point. */
function lineChart(p: MrPdf, x: number, yTop: number, w: number, h: number, cats: string[], series: Series[], o: { fmtV?: (n: number) => string; area?: RGB } = {}) {
  const fv = o.fmtV || short
  const axisW = 30, base = yTop - h + 14, ph = h - 26, x0 = x + axisW + 4, pw = w - axisW - 18
  const max = niceMax(Math.max(...series.flatMap(s => s.values)) * 1.1)
  for (let i = 0; i <= 4; i++) {
    const gy = base + (ph * i) / 4
    p.line(x + axisW, gy, x + w, i ? C.GRID : C.GREY, i ? 0.4 : 0.7)
    p.rtext(x + axisW - 4, gy - 2.5, fv((max * i) / 4), 6.4, false, C.MUT)
  }
  const n = cats.length, step = n > 1 ? pw / (n - 1) : 0
  const X = (i: number) => (n > 1 ? x0 + i * step : x0 + pw / 2)
  const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(pw / 38))))
  cats.forEach((c, i) => { if (i % every === 0 && (i === n - 1 || n - 1 - i >= every / 2 || every === 1) || i === n - 1) p.ctext(X(i), base - 10, c, 6.4, false, C.MUT) })
  series.forEach((s, j) => {
    const pts: [number, number][] = s.values.map((v, i) => [X(i), base + (v / max) * ph])
    if (j === 0 && o.area && pts.length > 1) p.poly([[pts[0][0], base], ...pts, [pts[pts.length - 1][0], base]], o.area)
    p.stroke(pts, s.color, 1.8)
    pts.forEach((q, i) => { if (n <= 18 || i === n - 1) p.circle(q[0], q[1], i === n - 1 ? 2.6 : 1.6, s.color) })
    const last = pts[pts.length - 1]
    if (last) p.text(Math.min(last[0] + 5, x + w - 22), last[1] + 4, fv(s.values[s.values.length - 1]), 7.4, true, s.color)
  })
}

/** Horizontal bars; returns the height used. */
function hbars(p: MrPdf, x: number, yTop: number, w: number, rows: { label: string; value: number; text?: string; color?: RGB }[], color: RGB, labelW = 130): number {
  const max = Math.max(1, ...rows.map(r => r.value)), rh = 17, bw = w - labelW - 46
  rows.forEach((r, i) => {
    const y = yTop - 12 - i * rh
    p.text(x, y, clip(r.label, 8, true, labelW - 8), 8, true, C.INK)
    p.rect(x + labelW, y - 2, bw, 9, C.GRID)
    p.rect(x + labelW, y - 2, Math.max(2, (r.value / max) * bw), 9, r.color || color)
    p.text(x + labelW + bw + 6, y, r.text ?? fmt(r.value), 8, true, r.color || color)
  })
  return rows.length * rh + 6
}

function statTile(p: MrPdf, x: number, y: number, w: number, h: number, value: string, label: string, sub: string, accent: RGB) {
  p.rect(x, y, w, h, C.WHITE)
  p.line(x, y, x + w, C.RULE, 0.6); p.line(x, y + h - 0.6, x + w, C.RULE, 0.6)
  p.rect(x, y, 0.6, h, C.RULE); p.rect(x + w - 0.6, y, 0.6, h, C.RULE)
  p.rect(x, y + h - 3, w, 3, accent)
  p.text(x + 10, y + h - 27, clip(value, 19, true, w - 16), 19, true, accent)
  p.text(x + 10, y + h - 40, clip(label, 7.6, true, w - 16), 7.6, true, C.INK)
  const ls = wrap(sub, 6.6, false, w - 18, 2)
  ls.forEach((t, i) => p.text(x + 10, y + h - 51 - i * 8, t, 6.6, false, C.MUT))
}

function bullets(d: Doc, lines: string[], size = 8.8, maxLines = 3) {
  for (const l of lines) {
    const ls = wrap(l, size, false, CW - 16, maxLines)
    d.ensure(ls.length * (size + 3) + 6)
    d.y -= size + 3
    d.p.rect(M + 2, d.y + 2.4, 3.4, 3.4, C.RED)
    ls.forEach((t, i) => { if (i) d.y -= size + 3; d.p.text(M + 14, d.y, t, size, false, C.INK) })
    d.y -= 4
  }
}

// ── The report ───────────────────────────────────────────────────────────────
export function clientPdfBase64(inp: ClientPdfInput): string {
  const { cm, monthKey, monthLabel } = inp
  const P = cm.promote, N = cm.network, E = cm.engage
  const sv = cm.services || { promote: cm.promoteInPlan !== false, network: true, engage: true }
  const d = new Doc(cm.name, monthLabel)
  const p = d.p

  // History up to the report month
  const S = (inp.history?.series || []).filter(x => x.month <= monthKey && (x.sent || x.accepted || x.opportunities))
  const totSent = S.reduce((a, x) => a + x.sent, 0), totAcc = S.reduce((a, x) => a + x.accepted, 0), totOpp = S.reduce((a, x) => a + x.opportunities, 0)
  const avgAcc = totSent > 0 ? (totAcc / totSent) * 100 : 0
  const start = inp.history?.start || S[0]?.month || null

  // ── Page 1 — cover band ────────────────────────────────────────────────────
  const bandH = 168
  p.rect(0, PH - bandH, PW, bandH, C.RED)
  p.rect(0, PH - bandH, PW, 5, C.RED_D)
  p.text(M, PH - 36, 'GERSHON CONSULTING', 8.5, true, C.WHITE)
  p.rtext(PW - M, PH - 36, 'US MARKET ENTRY', 8.5, true, C.WHITE)
  p.line(M, PH - 44, PW - M, C.RED_T, 0.5)
  p.text(M, PH - 72, 'MONTHLY CAMPAIGN REPORT', 9, true, C.RED_T)
  p.text(M, PH - 102, clip(cm.name, 28, true, CW), 28, true, C.WHITE)
  p.text(M, PH - 124, monthLabel, 15, true, C.WHITE)
  const svcs = (['promote', 'network', 'engage'] as const).filter(k => (sv as any)[k]).map(k => ({ promote: 'Promote (content)', network: 'Network (LinkedIn outreach)', engage: 'Engage (pipeline)' })[k])
  p.text(M, PH - 144, clip(`Client #${cm.no}  ·  ${svcs.join('  ·  ')}${start ? `  ·  Campaign since ${mLong(start)}` : ''}`, 8.2, false, CW), 8.2, false, C.WHITE)

  d.y = PH - bandH - 30
  for (const t of wrap(inp.headline, 16, true, CW, 2)) { p.text(M, d.y, t, 16, true, C.INK); d.y -= 20 }
  for (const t of wrap(inp.subline, 9.4, false, CW, 2)) { p.text(M, d.y, t, 9.4, false, C.MUT); d.y -= 13 }
  d.y -= 4

  // What we did for you — up to 8 tiles, 4 per row
  const acts = actionsOf(cm)
  if (acts.length) {
    chapter(d, 'What we did for you this month', `Actions run on your behalf in ${monthLabel}`, 70)
    const per = 4, gap = 9, tw = (CW - (per - 1) * gap) / per, th = 66
    for (let r = 0; r < Math.ceil(acts.length / per); r++) {
      d.ensure(th + 8)
      d.y -= th
      acts.slice(r * per, r * per + per).forEach((a, i) => statTile(p, M + i * (tw + gap), d.y, tw, th, a.value, a.label, a.detail, C.RED))
      d.y -= 9
    }
  }

  // Campaign since launch — one strip
  if (S.length >= 1 && totSent > 0) {
    chapter(d, 'Your campaign since launch', start ? `Everything built since ${mLong(start)}` : 'Everything built so far', 48)
    const cells: [string, string][] = [
      [fmt(S.length), S.length === 1 ? 'month of outreach' : 'months of outreach'] as [string, string],
      [fmt(totSent), 'decision-makers invited'] as [string, string],
      [fmt(totAcc), 'now in your network'] as [string, string],
      ...(totOpp > 0 ? [[fmt(totOpp), totOpp === 1 ? 'opportunity opened' : 'opportunities opened'] as [string, string]] : []),
      ...(avgAcc >= inp.acceptTarget ? [[pct1(avgAcc), 'average acceptance'] as [string, string]] : []),
    ].slice(0, 5)
    const h = 44, cw = CW / cells.length
    d.y -= h
    p.rect(M, d.y, CW, h, C.BG)
    cells.forEach(([v, l], i) => {
      const cx = M + i * cw
      if (i) p.rect(cx, d.y + 8, 0.6, h - 16, C.RULE)
      p.ctext(cx + cw / 2, d.y + 22, v, 16, true, C.INK)
      p.ctext(cx + cw / 2, d.y + 10, l, 7, false, C.MUT)
    })
    d.y -= 8
  }

  // Key insights
  const ins = insightsOf(cm, inp.history, monthKey)
  if (ins.length) {
    chapter(d, 'Key insights', 'What the numbers say about your campaign', 40)
    for (const i of ins.slice(0, 6)) {
      const ls = wrap(i.text, 8.6, false, CW - 22, 3)
      const h = 16 + ls.length * 11.5 + 6
      d.ensure(h + 4)
      d.y -= h
      p.rect(M, d.y, CW, h, C.RED_TT); p.rect(M, d.y, 3, h, C.RED)
      p.text(M + 12, d.y + h - 13, clip(i.title, 9.4, true, CW - 22), 9.4, true, C.INK)
      ls.forEach((t, k) => p.text(M + 12, d.y + h - 26 - k * 11.5, t, 8.6, false, C.INK))
      d.y -= 5
    }
  }

  // ── Page 2+ — chapters with charts ─────────────────────────────────────────
  if (d.page === 1) d.newPage()
  const last12 = S.slice(-12)

  // 1. Network since launch (cumulative)
  if (S.length >= 2 && totAcc > 0) {
    chapter(d, 'Your US network, growing month after month', `Cumulative since ${mLong(S[0].month)} — every connection stays in your network`, 190)
    let a = 0, o = 0
    const cats = S.map(x => mShort(x.month)), cA = S.map(x => (a += x.accepted)), cO = S.map(x => (o += x.opportunities))
    const half = (CW - 20) / 2
    p.text(M, d.y - 2, 'Decision-makers connected (to date)', 8, true, C.INK)
    p.text(M + half + 20, d.y - 2, 'Opportunities opened (to date)', 8, true, C.INK)
    lineChart(p, M, d.y - 10, half, 170, cats, [{ name: 'Connections', values: cA, color: C.RED }], { area: C.RED_TT })
    if (totOpp > 0) lineChart(p, M + half + 20, d.y - 10, half, 170, cats, [{ name: 'Opportunities', values: cO, color: C.BLUE }], { area: hex('#F0F4FA') })
    else p.text(M + half + 30, d.y - 80, 'Opportunities are being built from these connections.', 8, false, C.MUT)
    d.y -= 190
  }

  // 2. Monthly activity — invitations vs accepted
  if (last12.length >= 2) {
    chapter(d, 'Campaign activity by month', `Invitations sent and accepted — last ${last12.length} months`, 180)
    legend(p, M, d.y - 6, [{ name: 'Invitations sent', color: C.GREY }, { name: 'Accepted', color: C.RED }])
    barChart(p, M, d.y - 16, CW, 170, last12.map(x => mShort(x.month)), [
      { name: 'Invitations', values: last12.map(x => x.sent), color: C.GREY },
      { name: 'Accepted', values: last12.map(x => x.accepted), color: C.RED, labels: true },
    ])
    d.y -= 192
  }

  // 3. Acceptance rate by month — shown when the campaign is at or above target
  const rated = last12.filter(x => x.sent >= 20)
  if (rated.length >= 2 && avgAcc >= inp.acceptTarget) {
    const ref: Ref = avgAcc >= B.acceptanceRate
      ? { value: B.acceptanceRate, label: `Gershon average ${B.acceptanceRate}% (${B.clientsRun} campaigns)`, color: C.GOLD }
      : { value: inp.acceptTarget, label: `Target ${inp.acceptTarget}%`, color: C.GOLD }
    chapter(d, 'Acceptance rate by month', `Share of invited decision-makers who accepted — ${pct1(avgAcc)} on average since launch`, 160)
    barChart(p, M, d.y - 4, CW, 150, rated.map(x => mShort(x.month)), [
      { name: 'Acceptance', values: rated.map(x => Math.min(100, Math.round((x.accepted / x.sent) * 1000) / 10)), color: C.RED, labels: true },
    ], { ref, fmtV: n => `${Math.round(n)}%` })
    d.y -= 162
  }

  // 4. Opportunities by month
  if (last12.some(x => x.opportunities > 0)) {
    chapter(d, 'Opportunities opened by month', 'Prospects who showed interest in a conversation', 150)
    barChart(p, M, d.y - 4, CW, 140, last12.map(x => mShort(x.month)), [
      { name: 'Opportunities', values: last12.map(x => x.opportunities), color: C.BLUE, labels: true },
    ], { fmtV: n => fmt(n) })
    d.y -= 152
  }

  // 5. The month, week by week
  const weeks = (N?.weeks || []).filter(w => w.sent || w.accepted || w.opportunities)
  if (weeks.length >= 1) {
    chapter(d, `${monthLabel}, week by week`, 'Invitations sent, new connections and opportunities each week', 175)
    legend(p, M, d.y - 6, [{ name: 'Invitations', color: C.GREY }, { name: 'Accepted', color: C.RED }, { name: 'Opportunities', color: C.BLUE }])
    barChart(p, M, d.y - 16, CW * 0.62, 150, weeks.map(w => `Wk ${w.weekStart.slice(5).replace('-', '/')}`), [
      { name: 'Invitations', values: weeks.map(w => w.sent), color: C.GREY, labels: true },
      { name: 'Accepted', values: weeks.map(w => w.accepted), color: C.RED, labels: true },
      { name: 'Opportunities', values: weeks.map(w => w.opportunities), color: C.BLUE, labels: true },
    ], { fmtV: n => fmt(n) })
    // side table
    const tx = M + CW * 0.62 + 18, tw = CW - CW * 0.62 - 18
    let ty = d.y - 22
    p.rect(tx, ty - 4, tw, 14, C.BG)
    p.text(tx + 4, ty, 'WEEK', 6.4, true, C.MUT); p.rtext(tx + tw * 0.55, ty, 'SENT', 6.4, true, C.MUT); p.rtext(tx + tw * 0.78, ty, 'ACC.', 6.4, true, C.MUT); p.rtext(tx + tw - 4, ty, 'OPP.', 6.4, true, C.MUT)
    for (const w of weeks.slice(0, 7)) {
      ty -= 15
      p.text(tx + 4, ty, w.weekStart.slice(5).replace('-', '/'), 7.6, true, C.INK)
      p.rtext(tx + tw * 0.55, ty, fmt(w.sent), 7.6, false, C.INK)
      p.rtext(tx + tw * 0.78, ty, fmt(w.accepted), 7.6, true, C.RED)
      p.rtext(tx + tw - 4, ty, fmt(w.opportunities), 7.6, true, C.BLUE)
      p.line(tx, ty - 4, tx + tw, C.RULE, 0.4)
    }
    if (N && N.sent > 0) {
      ty -= 15
      p.text(tx + 4, ty, 'Month', 7.6, true, C.INK)
      p.rtext(tx + tw * 0.55, ty, fmt(N.sent), 7.6, true, C.INK)
      p.rtext(tx + tw * 0.78, ty, fmt(N.accepted), 7.6, true, C.RED)
      p.rtext(tx + tw - 4, ty, fmt(N.opportunities), 7.6, true, C.BLUE)
    }
    d.y -= 178
  }

  // 6. By LinkedIn account
  const accts = (cm.accounts || []).filter(a => a.network && a.network.sent > 0)
  if (accts.length > 1) {
    chapter(d, 'By LinkedIn account', 'Each account runs its own campaign', 150)
    legend(p, M, d.y - 6, [{ name: 'Invitations', color: C.GREY }, { name: 'Accepted', color: C.RED }, { name: 'Opportunities', color: C.BLUE }])
    barChart(p, M, d.y - 16, CW * 0.55, 130, accts.map(a => a.name), [
      { name: 'Invitations', values: accts.map(a => a.network!.sent), color: C.GREY, labels: true },
      { name: 'Accepted', values: accts.map(a => a.network!.accepted), color: C.RED, labels: true },
      { name: 'Opportunities', values: accts.map(a => a.network!.opportunities), color: C.BLUE, labels: true },
    ], { fmtV: n => fmt(n) })
    const tx = M + CW * 0.55 + 18, tw = CW - CW * 0.55 - 18
    let ty = d.y - 24
    for (const a of accts) {
      const bits = [`${fmt(a.network!.accepted)} new connections from ${fmt(a.network!.sent)} invitations`]
      if (a.network!.opportunities > 0) bits.push(plural(a.network!.opportunities, 'opportunity', 'opportunities'))
      if (a.engage && a.engage.newLeads > 0) bits.push(plural(a.engage.newLeads, 'new lead'))
      p.text(tx, ty, clip(a.name, 9, true, tw), 9, true, C.INK)
      wrap(bits.join(' · '), 7.8, false, tw, 3).forEach((t, k) => p.text(tx, ty - 11 - k * 10, t, 7.8, false, C.MUT))
      ty -= 48
    }
    d.y -= 152
  }

  // 7. Who you are talking to
  const opps = N?.namedOpps || []
  if (opps.length) {
    const senMap: Record<string, number> = {}
    for (const o of opps) { const k = seniorityOf(o.title); senMap[k] = (senMap[k] || 0) + 1 }
    const order = ['C-level & founders', 'VP & Head of', 'Directors', 'Managers & leads', 'Other roles']
    const rows = order.filter(k => senMap[k]).map(k => ({ label: k, value: senMap[k] }))
    chapter(d, 'Who you are talking to', `${plural(opps.length, 'named opportunity', 'named opportunities')} in ${monthLabel}, by seniority`, rows.length * 17 + 30)
    d.y -= hbars(p, M, d.y, CW, rows, C.BLUE, 150)
    // table of named opportunities
    const list = opps.slice(0, 14)
    const cols = [{ t: 'ROLE', w: CW * 0.42 }, { t: 'COMPANY', w: CW * 0.3 }, { t: 'STAGE', w: CW * 0.16 }, { t: 'DATE', w: CW * 0.12 }]
    const head = () => {
      d.y -= 14; p.rect(M, d.y - 4, CW, 14, C.BG)
      let cx = M; for (const c of cols) { p.text(cx + 4, d.y, c.t, 6.6, true, C.MUT); cx += c.w }
    }
    d.ensure(40); d.y -= 6; head()
    for (const o of list) {
      if (d.y - 15 < BOTTOM) { d.newPage(); head() }
      d.y -= 15
      const vals = [o.title || 'Decision-maker', o.company || '', o.type || '', (o.date || '').slice(5).replace('-', '/')]
      let cx = M
      vals.forEach((v, i) => { p.text(cx + 4, d.y, clip(v, 7.8, i === 0, cols[i].w - 8), 7.8, i === 0, i === 2 ? C.BLUE : C.INK); cx += cols[i].w })
      p.line(M, d.y - 4.5, PW - M, C.RULE, 0.4)
    }
    if (opps.length > list.length) { d.y -= 13; p.text(M + 4, d.y, `+ ${plural(opps.length - list.length, 'more opportunity', 'more opportunities')}`, 7.6, false, C.MUT) }
    d.y -= 8
  }

  // 8. Pipeline
  if (E && sv.engage) {
    const f = E.funnel || {}
    const order: [string, string][] = [['contacted', 'In your pipeline'], ['connected', 'In conversation'], ['meeting', 'Meeting'], ['proposal', 'Proposal'], ['won', 'Won']]
    const funnel = order.map(([k, label], i) => ({ label, n: order.slice(i).reduce((x, [kk]) => x + (f[kk] || 0), 0) })).filter((x, i) => i === 0 || x.n > 0)
    if (funnel[0] && funnel[0].n > 0) {
      const tilesH = 50
      chapter(d, 'Your US pipeline', 'Prospects by how far they have progressed (each stage includes those beyond it)', funnel.length * 24 + tilesH + 20)
      const max = funnel[0].n
      funnel.forEach((s, i) => {
        d.y -= 24
        const bw = Math.max(40, (s.n / max) * (CW - 160)), bx = M + 110 + (CW - 160 - bw) / 2
        p.text(M, d.y + 6, s.label, 8.6, true, C.INK)
        p.rect(bx, d.y, bw, 18, i === 0 ? C.RED : i === funnel.length - 1 ? C.RED_D : hex(['#CC3333', '#D45A5A', '#DC7D7D', '#B83030', '#A8281F'][i] || '#CC3333'))
        p.ctext(bx + bw / 2, d.y + 6, fmt(s.n), 9, true, C.WHITE)
      })
      d.y -= 12
      const cells = ([
        E.newLeads > 0 ? [fmt(E.newLeads), `new prospects in ${monthLabel}`] : null,
        E.activeLeads > 0 ? [fmt(E.activeLeads), 'active prospects'] : null,
        E.meetingsTotal > 0 ? [fmt(E.meetingsTotal), 'at meeting stage or beyond'] : null,
        E.won > 0 ? [fmt(E.won), 'won'] : null,
      ] as ([string, string] | null)[]).filter((x): x is [string, string] => !!x)
      if (cells.length) {
        d.ensure(tilesH)
        d.y -= 40
        const cw = CW / cells.length
        p.rect(M, d.y, CW, 40, C.BG)
        cells.forEach(([v, l], i) => { p.ctext(M + i * cw + cw / 2, d.y + 20, v, 14, true, C.INK); p.ctext(M + i * cw + cw / 2, d.y + 8, l, 7, false, C.MUT) })
        d.y -= 10
      }
    }
  }

  // 9. Brand visibility (Promote)
  if (P && P.posts > 0 && sv.promote) {
    chapter(d, 'Brand visibility', `${plural(P.posts, 'post')} published in ${monthLabel}${P.platforms.length ? ` on ${P.platforms.join(' and ')}` : ''}`, 150)
    const days = P.daily || []
    barChart(p, M, d.y - 4, CW * 0.6, 130, days.map(x => String(Number(x.date.slice(8, 10)))), [{ name: 'Posts', values: days.map(x => x.posts), color: C.RED }], { fmtV: n => fmt(n) })
    p.ctext(M + 30 + (CW * 0.6 - 30) / 2, d.y - 140, 'Posts published per day', 6.6, false, C.MUT)
    const ex = M + CW * 0.6 + 20, ew = CW - CW * 0.6 - 20
    const eng = [{ label: 'Likes', value: P.likes }, { label: 'Comments', value: P.comments }, { label: 'Shares', value: P.shares }].filter(x => x.value > 0)
    if (eng.length) {
      p.text(ex, d.y - 8, `${fmt(P.engagement)} engagements`, 10, true, C.INK)
      hbars(p, ex, d.y - 14, ew, eng, C.RED, 56)
    }
    if (P.followersGrowth > 0) {
      p.text(ex, d.y - 92, `+${fmt(P.followersGrowth)}`, 16, true, C.GREEN)
      p.text(ex, d.y - 104, `new followers · ${fmt(P.followers)} in total`, 7.4, false, C.MUT)
    }
    d.y -= 152
    if (P.topPost && P.topPost.engagement > 0) {
      const ls = wrap(`"${P.topPost.snippet}"`, 8.8, false, CW - 30, 4)
      const h = 26 + ls.length * 12
      d.ensure(h + 6)
      d.y -= h
      p.rect(M, d.y, CW, h, C.BG); p.rect(M, d.y, 3, h, C.RED)
      p.text(M + 14, d.y + h - 14, `Your best-performing post · ${plural(P.topPost.engagement, 'engagement')}${P.topPost.date ? ` · ${P.topPost.date.slice(0, 10)}` : ''}`, 8, true, C.RED)
      ls.forEach((t, k) => p.text(M + 14, d.y + h - 28 - k * 12, t, 8.8, false, C.INK))
      d.y -= 8
    }
  }

  // 10. LinkedIn presence (Linalysis)
  const L = cm.profile
  if (L) {
    const num = (v: any) => (typeof v === 'number' ? v : null)
    const items: { v: string; k: string; dlt: string }[] = []
    const add = (k: string, key: string) => {
      const to = num(L.to[key]); if (to == null) return
      const fr = L.from ? num(L.from[key]) : null
      items.push({ v: fmt(to), k, dlt: fr != null && to > fr ? `+${fmt(to - fr)}${fr ? ` (+${Math.round(((to - fr) / fr) * 100)}%)` : ''} this month` : '' })
    }
    add('LinkedIn connections', 'connections'); add('Profile views (90 days)', 'profile_views'); add('Company page followers', 'company_followers')
    add('Post impressions (30 days)', 'company_post_impressions'); add('Search appearances (30 days)', 'company_search_appearances')
    const rel = num(L.to.ssi_relationships)
    if (rel != null && rel >= 15) items.push({ v: `${rel} / 25`, k: 'Social Selling Index — relationships', dlt: '' })
    if (items.length) {
      const per = 3, gap = 9, tw = (CW - (per - 1) * gap) / per, th = 52
      const rowsN = Math.ceil(items.length / per)
      chapter(d, 'Your LinkedIn presence', 'Captured at the end of the month', rowsN * (th + 8))
      for (let r = 0; r < rowsN; r++) {
        d.y -= th
        items.slice(r * per, r * per + per).forEach((it, i) => {
          const x = M + i * (tw + gap)
          p.rect(x, d.y, tw, th, C.BG)
          p.text(x + 10, d.y + th - 22, it.v, 16, true, C.INK)
          p.text(x + 10, d.y + th - 34, clip(it.k, 7.4, true, tw - 16), 7.4, true, C.MUT)
          if (it.dlt) p.text(x + 10, d.y + 8, clip(it.dlt, 7.2, true, tw - 16), 7.2, true, C.GREEN)
        })
        d.y -= 8
      }
    }
  }

  // 11. Next month + contact
  if (inp.next.length) {
    chapter(d, 'Next month', 'What we will focus on for you', 20 + inp.next.length * 16)
    bullets(d, inp.next)
  }
  d.ensure(64)
  d.y -= 52
  p.rect(M, d.y, CW, 46, C.RED_TT); p.rect(M, d.y, 3, 46, C.RED)
  p.text(M + 14, d.y + 28, 'Questions about this report?', 10, true, C.INK)
  p.text(M + 14, d.y + 14, 'Reply to this email or book a call with your Gershon team: gershonconsulting.com/calendar', 8.4, false, C.INK)

  d.footers(inp.footer)
  return p.base64()
}
