// ─────────────────────────────────────────────────────────────────────────────
// v3 data layer — one record per Gershon client NUMBER, per calendar month.
//
// Every platform (Streak, social.gershon.ai, Straight-in, this app) refers to a
// client by the same Gershon number (175 Finance Montreal, 200 MAbSilico …).
// CLIENT_REGISTRY is the single place that ties a number to:
//   • the company key(s) in this app  → Streak pipeline + Straight-in report id
//   • the social.gershon.ai client id → Promote (posts, engagement, followers)
// No more fuzzy name matching between platforms.
// ─────────────────────────────────────────────────────────────────────────────

export interface RegistryEntry {
  no: number
  name: string
  keys: string[]          // company keys in this app (COMPANIES / KV company:<key>)
  socialId: string | null // social.gershon.ai Client.id
  promote?: boolean       // false = social content creation is not part of the project
  campaigns?: string[]    // LinkedIn campaigns (Straight-in) run under this one client number
}

export const CLIENT_REGISTRY: RegistryEntry[] = [
  // 175 and 229: one client number, two LinkedIn campaigns each, no Promote (Olivier, 2026-10-13)
  { no: 175, name: 'Finance Montreal',       keys: ['finance-montreal', 'finance-montreal-noza'], socialId: 'cmp0eqm9o000rbqj3ayeto7zp', promote: false, campaigns: ['Steve', 'Noza'] },
  { no: 200, name: 'MAbSilico',              keys: ['mabsilico'],              socialId: 'cmnzg13dn0000j4oeke3nh3ko' },
  { no: 212, name: 'Wallix',                 keys: ['wallix'],                 socialId: 'cmp0eqlsx000dbqj3hmvwldbe' },
  { no: 229, name: 'Altavia',                keys: ['altavia'],                socialId: 'cmp0eqm3y000mbqj321j14ksw', promote: false, campaigns: ['Anne', 'Alexandre'] },
  { no: 233, name: 'Valos',                  keys: ['valos'],                  socialId: 'cmp0eqlp4000abqj325ow1eyf' },
  { no: 245, name: 'PhiTech Bioinformatics', keys: ['phitech-bioinformatics'], socialId: 'cmoda8pxb000pmayx7fbslr0j' },
  { no: 246, name: 'Enzymicals AG',          keys: ['enzymicals-ag'],          socialId: 'cmrumcbd6000011b111l8s53r' },
  { no: 247, name: 'Flying Secoya',          keys: ['flying-secoya'],          socialId: 'cmrnknd4e0000q7qo69o3193g' },
  { no: 248, name: 'Meteor Biotech',         keys: ['meteor-biotech'],         socialId: 'cmrumd4gb000c11b193zq0t2h' },
  { no: 250, name: 'Amphasys',               keys: [],                         socialId: 'cmv6rya4i0001nh4l1a92cf48' },
]

// Lost clients (Oct 2026): data kept, never shown — Manoeuvre Group, Urban Factory, APM Music.
export const RECYCLED_KEYS = ['manoeuvre-group', 'urban-factory', 'apm-music']

export function registryByNo(no: number | string): RegistryEntry | null {
  return CLIENT_REGISTRY.find(r => String(r.no) === String(no)) || null
}
export function registryByKey(key: string): RegistryEntry | null {
  return CLIENT_REGISTRY.find(r => r.keys.includes(key)) || null
}
export const clientLabel = (r: { no: number; name: string }) => `#${r.no} ${r.name}`

