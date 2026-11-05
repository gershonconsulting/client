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
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'
import { registryByNo, readSettings, getClientMonth, monthWin, todayNY, servicesFor, type Deps, type RegistryEntry, type V3Settings } from './v3-data'
import { CLIENT_HISTORY, LIVE_FROM, HISTORY_BENCHMARKS } from './v3-history-data'

const addMonth = (k: string, n: number) => { const [y, m] = k.split('-').map(Number); return new Date(Date.UTC(y, m - 1 + n, 15)).toISOString().slice(0, 7) }

export interface CampaignMonth {
  month: string; sent: number; accepted: number; opportunities: number
  live: boolean; partial: boolean
  streakNew: number | null      // new accounts in Streak that month (live months, Engage clients)
}
export interface CampaignAccountMonth { month: string; account: string; sent: number; accepted: number; opportunities: number; streakNew: number | null }
export interface CampaignWeek { weekStart: string; sent: number; accepted: number; opportunities: number; messages: number }

export async function campaignOf(env: any, deps: Deps, r: RegistryEntry, s: V3Settings) {
  const h = CLIENT_HISTORY[r.no]
  const months: CampaignMonth[] = (h?.months || []).map(([month, sent, accepted, opportunities]) => ({ month, sent, accepted, opportunities, live: false, partial: false, streakNew: null }))
  const accounts: CampaignAccountMonth[] = []
  const weeks = new Map<string, CampaignWeek>()
  const cur = todayNY().slice(0, 7)
  let pipeline: any = null
  let lastReport = ''
  for (let k = LIVE_FROM; k <= cur; k = addMonth(k, 1)) {
    let cm: any
    try { cm = await getClientMonth(env, deps, r, k, { settings: s }) } catch { continue }
    const n = cm.network, e = cm.engage
    const has = n && !n.pending && (n.sent || n.accepted || n.opportunities)
    if (has || (e && e.newLeads)) {
      months.push({ month: k, sent: has ? n.sent : 0, accepted: has ? n.accepted : 0, opportunities: has ? n.opportunities : 0, live: true, partial: monthWin(k).isCurrent, streakNew: e ? e.newLeads : null })
    }
    for (const w of (n?.weeks || [])) if (w.sent || w.accepted || w.opportunities) weeks.set(w.weekStart, { weekStart: w.weekStart, sent: w.sent, accepted: w.accepted, opportunities: w.opportunities, messages: w.messages || 0 })
    for (const a of (cm.accounts || [])) if (a.network || a.engage) accounts.push({ month: k, account: a.name, sent: a.network?.sent || 0, accepted: a.network?.accepted || 0, opportunities: a.network?.opportunities || 0, streakNew: a.engage ? a.engage.newLeads : null })
    if (e) pipeline = { month: k, activeLeads: e.activeLeads, totalLeads: e.totalLeads, meetingsTotal: e.meetingsTotal, won: e.won, funnel: e.funnel }
    if (n?.lastReport) lastReport = n.lastReport
  }
  months.sort((a, b) => a.month.localeCompare(b.month))
  const users = Math.max(1, (r.campaigns || []).length || 1)
  return {
    no: r.no, name: r.name,
    start: h?.campaignStart || h?.start || months.find(m => m.sent || m.accepted || m.opportunities)?.month || null,
    users, campaigns: r.campaigns || [],
    services: servicesFor(r, s),
    targets: { acceptRate: s.acceptTarget, leadsPerMonth: s.leadsPerMonth * users, leadsPerUser: s.leadsPerMonth },
    benchmarks: { acceptanceRate: HISTORY_BENCHMARKS.acceptanceRate, oppsPerClientMonth: HISTORY_BENCHMARKS.oppsPerClientMonthMean, invitesPerClientMonth: HISTORY_BENCHMARKS.invitesPerClientMonth, clientsRun: HISTORY_BENCHMARKS.clientsRun },
    months, accounts,
    weeks: [...weeks.values()].sort((a, b) => a.weekStart.localeCompare(b.weekStart)).slice(-16),
    pipeline, lastReport, liveFrom: LIVE_FROM, today: todayNY(),
    generatedAt: new Date().toISOString(),
  }
}

export function registerCampaign(app: Hono<any>, deps: Deps) {
  app.get('/api/v3/campaign/:no', async (c) => {
    const r = registryByNo(c.req.param('no'))
    if (!r) return c.json({ error: 'Unknown client number' }, 404)
    const ck = `v3:camp1:${todayNY()}:${r.no}`
    if (c.req.query('fresh') !== '1') {
      try { const raw = await c.env.COMPANIES_KV.get(ck); if (raw) return c.json(JSON.parse(raw)) } catch { /* miss */ }
    }
    const s = await readSettings(c.env.COMPANIES_KV)
    const out = await campaignOf(c.env, deps, r, s)
    try { await c.env.COMPANIES_KV.put(ck, JSON.stringify(out), { expirationTtl: 1800 }) } catch { /* ignore */ }
    return c.json(out)
  })
}
