// ─────────────────────────────────────────────────────────────────────────────
// Track record & projections — history (Straight-in sheet, finance roster)
// joined with the live monthly Straight-in reports collected by this app.
//   GET /api/v3/history          → benchmarks + every registry client
//   GET /api/v3/history/:no      → one client
// A client that does not buy Network today (e.g. #212 Wallix = Promote only) gets
// no outreach history: an old, ended LinkedIn campaign must never reappear in its
// reports (Olivier, 2026-11-06).
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'
import { CLIENT_REGISTRY, registryByNo, readSettings, getClientMonth, monthWin, todayNY, servicesFor, type Deps, type RegistryEntry, type V3Settings } from './v3-data'
import { CLIENT_HISTORY, LIVE_FROM, HISTORY_BENCHMARKS } from './v3-history-data'
import { projectClient, newClientOutlook, type MonthPoint, type ClientProjection } from './history-model'
import { registerPageTitle } from './page-title'

const addMonth = (k: string, n: number) => { const [y, m] = k.split('-').map(Number); const d = new Date(Date.UTC(y, m - 1 + n, 15)); return d.toISOString().slice(0, 7) }

export async function clientProjection(env: any, deps: Deps, r: RegistryEntry, s: V3Settings): Promise<{ no: number; name: string; start: string | null } & ClientProjection> {
  const h = CLIENT_HISTORY[r.no]
  const network = servicesFor(r, s).network
  const series: MonthPoint[] = network ? (h?.months || []).map(([month, sent, accepted, opportunities]) => ({ month, sent, accepted, opportunities, live: false })) : []
  const cur = todayNY().slice(0, 7)
  if (network) for (let k = LIVE_FROM; k <= cur; k = addMonth(k, 1)) {
    try {
      const cm = await getClientMonth(env, deps, r, k, { settings: s })
      const n = cm.network
      if (n && !n.pending && (n.sent || n.accepted || n.opportunities)) series.push({ month: k, sent: n.sent, accepted: n.accepted, opportunities: n.opportunities, live: true, partial: k === cur || monthWin(k).isCurrent })
    } catch { /* month unavailable */ }
  }
  // A month whose weekly reports are not all in yet reads low: treat the latest live month as partial when it is the current one.
  const firstData = series.find(p => p.sent || p.accepted || p.opportunities)?.month || null
  const start = h?.start || firstData
  return { no: r.no, name: r.name, start, ...projectClient(start, series, todayNY()) }
}

export function registerHistory(app: Hono<any>, deps: Deps) {
  // Not history-related: the landing-page <title> rewrite lives here because this is
  // the smallest file on the page-route path (see src/page-title.ts).
  registerPageTitle(app)

  app.get('/api/v3/history', async (c) => {
    const s = await readSettings(c.env.COMPANIES_KV)
    const ck = `v3:hist2:${todayNY()}`
    if (c.req.query('fresh') !== '1') {
      try { const raw = await c.env.COMPANIES_KV.get(ck); if (raw) return c.json(JSON.parse(raw)) } catch { /* miss */ }
    }
    const clients = []
    for (const r of CLIENT_REGISTRY) clients.push(await clientProjection(c.env, deps, r, s))
    const live = clients.filter(x => x.monthsWithData > 0 && x.basis !== 'inactive' && x.basis !== 'none')
    const portfolio = {
      clients: live.length,
      next3Expected: live.reduce((a, x) => a + x.next3Expected, 0),
      next3RunRate: live.reduce((a, x) => a + x.next3RunRate, 0),
      next12Expected: live.reduce((a, x) => a + x.next12Expected, 0),
      expectedClientsIn6: Math.round(live.reduce((a, x) => a + (x.stay6 ?? 0), 0) / 100 * 10) / 10,
      expectedClientsIn12: Math.round(live.reduce((a, x) => a + (x.stay12 ?? 0), 0) / 100 * 10) / 10,
      paceVsHistoryPct: (() => { const l = live.filter(x => x.last3Avg != null); return l.length ? Math.round(l.reduce((a, x) => a + (x.last3Avg as number), 0) / l.length / HISTORY_BENCHMARKS.oppsPerClientMonthMean * 100) : null })(),
    }
    const out = { benchmarks: HISTORY_BENCHMARKS, newClient: newClientOutlook(), portfolio, clients: clients.map(x => ({ ...x, series: x.series.slice(-24) })), generatedAt: new Date().toISOString() }
    try { await c.env.COMPANIES_KV.put(ck, JSON.stringify(out), { expirationTtl: 1800 }) } catch { /* ignore */ }
    return c.json(out)
  })

  app.get('/api/v3/history/:no', async (c) => {
    const r = registryByNo(c.req.param('no'))
    if (!r) return c.json({ error: 'Unknown client number' }, 404)
    const s = await readSettings(c.env.COMPANIES_KV)
    const p = await clientProjection(c.env, deps, r, s)
    return c.json({ benchmarks: HISTORY_BENCHMARKS, newClient: newClientOutlook(), client: p })
  })
}