// ── Settings (KV v3:settings) ────────────────────────────────────────────────
export interface V3Settings {
  promoteTarget: number            // posts …
  promoteUnit: 'day' | 'week'      // … per working day, or per week
  promoteTargets: Record<string, number> // per client number override (same unit)
  acceptTarget: number             // Network acceptance-rate target (%)
  leadsPerMonth: number            // Engage: new qualified leads per month per client
  internalEmail: string            // our own monthly report
  straightinEmail: string          // provider report (Straight-in)
  clientEmails: Record<string, string> // client number → comma-separated recipients
  autoSendClients: boolean         // monthly cron mails clients directly (else to internalEmail for review)
}
export const DEFAULT_SETTINGS: V3Settings = {
  promoteTarget: 5,
  promoteUnit: 'day',
  promoteTargets: {},
  acceptTarget: 20,
  leadsPerMonth: 10,
  internalEmail: 'report@gershonconsulting.com',
  straightinEmail: '',
  clientEmails: {},
  autoSendClients: false,
}
export async function readSettings(kv: KVNamespace): Promise<V3Settings> {
  try {
    const raw = await kv.get('v3:settings')
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch { /* defaults */ }
  return { ...DEFAULT_SETTINGS }
}
export async function saveSettings(kv: KVNamespace, s: Partial<V3Settings>): Promise<V3Settings> {
  const cur = await readSettings(kv)
  const next: V3Settings = { ...cur, ...s }
  next.promoteTarget = Math.max(0.1, Math.min(50, Number(next.promoteTarget) || 5))
  next.promoteUnit = next.promoteUnit === 'week' ? 'week' : 'day'
  next.acceptTarget = Math.max(1, Math.min(100, Number(next.acceptTarget) || 20))
  next.leadsPerMonth = Math.max(1, Math.min(500, Number(next.leadsPerMonth) || 10))
  await kv.put('v3:settings', JSON.stringify(next))
  return next
}

// ── Month helpers (dates as YYYY-MM-DD strings, calendar in New York) ────────
export interface MonthWin {
  key: string          // 2026-09
  label: string        // September 2026
  short: string        // Sep 2026
  start: string        // 2026-09-01
  end: string          // 2026-09-30 (or today when current month)
  monthEnd: string     // 2026-09-30
  isCurrent: boolean
  days: number         // calendar days covered (start..end)
  workingDays: number  // Mon–Fri covered
  prevKey: string
}
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
export function todayNY(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
}
const dPlus = (d: string, n: number) => { const t = new Date(d + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10) }
const dDiff = (a: string, b: string) => Math.round((new Date(b + 'T12:00:00Z').getTime() - new Date(a + 'T12:00:00Z').getTime()) / 864e5)
export function workingDaysBetween(a: string, b: string): number {
  let n = 0
  for (let d = a; d <= b; d = dPlus(d, 1)) { const w = new Date(d + 'T12:00:00Z').getUTCDay(); if (w !== 0 && w !== 6) n++ }
  return n
}
export function lastFullMonthKey(): string {
  const t = todayNY(); const y = +t.slice(0, 4), m = +t.slice(5, 7)
  return m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, '0')}`
}
export function monthWin(key?: string | null): MonthWin {
  const today = todayNY()
  const k = key && /^\d{4}-\d{2}$/.test(key) ? key : today.slice(0, 7)
  const y = +k.slice(0, 4), m = +k.slice(5, 7)
  const start = `${k}-01`
  const monthEnd = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10)
  const isCurrent = today.slice(0, 7) === k
  const end = isCurrent ? today : monthEnd
  const prevKey = m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, '0')}`
  return {
    key: k, label: `${MONTHS[m - 1]} ${y}`, short: `${MONTHS[m - 1].slice(0, 3)} ${y}`,
    start, end, monthEnd, isCurrent, days: dDiff(start, end) + 1,
    workingDays: workingDaysBetween(start, end), prevKey,
  }
}

