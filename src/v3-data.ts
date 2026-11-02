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
  accountKeys?: Record<string, string> // company key → LinkedIn account name (when each account has its own Streak pipeline)
  linalysis?: string[]    // Linalysis account email(s) of the LinkedIn profile used for the campaign
  services: Services      // what Gershon delivers for this client (Olivier's table, 2026-10-28); Settings can override
}

// The three services Gershon sells. Off = not collected, not reported, not counted in scores or gaps.
export interface Services { promote: boolean; network: boolean; engage: boolean }
const ALL: Services = { promote: true, network: true, engage: true }
const NE: Services = { promote: false, network: true, engage: true }
const P_ONLY: Services = { promote: true, network: false, engage: false }

export const CLIENT_REGISTRY: RegistryEntry[] = [
  // 175 and 229: one client number, two LinkedIn campaigns each, no Promote (Olivier, 2026-10-13)
  { no: 175, name: 'Finance Montreal',       keys: ['finance-montreal', 'finance-montreal-noza'], socialId: 'cmp0eqm9o000rbqj3ayeto7zp', services: NE, campaigns: ['Steve', 'Noza'], accountKeys: { 'finance-montreal': 'Steve', 'finance-montreal-noza': 'Noza' } },
  { no: 200, name: 'MAbSilico',              keys: ['mabsilico'],              socialId: 'cmnzg13dn0000j4oeke3nh3ko', services: NE, linalysis: ['vincent.puard@gmail.com'] },
  { no: 212, name: 'Wallix',                 keys: ['wallix'],                 socialId: 'cmp0eqlsx000dbqj3hmvwldbe', services: P_ONLY },
  { no: 229, name: 'Altavia',                keys: ['altavia'],                socialId: 'cmp0eqm3y000mbqj321j14ksw', services: NE, campaigns: ['Anne', 'Alexandre'], linalysis: ['abougel@altavia.co'] },
  { no: 233, name: 'Valos',                  keys: ['valos'],                  socialId: 'cmp0eqlp4000abqj325ow1eyf', services: ALL, linalysis: ['dmitri.petratchenko@valos.it'] },
  { no: 245, name: 'PhiTech Bioinformatics', keys: ['phitech-bioinformatics'], socialId: 'cmoda8pxb000pmayx7fbslr0j', services: ALL },
  { no: 246, name: 'Enzymicals AG',          keys: ['enzymicals-ag'],          socialId: 'cmrumcbd6000011b111l8s53r', services: ALL, linalysis: ['david.liese12@gmail.com'] },
  { no: 247, name: 'Flying Secoya',          keys: ['flying-secoya'],          socialId: 'cmrnknd4e0000q7qo69o3193g', services: ALL },
  { no: 248, name: 'Meteor Biotech',         keys: ['meteor-biotech'],         socialId: 'cmrumd4gb000c11b193zq0t2h', services: ALL, linalysis: ['amoslee89@gmail.com'] },
  { no: 250, name: 'Amphasys',               keys: [],                         socialId: 'cmv6rya4i0001nh4l1a92cf48', services: ALL, linalysis: ['markus.bernasconi@amphasys.com'] },
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
  services: Record<string, Partial<Services>> // client number → service on/off overrides (Settings page)
  linalysis: Record<string, string>           // client number → Linalysis account email(s), comma-separated (overrides registry)
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
  services: {},
  linalysis: {},
}
export function linalysisFor(entry: RegistryEntry, s?: V3Settings): string[] {
  const o = (s?.linalysis || {})[String(entry.no)]
  return o ? o.split(/[,;\s]+/).map(x => x.trim().toLowerCase()).filter(x => x.includes('@')) : (entry.linalysis || [])
}
export function servicesFor(entry: RegistryEntry, s?: V3Settings): Services {
  return { ...entry.services, ...((s?.services || {})[String(entry.no)] || {}) }
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
  const linIn = (s as any).linalysis && typeof (s as any).linalysis === 'object' ? (s as any).linalysis : cur.linalysis || {}
  next.linalysis = {}
  for (const r of CLIENT_REGISTRY) { const v = String(linIn[String(r.no)] || '').trim(); if (v && v !== (r.linalysis || []).join(', ')) next.linalysis[String(r.no)] = v }
  // keep only known client numbers and boolean switches
  const svcIn = (s as any).services && typeof (s as any).services === 'object' ? (s as any).services : cur.services || {}
  next.services = {}
  for (const r of CLIENT_REGISTRY) {
    const o = svcIn[String(r.no)]; if (!o) continue
    const clean: Partial<Services> = {}
    for (const k of ['promote', 'network', 'engage'] as const) if (typeof o[k] === 'boolean' && o[k] !== r.services[k]) clean[k] = o[k]
    if (Object.keys(clean).length) next.services[String(r.no)] = clean
  }
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
  services: Services
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
    fieldGaps?: Record<string, string[]>  // Streak field name → boxes where it is empty
    newNames?: string[]                   // accounts created this month
    soFar?: number                        // leads expected by today (pro rata in the current month)
    byCompany?: { key: string; newLeads: number; meetings: number; activeLeads: number }[]
  }
  profile: null | Profile
  gaps: Gap[]
  promoteWhy?: string     // why Promote is empty when it is sold (shown on the client page)
  accounts?: AccountRow[]  // one row per LinkedIn account when a client runs several (Finance Montreal: Steve + Noza, Altavia: Anne + Alexandre)
  unchecked?: GapCol[]   // sources that could not be checked this run (shown as a hollow dot)
  errors: string[]
}

