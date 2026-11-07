// ─────────────────────────────────────────────────────────────────────────────
// First-Friday client delivery + human validation gate (Olivier, 2026-11-05)
//
//  • The monthly client report is delivered to the client on the FIRST FRIDAY of
//    the month, for the month just closed, from client@gershon.ai (body + PDF).
//  • It may only go out if it was validated by Aina and/or Olivier (Settings:
//    "either" or "both") no later than 12:00 PM (noon) New York time on that
//    same Friday; the reports are sent at 1:00 PM New York time (Olivier,
//    2026-11-06 — was Thursday 6:00 PM). No validation in time = not sent.
//  • It only goes to professional addresses: personal mailboxes (gmail, yahoo,
//    hotmail…) are never used; a client with no professional address is blocked.
// ─────────────────────────────────────────────────────────────────────────────

export type ApproverId = 'aina' | 'olivier'
export const APPROVERS: { id: ApproverId; label: string }[] = [
  { id: 'aina', label: 'Aina' },
  { id: 'olivier', label: 'Olivier' },
]
export type ApprovalRecord = Partial<Record<ApproverId, string>> // approver → ISO time of validation

// ── Professional vs personal email ──────────────────────────────────────────
const PERSONAL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.fr', 'yahoo.co.uk', 'yahoo.ca', 'ymail.com', 'rocketmail.com',
  'hotmail.com', 'hotmail.fr', 'hotmail.co.uk', 'hotmail.ca', 'outlook.com', 'outlook.fr', 'live.com', 'live.fr', 'live.ca', 'msn.com',
  'icloud.com', 'me.com', 'mac.com', 'aol.com', 'aol.fr', 'proton.me', 'protonmail.com', 'pm.me', 'gmx.com', 'gmx.net', 'gmx.de', 'gmx.fr',
  'web.de', 't-online.de', 'free.fr', 'orange.fr', 'wanadoo.fr', 'laposte.net', 'sfr.fr', 'neuf.fr', 'bbox.fr', 'numericable.fr',
  'videotron.ca', 'sympatico.ca', 'bell.net', 'rogers.com', 'shaw.ca', 'telus.net', 'comcast.net', 'verizon.net', 'att.net', 'sbcglobal.net',
  'yandex.com', 'yandex.ru', 'mail.ru', 'mail.com', 'zoho.com', 'zohomail.com', 'tutanota.com', 'tuta.io', 'fastmail.com', 'hey.com',
  'qq.com', '163.com', '126.com', 'sina.com', 'naver.com', 'libero.it', 'virgilio.it', 'tiscali.it', 'bluewin.ch', 'skynet.be', 'telenet.be',
])
export const domainOf = (e: string) => String(e || '').trim().toLowerCase().split('@')[1] || ''
export const isPersonalEmail = (e: string) => {
  const d = domainOf(e)
  return !d || PERSONAL_DOMAINS.has(d) || /^(yahoo|hotmail|outlook|live|gmx|aol)\./.test(d)
}
export const splitEmails = (s: string) => String(s || '').split(/[,;\s]+/).map(x => x.trim()).filter(x => /.+@.+\..+/.test(x))
export function recipientCheck(raw: string): { pro: string[]; personal: string[] } {
  const all = splitEmails(raw)
  return { pro: all.filter(e => !isPersonalEmail(e)), personal: all.filter(e => isPersonalEmail(e)) }
}