// ── Per-client month record ──────────────────────────────────────────────────
export interface ClientMonth {
  no: number
  name: string
  keys: string[]
  promoteInPlan: boolean
  campaigns: string[]
  month: string
  generatedAt: string
  promote: null | {
    posts: number; prevPosts: number; target: number; pct: number; perDay: number
    targetLabel: string; likes: number; comments: number; shares: number; engagement: number
    followers: number; followersGrowth: number; platforms: string[]
    daily: { date: string; posts: number }[]
    topPost: null | { snippet: string; url: string; engagement: number; date: string; platform: string }
  }
  network: null | {
    pending?: boolean
    missingCampaigns?: string[]
    staleCampaigns?: string[]
    sent: number; accepted: number; rate: number; messages: number; opportunities: number
    prevSent: number; prevAccepted: number; prevRate: number; pct: number
    weeks: { weekStart: string; sent: number; accepted: number; messages: number; opportunities: number }[]
    campaigns: { label: string; sent: number; accepted: number; rate: number; opportunities: number }[]
    namedOpps: { name: string; company: string; title: string; type: string; date: string }[]
    lastReport: string
  }
  engage: null | {
    newLeads: number; prevNewLeads: number; target: number; pct: number
    meetings: number; meetingsTotal: number; activeLeads: number; totalLeads: number
    funnel: Record<string, number>; won: number
  }
  errors: string[]
}

export interface Deps {
  callStreakAPI: (endpoint: string) => Promise<any>
  socialFetch: (path: string) => Promise<Response>
  getCompany: (kv: KVNamespace, key: string) => Promise<any | null>
  classifyStage: (name: string) => string
}

const r1 = (n: number) => Math.round(n * 10) / 10
export const pctOf = (v: number, t: number) => (t > 0 ? Math.round((v / t) * 100) : 0)

export function promoteTargetFor(s: V3Settings, no: number, win: MonthWin): { target: number; label: string; perUnit: number } {
  const per = Number(s.promoteTargets?.[String(no)]) || s.promoteTarget
  if (s.promoteUnit === 'week') {
    return { target: Math.max(1, Math.round(per * win.days / 7)), label: `${per} posts / week`, perUnit: per }
  }
  return { target: Math.max(1, Math.round(per * win.workingDays)), label: `${per} posts / working day`, perUnit: per }
}

// Social stores snippets with HTML numeric entities and broken bytes — make them readable.
function cleanText(s: string): string {
  return s.replace(/&#(\d+);/g, (_, n) => { try { return String.fromCodePoint(+n) } catch { return '' } })
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/\uFFFD/g, "'").replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '')
    .replace(/\s+/g, ' ').trim()
}

async function socialJson(deps: Deps, path: string): Promise<any> {
  try {
    const r = await deps.socialFetch(path)
    if (!r.ok) return null
    return await r.json()
  } catch { return null }
}

