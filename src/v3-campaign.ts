// ─────────────────────────────────────────────────────────────────────────────
// Campaign at a glance — the whole campaign of one client, since launch.
// Feeds the "Where we stand" section of /client/:no (public/static/campaign.js).
//
//   GET /api/v3/campaign/:no[?fresh=1]
//
// Monthly series = Straight-in history (CLIENT_HISTORY, before LIVE_FROM) +
// the live monthly Straight-in reports collected by this app (same source as
// the track record). Live months also carry Streak new leads, the per-account
// split and the weekly numbers. Nothing is estimated: a month with no report is
// simply absent; the current month is flagged partial.
// A client that does not buy Network today (e.g. #212 Wallix = Promote only) gets no
// outreach history: an ended LinkedIn campaign is not shown (Olivier, 2026-11-06).
//
// registerCampaign also registers, before the scheduled send routes in v3.ts:
//   v3-hold.ts          automatic-sending blocks (the gate runs first)
//   v3-crm-quality.ts   /crm-quality — Fit / Interest across all clients
//   v3-settings-ui.ts   several report recipients per client on /settings
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'
import { registryByNo, readSettings, getClientMonth, monthWin, todayNY, servicesFor, type Deps, type RegistryEntry, type V3Settings } from './v3-data'
import { CLIENT_HISTORY, LIVE_FROM, HISTORY_BENCHMARKS } from './v3-history-data'
import { registerHold } from './v3-hold'
import { registerCrmQuality } from './v3-crm-quality'
import { registerSettingsUi } from './v3-settings-ui'
// #24 sent-log + #07 GC Pipeline Next Due Dates (2026-11-07, replaces PR #5) — see src/next-due.ts
import { registerNextDue } from './next-due'

const addMonth = (k: string, n: number) => { const [y, m] = k.split('-').map(Number); return new Date(Date.UTC(y, m - 1 + n, 15)).toISOString().slice(0, 7) }

export interface CampaignMonth {
  month: string; sent: number; accepted: number; opportunities: number
  live: boolean; partial: boolean
  streakNew: number | null      // new accounts in Streak that month (live months, Engage clients)
}
export interface CampaignAccountMonth { month: string; account: string; sent: number; accepted: number; opportunities: number; streakNew: number | null }
export interface CampaignWeek { weekStart: string; sent: number; accepted: number; opportunities: number; messages: number }

export async function campaignOf(env: any, deps: Deps, r: RegistryEntry, s: V3Settings) {
  const sv = servicesFor(r, s)
  const h = sv.network ? CLIENT_HISTORY[r.no] : undefined
  const months: CampaignMonth[] = (h?.months || []).map(([month, sent, accepted, opportunities]) => ({ month, sent, accepted, opportunities, live: false, partial: false, streakNew: null }))
  const accounts: CampaignAccountMonth[] = []
  const weeks = new Map<string, CampaignWeek>()
  const cur = todayNY().slice(0, 7)
  let pipeline: any = null
  let lastReport = ''
  for (let k = LIVE_FROM; k <= cur; k = addMonth(k, 1)) {
    let cm: any
    try { cm = await getClientMonth(env, deps, r, k, { settings: s }) } catch { continue }
    const n = sv.network ? cm.network : null, e = sv.engage ? cm.engage : null
    const has = n && !n.pending && (n.sent || n.accepted || n.opportunities)
    if (has || (e && e.newLeads)) {
      months.push({ month: k, sent: has ? n.sent : 0, accepted: has ? n.accepted : 0, opportunities: has ? n.opportunities : 0, live: true, partial: monthWin(k).isCurrent, streakNew: e ? e.newLeads : null })
    }
    for (const w of (n?.weeks || [])) if (w.sent || w.accepted || w.opportunities) weeks.set(w.weekStart, { weekStart: w.weekStart, sent: w.sent, accepted: w.accepted, opportunities: w.opportunities, messages: w.messages || 0 })
    for (const a of (cm.accounts || [])) if ((sv.network && a.network) || (sv.engage && a.engage)) accounts.push({ month: k, account: a.name, sent: sv.network ? a.network?.sent || 0 : 0, accepted: sv.network ? a.network?.accepted || 0 : 0, opportunities: sv.network ? a.network?.opportunities || 0 : 0, streakNew: sv.engage && a.engage ? a.engage.newLeads : null })
    if (e) pipeline = { month: k, activeLeads: e.activeLeads, totalLeads: e.totalLeads, meetingsTotal: e.meetingsTotal, won: e.won, funnel: e.funnel }
    if (n?.lastReport) lastReport = n.lastReport
  }
  months.sort((a, b) => a.month.localeCompare(b.month))
  const users = Math.max(1, (r.campaigns || []).length || 1)
  return {
    no: r.no, name: r.name,
    start: h?.campaignStart || h?.start || months.find(m => m.sent || m.accepted || m.opportunities)?.month || null,
    users, campaigns: r.campaigns || [],
    services: sv,
    targets: { acceptRate: s.acceptTarget, leadsPerMonth: s.leadsPerMonth * users, leadsPerUser: s.leadsPerMonth },
    benchmarks: { acceptanceRate: HISTORY_BENCHMARKS.acceptanceRate, oppsPerClientMonth: HISTORY_BENCHMARKS.oppsPerClientMonthMean, invitesPerClientMonth: HISTORY_BENCHMARKS.invitesPerClientMonth, clientsRun: HISTORY_BENCHMARKS.clientsRun },
    months, accounts,
    weeks: [...weeks.values()].sort((a, b) => a.weekStart.localeCompare(b.weekStart)).slice(-16),
    pipeline, lastReport, liveFrom: LIVE_FROM, today: todayNY(),
    generatedAt: new Date().toISOString(),
  }
}

export function registerCampaign(app: Hono<any>, deps: Deps) {
  registerHold(app)
  registerCrmQuality(app, deps)
  registerSettingsUi(app)
  registerNextDue(app)
  app.get('/api/v3/campaign/:no', async (c) => {
    const r = registryByNo(c.req.param('no'))
    if (!r) return c.json({ error: 'Unknown client number' }, 404)
    const ck = `v3:camp2:${todayNY()}:${r.no}`
    if (c.req.query('fresh') !== '1') {
      try { const raw = await c.env.COMPANIES_KV.get(ck); if (raw) return c.json(JSON.parse(raw)) } catch { /* miss */ }
    }
    const s = await readSettings(c.env.COMPANIES_KV)
    const out = await campaignOf(c.env, deps, r, s)
    try { await c.env.COMPANIES_KV.put(ck, JSON.stringify(out), { expirationTtl: 1800 }) } catch { /* ignore */ }
    return c.json(out)
  })
}