// ── Calendar: first Friday — validate by 12:00 PM, send at 1:00 PM New York ────────────────
const pad = (n: number) => String(n).padStart(2, '0')
const nextMonthKey = (k: string) => { const y = +k.slice(0, 4), m = +k.slice(5, 7); return m === 12 ? `${y + 1}-01` : `${y}-${pad(m + 1)}` }
const prevMonthKey = (k: string) => { const y = +k.slice(0, 4), m = +k.slice(5, 7); return m === 1 ? `${y - 1}-12` : `${y}-${pad(m - 1)}` }
export function firstFridayOf(monthKey: string): string {
  for (let d = 1; d <= 7; d++) {
    const iso = `${monthKey}-${pad(d)}`
    if (new Date(iso + 'T12:00:00Z').getUTCDay() === 5) return iso
  }
  return `${monthKey}-01`
}
const dayBefore = (iso: string) => { const t = new Date(iso + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() - 1); return t.toISOString().slice(0, 10) }
// UTC instant of a wall-clock time in New York (handles EST/EDT).
export function nyToUtc(dateIso: string, hh: number, mm = 0): Date {
  const guess = Date.UTC(+dateIso.slice(0, 4), +dateIso.slice(5, 7) - 1, +dateIso.slice(8, 10), hh, mm)
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(new Date(guess))
  const g = (t: string) => +(parts.find(p => p.type === t)?.value || 0)
  const asNy = Date.UTC(g('year'), g('month') - 1, g('day'), g('hour') % 24, g('minute'))
  return new Date(guess + (guess - asNy))
}
export interface DeliveryWindow { reportMonth: string; friday: string; thursday: string; deadline: Date; deadlineLabel: string; sendAt: Date; sendLabel: string }
// Report for month M is delivered on the first Friday of month M+1.
export function deliveryWindow(reportMonth: string): DeliveryWindow {
  const friday = firstFridayOf(nextMonthKey(reportMonth))
  const thursday = dayBefore(friday)
  const deadline = nyToUtc(friday, 12, 0)
  const sendAt = nyToUtc(friday, 13, 0)
  const d = new Date(friday + 'T12:00:00Z')
  const day = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })
  const deadlineLabel = day + ' at 12:00 PM Eastern'
  const sendLabel = day + ' at 1:00 PM Eastern'
  return { reportMonth, friday, thursday, deadline, deadlineLabel, sendAt, sendLabel }
}
// The report month whose first-Friday delivery is upcoming (or today) for a given New York date.
export function upcomingReportMonth(todayNy: string): string {
  const cur = todayNy.slice(0, 7)
  return todayNy <= firstFridayOf(cur) ? prevMonthKey(cur) : cur
}

// ── Approval state ──────────────────────────────────────────────────────────
export const approvalKey = (month: string, no: number | string) => `v3:approval:${month}:${no}`
export const deliveryKey = (month: string, no: number | string) => `v3:delivered:${month}:${no}`
export async function readApproval(kv: KVNamespace, month: string, no: number | string): Promise<ApprovalRecord> {
  try { return JSON.parse((await kv.get(approvalKey(month, no))) || '{}') } catch { return {} }
}
// Valid = every required approver validated, each at or before the deadline.
export function isValidated(rec: ApprovalRecord, mode: 'either' | 'both', deadline: Date): boolean {
  const ok = (id: ApproverId) => !!rec[id] && new Date(rec[id] as string).getTime() <= deadline.getTime()
  return mode === 'both' ? ok('aina') && ok('olivier') : ok('aina') || ok('olivier')
}

// ── Signed approver links (no login needed; HMAC like the client report links) ─
function secretOf(env: any): string {
  return env.REPORT_LINK_SECRET || env.SESSION_SECRET || env.ENCRYPTION_KEY || env.AUTH_PASSWORD_HASH || 'gershon-client-report'
}
export async function approverSig(env: any, month: string, who: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secretOf(env)), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`approve:${who}:${month}`))
  return Array.from(new Uint8Array(sig)).slice(0, 16).map(b => b.toString(16).padStart(2, '0')).join('')
}
export async function approverLink(env: any, origin: string, month: string, who: ApproverId): Promise<string> {
  return `${origin.replace(/\/$/, '')}/approve/${month}/${who}/${await approverSig(env, month, who)}`
}
export async function verifyApproverSig(env: any, month: string, who: string, sig: string): Promise<boolean> {
  if (!APPROVERS.some(a => a.id === who)) return false
  const want = await approverSig(env, month, who)
  if (want.length !== sig.length) return false
  let d = 0
  for (let i = 0; i < want.length; i++) d |= want.charCodeAt(i) ^ sig.charCodeAt(i)
  return d === 0
}