async function collectPromote(deps: Deps, entry: RegistryEntry, win: MonthWin, prev: MonthWin, s: V3Settings) {
  if (!entry.socialId || entry.promote === false) return null
  const today = todayNY()
  const sinceStart = dDiff(win.start, today) + 1
  const sincePrev = Math.min(365, dDiff(prev.start, today) + 1)
  const afterEnd = win.isCurrent ? 0 : dDiff(dPlus(win.monthEnd, 1), today) + 1
  const id = entry.socialId
  const [all, fromStart, fromAfter, foll] = await Promise.all([
    socialJson(deps, `/api/analytics/summary?clientId=${id}&days=${sincePrev}`),
    socialJson(deps, `/api/analytics/summary?clientId=${id}&days=${Math.min(365, sinceStart)}`),
    afterEnd > 0 ? socialJson(deps, `/api/analytics/summary?clientId=${id}&days=${Math.min(365, afterEnd)}`) : Promise.resolve(null),
    socialJson(deps, `/api/followers?clientId=${id}`),
  ])
  if (!all && !fromStart) return null
  // Nothing on any platform across both months = no account collecting in social.
  const allPosts = ((all?.data?.postsByDay) || []).reduce((a: number, x: any) => a + (x.total || 0), 0)
  if (!allPosts && !Object.keys(all?.data?.byPlatform || {}).length) return null
  const pbd: any[] = (all?.data?.postsByDay) || []
  const inWin = (d: string) => d >= win.start && d <= win.end
  const inPrev = (d: string) => d >= prev.start && d <= prev.end
  const daily: { date: string; posts: number }[] = []
  for (let d = win.start; d <= win.end; d = dPlus(d, 1)) {
    const row = pbd.find(x => x.date === d)
    daily.push({ date: d, posts: row ? (row.total || 0) : 0 })
  }
  const posts = pbd.filter(x => inWin(x.date)).reduce((a, x) => a + (x.total || 0), 0)
  const prevPosts = pbd.filter(x => inPrev(x.date)).reduce((a, x) => a + (x.total || 0), 0)
  const tA = fromStart?.data?.totals || {}, tB = fromAfter?.data?.totals || {}
  const sub = (k: string) => Math.max(0, (tA[k] || 0) - (tB[k] || 0))
  const likes = sub('likes'), comments = sub('comments'), shares = sub('shares')
  const platforms = Object.keys(fromStart?.data?.byPlatform || all?.data?.byPlatform || {})
    .map(p => p === 'TWITTER' ? 'X' : p === 'LINKEDIN' ? 'LinkedIn' : p.charAt(0) + p.slice(1).toLowerCase())

  // followers: latest per platform, growth across the month from snapshots
  let followers = 0, followersGrowth = 0
  const snaps: any[] = foll?.data?.snapshots || []
  const summary = foll?.data?.summary || {}
  const plats = new Set<string>([...Object.keys(summary), ...snaps.map(x => x.platform)])
  for (const p of plats) {
    const ps = snaps.filter(x => x.platform === p).sort((a, b) => String(a.snapshotDateLocal).localeCompare(String(b.snapshotDateLocal)))
    const atOrBefore = (d: string) => { let v: number | null = null; for (const x of ps) { if (x.snapshotDateLocal <= d) v = x.followerCount || 0 } return v }
    const endV = atOrBefore(win.end) ?? (summary[p]?.count || 0)
    const startV = atOrBefore(dPlus(win.start, -1)) ?? (ps.find(x => x.snapshotDateLocal >= win.start)?.followerCount ?? endV)
    followers += endV || 0
    followersGrowth += (endV || 0) - (startV || 0)
  }

  const tops: any[] = (fromStart?.data?.topPosts || []).filter((p: any) => inWin(String(p.publishedDateLocal || '')))
  const tp = tops[0]
  const t = promoteTargetFor(s, entry.no, win)
  return {
    posts, prevPosts, target: t.target, pct: pctOf(posts, t.target),
    perDay: win.workingDays ? r1(posts / win.workingDays) : 0, targetLabel: t.label,
    likes, comments, shares, engagement: likes + comments + shares,
    followers, followersGrowth, platforms, daily,
    topPost: tp ? { snippet: cleanText(String(tp.textSnippet || tp.postTextSnippet || '')).slice(0, 220), url: tp.postUrl || '', engagement: tp.totalEngagement || ((tp.likeCount || 0) + (tp.commentCount || 0) + (tp.shareCount || 0)), date: tp.publishedDateLocal || '', platform: tp.platform || '' } : null,
  }
}