// One LinkedIn account of a multi-account client. network null = no Straight-in report for it;
// engage null = the accounts share one Streak pipeline (shown combined).
export interface AccountRow {
  name: string
  network: null | { label: string; sent: number; accepted: number; rate: number; opportunities: number }
  engage: null | { newLeads: number; target: number; pct: number; meetings: number; activeLeads: number }
}

// LinkedIn profile + company page for the month, from Linalysis (/api/client-month).
export interface ProfileSnap { date: string; [k: string]: number | string | null }
export interface Profile {
  email: string; days: number
  from: ProfileSnap | null; to: ProfileSnap
  missing: string[]   // fields with no opening value (partial capture at month start)
}

// One thing the platform could not fill for a client-month report.
//   missing = a number is blocked · partial = shown but incomplete · decision = needs Olivier
export interface Gap { level: 'missing' | 'partial' | 'decision'; area: string; what: string; effect: string; owner: string; col?: GapCol; fix?: Fix }
// Where the missing data is added (one place per data source), and who adds it.
export interface Fix { place: string; url: string; who: string }

// One column per data source in the Data gaps table. Dot per client: green = we have it,
// orange = some but not all, red = all of it is missing, off = the service is not sold to this client.
export type GapCol = 'weeks' | 'opps' | 'pipeline' | 'fields' | 'social' | 'profile' | 'recipient' | 'goal'
export type Dot = 'green' | 'orange' | 'red' | 'off' | 'unknown'
export const GAP_COLUMNS: { col: GapCol; label: string; service: keyof Services | null }[] = [
  { col: 'social', label: 'Social posts', service: 'promote' },
  { col: 'weeks', label: 'Straight-in weeks', service: 'network' },
  { col: 'opps', label: 'Named opportunities', service: 'network' },
  { col: 'profile', label: 'LinkedIn profile (Linalysis)', service: 'network' },
  { col: 'pipeline', label: 'Streak pipeline', service: 'engage' },
  { col: 'fields', label: 'Streak fields', service: 'engage' },
  { col: 'recipient', label: 'Report recipient', service: null },
]
export const APP_URL = 'https://client.gershoncrm.com'
export function fixFor(col: GapCol, ctx: { streakUrl?: string; no: number }): Fix {
  switch (col) {
    case 'social': return { place: 'socialtracking.gershon.ai → the client → the content we post', url: 'https://socialtracking.gershon.ai', who: 'Account team' }
    case 'weeks': return { place: 'Straight-in links page → paste the week\'s report links', url: `${APP_URL}/straightin`, who: 'Nicolette (Straight-in)' }
    case 'opps': return { place: 'Straight-in links page → paste every week\'s links (each week names its own opportunities)', url: `${APP_URL}/straightin`, who: 'Nicolette (Straight-in)' }
    case 'profile': return { place: 'Linalysis → the campaign\'s LinkedIn user connects (extension). Company-page figures: a Page admin adds that user as Analyst on LinkedIn', url: 'https://linalysis.net/admin', who: 'Account team + client' }
    case 'pipeline': return { place: 'Admin → the company → Engage (Streak) link', url: `${APP_URL}/admin`, who: 'Aina' }
    case 'fields': return { place: 'Streak pipeline → fill Fit, Interest and Next Steps on every active account', url: ctx.streakUrl || 'https://www.streak.com', who: 'Aina, Juliana' }
    case 'recipient': return { place: 'Settings → Client report recipients', url: `${APP_URL}/settings`, who: 'Olivier (send the emails) → set in Settings' }
    case 'goal': return { place: 'Settings → targets (decision on what counts as a qualified lead)', url: `${APP_URL}/settings`, who: 'Olivier' }
  }
}
export function dotsFor(cm: ClientMonth): Record<GapCol, Dot> {
  const sv = cm.services || { promote: true, network: true, engage: true }
  const out = {} as Record<GapCol, Dot>
  for (const c of GAP_COLUMNS) {
    if (c.service && !sv[c.service]) { out[c.col] = 'off'; continue }
    if ((cm.unchecked || []).includes(c.col)) { out[c.col] = 'unknown'; continue }
    // no pipeline at all → its fields are missing too
    const g = (cm.gaps || []).filter(x => x.col === c.col || (c.col === 'fields' && x.col === 'pipeline' && x.level === 'missing'))
    out[c.col] = g.some(x => x.level === 'missing') ? 'red' : g.some(x => x.level === 'partial') ? 'orange' : 'green'
  }
  return out
}