interface SiReport { reportId: string; label: string }
async function fetchTrajectory(reportId: string): Promise<{ traj: any[]; opps: any[]; period: string; account: string } | null> {
  try {
    const res = await fetch(`https://prospecthub.straight-in.com/api/retain/public/campaign-reports/${reportId}`)
    if (!res.ok) return null
    const data = await res.json() as any
    const snap = data?.snapshot || {}
    return {
      traj: Array.isArray(snap.trajectory) ? snap.trajectory : [],
      opps: Array.isArray(snap.opportunities) ? snap.opportunities : [],
      period: snap.periodLabel || `${data?.periodStart || ''} – ${data?.periodEnd || ''}`,
      account: (Array.isArray(snap.accounts) && snap.accounts[0]?.account_name) || ((String(data?.title || '').match(/—\s*(.+?)\s*\(/) || [])[1]) || '',
    }
  } catch { return null }
}

// One client number can run several LinkedIn campaigns (Altavia: Anne + Alexandre,
// Finance Montreal: Steve + Noza). Every campaign report is fetched and summed.
async function collectNetwork(reports: SiReport[], win: MonthWin, prev: MonthWin, s: V3Settings, expected: string[] = []) {
  const got = (await Promise.all(reports.map(async r => ({ r, d: await fetchTrajectory(r.reportId) })))).filter(x => x.d)
  if (!got.length) return null
  const inM = (w: MonthWin) => (t: any) => String(t.weekStart || '') >= w.start && String(t.weekStart || '') <= w.monthEnd
  const sum = (rows: any[], k: string) => rows.reduce((a, t) => a + (Number(t[k]) || 0), 0)
  const weekMap: Record<string, { weekStart: string; sent: number; accepted: number; messages: number; opportunities: number }> = {}
  let sent = 0, accepted = 0, messages = 0, opportunities = 0, prevSent = 0, prevAccepted = 0
  const campaigns: { label: string; sent: number; accepted: number; rate: number; opportunities: number }[] = []
  const namedOpps: { name: string; company: string; title: string; type: string; date: string }[] = []
  let lastReport = ''
  const stale: string[] = []
  let lastWeekSeen = ''
  for (const { r, d } of got) {
    const cur = d!.traj.filter(inM(win)), pr = d!.traj.filter(inM(prev))
    const cs = sum(cur, 'connectionsSent'), ca = sum(cur, 'accepted'), co = sum(cur, 'opportunities')
    sent += cs; accepted += ca; messages += sum(cur, 'messages'); opportunities += co
    prevSent += sum(pr, 'connectionsSent'); prevAccepted += sum(pr, 'accepted')
    const lastWeek = d!.traj.map(t => String(t.weekStart || '')).sort().pop() || ''
    if (lastWeek && lastWeek < win.start) stale.push(d!.account || r.label)
    campaigns.push({ label: d!.account || r.label, sent: cs, accepted: ca, rate: cs ? r1((ca / cs) * 100) : 0, opportunities: co })
    for (const t of cur) {
      const w = weekMap[t.weekStart] || (weekMap[t.weekStart] = { weekStart: t.weekStart, sent: 0, accepted: 0, messages: 0, opportunities: 0 })
      w.sent += t.connectionsSent || 0; w.accepted += t.accepted || 0; w.messages += t.messages || 0; w.opportunities += t.opportunities || 0
    }
    for (const o of d!.opps) {
      const dt = String(o.loggedAt || '').slice(0, 10)
      if (dt >= win.start && dt <= win.end) namedOpps.push({ name: o.name || '', company: o.company || '', title: String(o.jobTitle || '').trim(), type: String(o.opportunityType || '').replace(/_/g, ' '), date: dt })
    }
    const lw = d!.traj.map(t => String(t.weekStart || '')).sort().pop() || ''
    if (lw > lastWeekSeen) { lastWeekSeen = lw; lastReport = d!.period }
  }
  const rate = sent ? r1((accepted / sent) * 100) : 0
  const prevRate = prevSent ? r1((prevAccepted / prevSent) * 100) : 0
  // No weekly report covering this month yet (Straight-in reports land a few days after each week)
  const pending = Object.keys(weekMap).length === 0
  const firsts = campaigns.map(k => k.label.toLowerCase())
  const missingCampaigns = expected.filter(e => !firsts.some(f => f.includes(e.toLowerCase())))
  return {
    pending, missingCampaigns, staleCampaigns: stale, sent, accepted, rate, messages, opportunities, prevSent, prevAccepted, prevRate, pct: (pending ? null : pctOf(rate, s.acceptTarget)) as any,
    weeks: Object.values(weekMap).sort((a, b) => a.weekStart.localeCompare(b.weekStart)),
    namedOpps, lastReport, campaigns,
  }
}

// Report ids for a client: each company's current id + every link of the latest
// stored Straight-in week that resolved to one of its companies (a client with two
// campaigns under one company key, e.g. Altavia, has two entries there).
async function reportsFor(kv: KVNamespace, entry: RegistryEntry, companies: any[]): Promise<SiReport[]> {
  const out = new Map<string, SiReport>()
  try {
    const list = await kv.list({ prefix: 'straightin:week:' })
    const latest = list.keys.map(k => k.name).sort().pop()
    if (latest) {
      const wk = JSON.parse((await kv.get(latest)) || '{}')
      for (const e of (wk.entries || [])) {
        if (e.reportId && e.companyKey && entry.keys.includes(e.companyKey)) out.set(e.reportId, { reportId: e.reportId, label: e.label || e.companyKey })
      }
    }
  } catch { /* fall back to company ids */ }
  for (const co of companies) {
    if (co?.straightInReportId && !out.has(co.straightInReportId)) out.set(co.straightInReportId, { reportId: co.straightInReportId, label: co.name || co.key })
  }
  return [...out.values()]
}

const MEETING_PLUS = ['meeting', 'proposal', 'won']
async function collectEngage(deps: Deps, companies: any[], win: MonthWin, prev: MonthWin, s: V3Settings, users = 1) {
  // Goal is per LinkedIn user: Finance Montreal (Steve + Noza) and Altavia (Anne + Alexandre) = 2 × goal
  const goal = s.leadsPerMonth * Math.max(1, users)
  const startMs = Date.parse(win.start + 'T00:00:00-04:00'), endMs = Date.parse(win.end + 'T23:59:59-04:00')
  const pStartMs = Date.parse(prev.start + 'T00:00:00-04:00'), pEndMs = Date.parse(prev.monthEnd + 'T23:59:59-04:00')
  let newLeads = 0, prevNewLeads = 0, meetings = 0, meetingsTotal = 0, totalLeads = 0, recycled = 0, won = 0
  const funnel: Record<string, number> = { contacted: 0, connected: 0, meeting: 0, proposal: 0, won: 0, recycled: 0 }
  let any = false
  for (const co of companies) {
    if (!co?.pipelineKey) continue
    const [pipeline, boxes] = await Promise.all([
      deps.callStreakAPI(`/pipelines/${co.pipelineKey}`).catch(() => null),
      deps.callStreakAPI(`/pipelines/${co.pipelineKey}/boxes`).catch(() => null),
    ])
    if (!Array.isArray(boxes)) continue
    any = true
    const stageName = (k: string) => pipeline?.stages?.[k]?.name || ''
    for (const b of boxes) {
      totalLeads++
      const ts = b.creationTimestamp || 0
      if (ts >= startMs && ts <= endMs) newLeads++
      if (ts >= pStartMs && ts <= pEndMs) prevNewLeads++
      const step = deps.classifyStage(stageName(b.stageKey))
      funnel[step] = (funnel[step] || 0) + 1
      if (step === 'recycled') recycled++
      if (step === 'won') won++
      if (MEETING_PLUS.includes(step)) {
        meetingsTotal++
        const ch = b.lastStageChangeTimestamp || 0
        if (ch >= startMs && ch <= endMs) meetings++
      }
    }
  }
  if (!any) return null
  // Current month: compare against the share of the monthly goal elapsed so far.
  const daysInMonth = dDiff(win.start, win.monthEnd) + 1
  const soFar = win.isCurrent ? (goal * win.days) / daysInMonth : goal
  return {
    newLeads, prevNewLeads, target: goal, pct: pctOf(newLeads, soFar),
    meetings, meetingsTotal, activeLeads: totalLeads - recycled, totalLeads, funnel, won,
  }
}

export async function collectClientMonth(env: { COMPANIES_KV: KVNamespace }, deps: Deps, entry: RegistryEntry, monthKey: string, s?: V3Settings): Promise<ClientMonth> {
  const settings = s || await readSettings(env.COMPANIES_KV)
  const win = monthWin(monthKey), prev = monthWin(win.prevKey)
  const companies = (await Promise.all(entry.keys.map(k => deps.getCompany(env.COMPANIES_KV, k).catch(() => null)))).filter(Boolean)
  const reports = await reportsFor(env.COMPANIES_KV, entry, companies)
  const errors: string[] = []
  const [promote, network, engage] = await Promise.all([
    collectPromote(deps, entry, win, prev, settings).catch(e => { errors.push('promote: ' + e.message); return null }),
    reports.length ? collectNetwork(reports, win, prev, settings, entry.campaigns || []).catch(e => { errors.push('network: ' + e.message); return null }) : Promise.resolve(null),
    collectEngage(deps, companies, win, prev, settings, (entry.campaigns || []).length || 1).catch(e => { errors.push('engage: ' + e.message); return null }),
  ])
  return { no: entry.no, name: entry.name, keys: entry.keys, promoteInPlan: entry.promote !== false, campaigns: entry.campaigns || [], month: win.key, generatedAt: new Date().toISOString(), promote, network, engage, errors }
}

// KV cache: 30 min for the current month, 12 h for closed months.
export async function getClientMonth(env: { COMPANIES_KV: KVNamespace }, deps: Deps, entry: RegistryEntry, monthKey: string, opts: { fresh?: boolean; settings?: V3Settings } = {}): Promise<ClientMonth> {
  const win = monthWin(monthKey)
  const ck = `v3:cm6:${win.key}:${entry.no}`
  if (!opts.fresh) {
    try {
      const raw = await env.COMPANIES_KV.get(ck)
      if (raw) return JSON.parse(raw)
    } catch { /* miss */ }
  }
  const rec = await collectClientMonth(env, deps, entry, win.key, opts.settings)
  try { await env.COMPANIES_KV.put(ck, JSON.stringify(rec), { expirationTtl: win.isCurrent ? 1800 : 43200 }) } catch { /* ignore */ }
  return rec
}

// ── Scoring ──────────────────────────────────────────────────────────────────
export type Band = 'good' | 'warn' | 'crit' | 'none'
export const band = (p: number | null | undefined): Band => p == null ? 'none' : p >= 80 ? 'good' : p >= 40 ? 'warn' : 'crit'
export function overallScore(cm: ClientMonth): number | null {
  const parts = [cm.promote?.pct, cm.network?.pct, cm.engage?.pct].filter(v => v != null) as number[]
  if (!parts.length) return null
  return Math.round(parts.map(p => Math.min(100, p)).reduce((a, b) => a + b, 0) / parts.length)
}

export interface Portfolio {
  month: MonthWin
  clients: ClientMonth[]
  totals: {
    posts: number; postsTarget: number; postsPct: number; engagement: number
    sent: number; accepted: number; rate: number; ratePct: number; opportunities: number
    newLeads: number; leadsTarget: number; leadsPct: number; meetings: number
    score: number | null
  }
}
export function portfolioOf(month: MonthWin, clients: ClientMonth[], s: V3Settings): Portfolio {
  const P = clients.filter(c => c.promote), N = clients.filter(c => c.network && !c.network.pending), E = clients.filter(c => c.engage)
  const posts = P.reduce((a, c) => a + c.promote!.posts, 0)
  const postsTarget = P.reduce((a, c) => a + c.promote!.target, 0)
  const sent = N.reduce((a, c) => a + c.network!.sent, 0)
  const accepted = N.reduce((a, c) => a + c.network!.accepted, 0)
  const rate = sent ? r1((accepted / sent) * 100) : 0
  const newLeads = E.reduce((a, c) => a + c.engage!.newLeads, 0)
  const leadsTarget = E.reduce((a, c) => a + c.engage!.target, 0)
  const scores = clients.map(overallScore).filter(v => v != null) as number[]
  return {
    month, clients,
    totals: {
      posts, postsTarget, postsPct: pctOf(posts, postsTarget), engagement: P.reduce((a, c) => a + c.promote!.engagement, 0),
      sent, accepted, rate, ratePct: pctOf(rate, s.acceptTarget), opportunities: N.reduce((a, c) => a + c.network!.opportunities, 0),
      newLeads, leadsTarget, leadsPct: pctOf(newLeads, leadsTarget), meetings: E.reduce((a, c) => a + c.engage!.meetings, 0),
      score: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    },
  }
}