export interface Deps {
  callStreakAPI: (endpoint: string) => Promise<any>
  socialFetch: (path: string) => Promise<Response>
  getCompany: (kv: KVNamespace, key: string) => Promise<any | null>
  classifyStage: (name: string) => string
  linalysisFetch?: (body: { emails: string[]; start: string; end: string }) => Promise<any>
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

async function collectPromote(deps: Deps, entry: RegistryEntry, win: MonthWin, prev: MonthWin, s: V3Settings, why: { v: string } = { v: '' }) {
  if (!entry.socialId || !servicesFor(entry, s).promote) return null
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
  if (!all && !fromStart) { why.v = 'social.gershon.ai did not answer for this client (Promote key refused or client id not found).'; return null }
  // Nothing on any platform across both months = no account collecting in social.
  const allPosts = ((all?.data?.postsByDay) || []).reduce((a: number, x: any) => a + (x.total || 0), 0)
  if (!allPosts && !Object.keys(all?.data?.byPlatform || {}).length) { why.v = `social.gershon.ai answers for this client but has no connected LinkedIn/X account and no post since ${prev.start}. Connect the client's accounts in socialtracking.gershon.ai.`; return null }
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

interface SiReport { reportId: string; label: string; oppsOnly?: boolean }  // oppsOnly = an older week's link, read only for its named opportunities
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
  const all = (await Promise.all(reports.map(async r => ({ r, d: await fetchTrajectory(r.reportId) })))).filter(x => x.d)
  const got = all.filter(x => !x.r.oppsOnly)
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
  // Each weekly link names only that week's opportunities: read the older weeks' links too.
  const seen = new Set(namedOpps.map(o => `${o.name}|${o.company}|${o.date}`))
  for (const { d } of all.filter(x => x.r.oppsOnly)) {
    for (const o of d!.opps) {
      const dt = String(o.loggedAt || '').slice(0, 10)
      const k = `${o.name || ''}|${o.company || ''}|${dt}`
      if (dt >= win.start && dt <= win.end && !seen.has(k)) { seen.add(k); namedOpps.push({ name: o.name || '', company: o.company || '', title: String(o.jobTitle || '').trim(), type: String(o.opportunityType || '').replace(/_/g, ' '), date: dt }) }
    }
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
// campaigns under one company key, e.g. Altavia, has two entries there). The links of
// the 8 weeks before are added as oppsOnly, for the opportunities they name.
async function reportsFor(kv: KVNamespace, entry: RegistryEntry, companies: any[]): Promise<SiReport[]> {
  const out = new Map<string, SiReport>()
  try {
    const list = await kv.list({ prefix: 'straightin:week:' })
    const names = list.keys.map(k => k.name).sort()
    const latest = names.pop()
    if (latest) {
      const wk = JSON.parse((await kv.get(latest)) || '{}')
      for (const e of (wk.entries || [])) {
        if (e.reportId && e.companyKey && entry.keys.includes(e.companyKey)) out.set(e.reportId, { reportId: e.reportId, label: e.label || e.companyKey })
      }
    }
    for (const name of names.slice(-8)) {
      const wk = JSON.parse((await kv.get(name)) || '{}')
      for (const e of (wk.entries || [])) {
        if (e.reportId && e.companyKey && entry.keys.includes(e.companyKey) && !out.has(e.reportId)) out.set(e.reportId, { reportId: e.reportId, label: e.label || e.companyKey, oppsOnly: true })
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
  const fieldGaps: Record<string, string[]> = {}
  const newNames: string[] = []
  let any = false
  const byCompany: { key: string; newLeads: number; meetings: number; activeLeads: number }[] = []
  for (const co of companies) {
    if (!co?.pipelineKey) continue
    const one = { key: String(co.key || ''), newLeads: 0, meetings: 0, activeLeads: 0 }
    const [pipeline, boxes] = await Promise.all([
      deps.callStreakAPI(`/pipelines/${co.pipelineKey}`).catch(() => null),
      deps.callStreakAPI(`/pipelines/${co.pipelineKey}/boxes`).catch(() => null),
    ])
    if (!Array.isArray(boxes)) continue
    any = true
    byCompany.push(one)
    const stageName = (k: string) => pipeline?.stages?.[k]?.name || ''
    // Fields a report needs on every active account (names as set in the client pipelines)
    const watched = ((pipeline?.fields || []) as any[]).filter(f => ['fit', 'interest', 'next steps'].includes(String(f.name || '').toLowerCase()))
    for (const b of boxes) {
      totalLeads++
      const ts = b.creationTimestamp || 0
      if (ts >= startMs && ts <= endMs) { newLeads++; one.newLeads++; if (b.name) newNames.push(String(b.name)) }
      if (deps.classifyStage(stageName(b.stageKey)) !== 'recycled') {
        for (const f of watched) {
          const v = b.fields?.[f.key]
          if (v == null || v === '' || (Array.isArray(v) && !v.length)) (fieldGaps[f.name] = fieldGaps[f.name] || []).push(String(b.name || b.boxKey))
        }
      }
      if (ts >= pStartMs && ts <= pEndMs) prevNewLeads++
      const step = deps.classifyStage(stageName(b.stageKey))
      funnel[step] = (funnel[step] || 0) + 1
      if (step === 'recycled') recycled++
      else one.activeLeads++
      if (step === 'won') won++
      if (MEETING_PLUS.includes(step)) {
        meetingsTotal++
        const ch = b.lastStageChangeTimestamp || 0
        if (ch >= startMs && ch <= endMs) { meetings++; one.meetings++ }
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
    fieldGaps, newNames, byCompany, soFar,
  }
}

async function collectProfile(deps: Deps, entry: RegistryEntry, win: MonthWin, s?: V3Settings): Promise<Profile | null> {
  const emails = linalysisFor(entry, s)
  if (!deps.linalysisFetch || !emails.length) return null
  const r = await deps.linalysisFetch({ emails, start: win.start, end: win.end })
  const a = (r?.accounts || []).find((x: any) => x.ok && x.to)
  if (!a) return null
  return { email: a.email, days: a.days || 0, from: a.from || null, to: a.to, missing: a.missing || [] }
}

// ── Data gaps: every number the month's reports could not fill, with an owner ──
function mondaysIn(win: MonthWin): string[] {
  const out: string[] = []
  for (let d = win.start; d <= win.monthEnd; d = dPlus(d, 1)) if (new Date(d + 'T12:00:00Z').getUTCDay() === 1) out.push(d)
  return out
}
export function computeGaps(entry: RegistryEntry, cm: ClientMonth, win: MonthWin, s: V3Settings, hasReports: boolean, hasPipeline: boolean, linalysisWired: boolean, streakUrl?: string): Gap[] {
  const g: Gap[] = []
  const lin = linalysisFor(entry, s)
  const N = cm.network, E = cm.engage, P = cm.promote, L = cm.profile
  const sv = cm.services || { promote: true, network: true, engage: true }
  // Network — Straight-in
  if (!sv.network) { /* not sold to this client */ }
  else if (!hasReports) g.push({ col: 'weeks', level: 'missing', area: 'Network', what: 'No Straight-in report linked to this client.', effect: 'No invitations, acceptance or opportunities in the report.', owner: 'Straight-in links page' })
  else if (!N) g.push({ col: 'weeks', level: 'missing', area: 'Network', what: 'The Straight-in report link did not answer.', effect: 'No network numbers.', owner: 'Straight-in links page' })
  else {
    // A week's report lands a few days after the week ends: only expect weeks that ended 5+ days ago.
    const today = todayNY()
    const due = (m: string) => dPlus(m, 11)   // week ends Sunday (+6), report lands about 5 days later
    const have = new Set(N.weeks.map(w => w.weekStart))
    const lacking = mondaysIn(win).filter(m => m <= today && !have.has(m))
    const late = lacking.filter(m => due(m) <= today), coming = lacking.filter(m => due(m) > today)
    const md = (d: string) => d.slice(5).replace('-', '/')
    if (N.pending) g.push({ col: 'weeks', level: 'missing', area: 'Network', what: `No Straight-in week of ${win.label} received yet.`, effect: 'No network numbers for the month.', owner: 'Straight-in (weekly links)' })
    else if (lacking.length) g.push({ col: 'weeks', level: 'partial', area: 'Network',
      what: [late.length ? `Straight-in weeks late: ${late.map(md).join(', ')}.` : '', coming.length ? `Not in yet: ${coming.map(m => `${md(m)} (due about ${md(due(m))})`).join(', ')}.` : ''].filter(Boolean).join(' '),
      effect: `Network covers ${N.weeks.length} of ${N.weeks.length + lacking.length} weeks; totals are understated until they arrive.`, owner: 'Straight-in (weekly links)' })
    for (const c of N.missingCampaigns || []) g.push({ col: 'weeks', level: 'partial', area: 'Network', what: `No report for the ${c} campaign.`, effect: 'That campaign is not counted.', owner: 'Straight-in links page' })
    for (const c of N.staleCampaigns || []) g.push({ col: 'weeks', level: 'partial', area: 'Network', what: `${c}: last Straight-in week is before ${win.label}.`, effect: 'Stale campaign numbers.', owner: 'Straight-in (weekly links)' })
    if (N.opportunities > N.namedOpps.length) g.push({ col: 'opps', level: N.namedOpps.length ? 'partial' : 'missing', area: 'Network', what: `${N.opportunities - N.namedOpps.length} of ${N.opportunities} opportunities have no name or company.`, effect: 'Each Straight-in link lists only its own week; older weeks need their own link kept.', owner: 'Platform: keep every weekly link' })
  }
  // Engage — Streak
  if (!sv.engage) { /* not sold to this client */ }
  else if (!hasPipeline) g.push({ col: 'pipeline', level: 'missing', area: 'Engage', what: 'No Streak pipeline linked.', effect: 'No leads or pipeline in the report.', owner: 'Admin (company pipeline key)' })
  else if (!E) g.push({ col: 'pipeline', level: 'missing', area: 'Engage', what: 'Streak did not answer for this pipeline.', effect: 'No leads or pipeline.', owner: 'Streak API key' })
  else {
    for (const [field, boxes] of Object.entries(E.fieldGaps || {})) {
      if (!boxes.length) continue
      const list = boxes.length <= 6 ? `: ${boxes.join(', ')}` : ''
      g.push({ col: 'fields', level: boxes.length >= E.activeLeads ? 'missing' : 'partial', area: 'Engage', what: `Streak "${field}" empty on ${boxes.length} of ${E.activeLeads} active accounts${list}.`, effect: field.toLowerCase() === 'next steps' ? 'No per-account next action in the report.' : 'Incomplete hot list (high fit, high interest).', owner: 'Account team (Streak)' })
    }
    if (E.meetingsTotal === 0 && (E.funnel.meeting || 0) === 0) g.push({ col: 'fields', level: 'partial', area: 'Engage', what: 'No account at a meeting stage, or the pipeline has no dated meeting field.', effect: 'Meetings held cannot be reported.', owner: 'Pipeline template' })
  }
  // Promote — social
  if (cm.promoteInPlan && !entry.socialId) g.push({ col: 'social', level: 'missing', area: 'Promote', what: 'No social.gershon.ai client linked.', effect: 'No posts or engagement.', owner: 'Registry' })
  else if (cm.promoteInPlan && !P) g.push({ col: 'social', level: 'missing', area: 'Promote', what: 'No social data for the month (no account collecting, or the Promote key was refused).', effect: 'No posts or engagement in the report.', owner: 'social.gershon.ai' })
  // LinkedIn profile — Linalysis (the campaign's LinkedIn account, so only with Network)
  if (!sv.network) { /* no LinkedIn campaign */ }
  else if (!lin.length) g.push({ col: 'profile', level: 'missing', area: 'Profile', what: 'No Linalysis account mapped to this client.', effect: 'No LinkedIn profile or company-page block.', owner: 'Registry (linalysis email)' })
  else if (!linalysisWired) g.push({ col: 'profile', level: 'missing', area: 'Profile', what: 'LINALYSIS_REPORT_KEY is not set on this app.', effect: 'No LinkedIn profile or company-page block.', owner: 'Cloudflare Pages secret' })
  else if (!L) g.push({ col: 'profile', level: 'missing', area: 'Profile', what: `Linalysis has no capture in ${win.label} for ${lin.join(', ')}.`, effect: 'No LinkedIn profile block.', owner: 'Linalysis extension' })
  else if (L.missing.length) g.push({ col: 'profile', level: 'partial', area: 'Profile', what: `Linalysis opening values missing: ${L.missing.map(f => f.replace(/_/g, ' ')).join(', ')}.`, effect: 'Those figures show a value but no monthly change.', owner: 'Linalysis' })
  // Delivery
  if (!emailsOf(s.clientEmails?.[String(entry.no)] || '').length) g.push({ col: 'recipient', level: 'missing', area: 'Delivery', what: 'No client recipient email set.', effect: `The report goes to ${s.internalEmail} only.`, owner: 'Targets & recipients' })
  // Definition — two meanings of "lead"
  if (E && N && !N.pending && E.newLeads !== N.opportunities) g.push({ col: 'goal', level: 'decision', area: 'Goal', what: `"Qualified lead" has two counts: ${E.newLeads} new Streak accounts vs ${N.opportunities} Straight-in opportunities.`, effect: `The ${E.target}/month goal reads ${pctOf(E.newLeads, E.target)}% or ${pctOf(N.opportunities, E.target)}% depending on the source.`, owner: 'Olivier' })
  for (const x of g) if (x.col && !x.fix) x.fix = fixFor(x.col, { streakUrl, no: entry.no })
  return g
}
const emailsOf = (s: string) => s.split(/[,;\s]+/).map(x => x.trim()).filter(x => x.includes('@'))

// Split a multi-account client into one row per LinkedIn account (always all of them, even with no data).
function accountRows(entry: RegistryEntry, N: ClientMonth['network'], E: ClientMonth['engage'], s: V3Settings): AccountRow[] | undefined {
  const names = entry.campaigns || []
  if (names.length < 2) return undefined
  const camps = N?.campaigns || []
  const used = new Set<number>()
  return names.map(name => {
    const lc = name.toLowerCase()
    const idx = camps.map((k, i) => (k.label.toLowerCase().includes(lc) && !used.has(i) ? i : -1)).filter(i => i >= 0)
    idx.forEach(i => used.add(i))
    const m = idx.map(i => camps[i])
    const sent = m.reduce((a, k) => a + k.sent, 0), accepted = m.reduce((a, k) => a + k.accepted, 0)
    const network = m.length ? { label: m.map(k => k.label).join(' + '), sent, accepted, rate: sent ? Math.round((accepted / sent) * 1000) / 10 : 0, opportunities: m.reduce((a, k) => a + k.opportunities, 0) } : null
    const key = Object.keys(entry.accountKeys || {}).find(k => entry.accountKeys![k] === name)
    const bc = key ? (E?.byCompany || []).find(x => x.key === key) : undefined
    const goal = s.leadsPerMonth
    // goal is per account; current month is compared pro rata, like the client total
    const soFar = E?.soFar != null && E.target ? E.soFar * goal / E.target : goal
    const engage = bc ? { newLeads: bc.newLeads, target: goal, pct: pctOf(bc.newLeads, soFar), meetings: bc.meetings, activeLeads: bc.activeLeads } : null
    return { name, network, engage }
  })
}

export async function collectClientMonth(env: { COMPANIES_KV: KVNamespace }, deps: Deps, entry: RegistryEntry, monthKey: string, s?: V3Settings): Promise<ClientMonth> {
  const settings = s || await readSettings(env.COMPANIES_KV)
  const win = monthWin(monthKey), prev = monthWin(win.prevKey)
  const companies = (await Promise.all(entry.keys.map(k => deps.getCompany(env.COMPANIES_KV, k).catch(() => null)))).filter(Boolean)
  const svc = servicesFor(entry, settings)
  const reports = svc.network ? await reportsFor(env.COMPANIES_KV, entry, companies) : []
  const errors: string[] = []
  const why = { v: "" }
  const [promote, network, engage, profile] = await Promise.all([
    collectPromote(deps, entry, win, prev, settings, why).catch(e => { errors.push('promote: ' + e.message); return null }),
    reports.some(r => !r.oppsOnly) ? collectNetwork(reports, win, prev, settings, entry.campaigns || []).catch(e => { errors.push('network: ' + e.message); return null }) : Promise.resolve(null),
    svc.engage ? collectEngage(deps, companies, win, prev, settings, (entry.campaigns || []).length || 1).catch(e => { errors.push('engage: ' + e.message); return null }) : Promise.resolve(null),
    svc.network ? collectProfile(deps, entry, win, settings).catch(e => { errors.push('profile: ' + e.message); return null }) : Promise.resolve(null),
  ])
  const accounts = accountRows(entry, network, engage, settings)
  const cm: ClientMonth = { promoteWhy: svc.promote && !promote ? why.v || undefined : undefined, accounts, no: entry.no, name: entry.name, keys: entry.keys, promoteInPlan: svc.promote, services: svc, campaigns: entry.campaigns || [], month: win.key, generatedAt: new Date().toISOString(), promote, network, engage, profile, gaps: [], errors }
  const pk = (companies.find((co: any) => co?.pipelineKey) as any)?.pipelineKey
  cm.gaps = computeGaps(entry, cm, win, settings, reports.filter(r => !r.oppsOnly).length > 0, !!pk, !!deps.linalysisFetch, pk ? `https://www.streak.com/a/pipelines/${pk}` : undefined)
  return cm
}

// KV cache: 30 min for the current month, 12 h for closed months.
export async function getClientMonth(env: { COMPANIES_KV: KVNamespace }, deps: Deps, entry: RegistryEntry, monthKey: string, opts: { fresh?: boolean; settings?: V3Settings } = {}): Promise<ClientMonth> {
  const win = monthWin(monthKey)
  const ck = `v3:cm9:${win.key}:${entry.no}`
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
