// [07] GC Pipeline — Next Due Dates from Calendar (weekly, Mondays)
//
// Replaces Claude scheduled task #07. For every box of the GC Pipeline (Streak)
// in the active stages, takes the first linked contact's e-mail, finds the next
// upcoming Google Calendar event on olivier@gershonconsulting.com that this
// e-mail is invited to (or mentioned in), and e-mails the list sorted by date —
// with a separate "next 7 days" block — via Resend.
//
// Routes
//   GET  /api/reports/next-due            preview (HTML, signed-in session)   ?format=json for data
//   POST /api/reports/next-due/send       send (REPORT_CRON_KEY or session)   ?force=1 to resend today
//   GET  /api/admin/google-calendar/connect   owner signs in once with Google (stores refresh token in KV)
//   GET  /api/auth/google-calendar/callback   OAuth callback (public prefix /api/auth/)
//   GET  /api/admin/google-calendar/status    is the calendar reachable?
//
// Google Calendar credentials (any one route works):
//   A) GOOGLE_CALENDAR_CLIENT_ID + GOOGLE_CALENDAR_CLIENT_SECRET (Pages secrets) and
//      one click on /api/admin/google-calendar/connect signed in as olivier@gershonconsulting.com
//      -> refresh token stored encrypted in KV (__gcal_refresh_token__)
//   B) same two secrets + GOOGLE_CALENDAR_REFRESH_TOKEN (Pages secret) minted elsewhere
// Scope: https://www.googleapis.com/auth/calendar.readonly
import type { Hono } from 'hono'

export type NextDueDeps = {
  streakKey: () => string
  sessionUser: (c: any) => Promise<string | null>
  sendEmail: (apiKey: string, o: { from: string, to: string[], subject: string, html: string }) => Promise<any>
  encrypt: (v: string, k: string) => Promise<string>
  decrypt: (v: string, k: string) => Promise<string>
  cronAuthorized: (c: any) => boolean
}

// GC Pipeline, pipeline:oattia@gmail.com:5750085036015616 (REST websafe key below).
// Override with GC_PIPELINE_KEY if Streak ever rejects it; we also fall back to a
// lookup by name ("GC Pipeline") in /v1/pipelines.
const DEFAULT_GC_PIPELINE_KEY = 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgICAwLWbCgw'
const GC_PIPELINE_NAME = 'GC Pipeline'
// 5012 = Recycled is deliberately excluded.
const STAGES = ['5001', '5002', '5010', '5003', '5011', '5013', '5005', '5015']
const DEFAULT_CALENDAR = 'olivier@gershonconsulting.com'
const FROM = 'GC Pipeline <nextduedate@gershon.ai>'
const TO = 'report@gershonconsulting.com'
const HORIZON_DAYS = 180
const TZ = 'America/New_York'
const GCAL_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly'
const KV_REFRESH = '__gcal_refresh_token__'
const KV_CONTACT = '__streak_contact_email__:'   // contactKey -> email cache (30 days)

const esc = (s: any) => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] as string))
export const nyDate = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)

// ── Streak ────────────────────────────────────────────────────────
async function streak(key: string, path: string): Promise<any> {
  const r = await fetch(`https://www.streak.com/api${path}`, { headers: { Authorization: `Basic ${btoa(key + ':')}` } })
  if (!r.ok) throw new Error(`Streak ${path.split('?')[0]} → ${r.status} ${(await r.text()).slice(0, 200)}`)
  return r.json()
}

async function resolvePipeline(env: any, key: string): Promise<{ key: string, stages: Record<string, string> }> {
  const tryKey = async (k: string) => {
    const p = await streak(key, `/v1/pipelines/${k}`)
    const stages: Record<string, string> = {}
    for (const [sk, s] of Object.entries<any>(p.stages || {})) stages[sk] = s?.name || sk
    return { key: p.key || k, stages }
  }
  try { return await tryKey(env.GC_PIPELINE_KEY || DEFAULT_GC_PIPELINE_KEY) } catch (e) {
    const all: any[] = await streak(key, '/v1/pipelines')
    const p = all.find(x => (x.name || '').trim().toLowerCase() === GC_PIPELINE_NAME.toLowerCase())
    if (!p) throw e
    return tryKey(p.key)
  }
}

async function listBoxes(key: string, pipelineKey: string): Promise<any[]> {
  const first = await streak(key, `/v1/pipelines/${pipelineKey}/boxes`)
  if (Array.isArray(first)) return first
  // Paginated shape {results, hasNextPage}
  const out: any[] = [...(first.results || [])]
  let page = 1, more = !!first.hasNextPage
  while (more && page < 50) {
    const r = await streak(key, `/v1/pipelines/${pipelineKey}/boxes?page=${page}&limit=500`)
    out.push(...(r.results || [])); more = !!r.hasNextPage; page++
  }
  return out
}

async function contactEmail(env: any, key: string, box: any): Promise<string> {
  let contacts = box.contacts
  if (contacts === undefined) {           // list endpoint may omit linked contacts → read the box
    try { contacts = (await streak(key, `/v1/boxes/${box.boxKey || box.key}`)).contacts } catch { contacts = [] }
  }
  const c0 = (contacts || [])[0]
  if (!c0) return ''
  const direct = c0.email || (c0.emailAddresses || [])[0]
  if (direct) return String(direct).toLowerCase()
  const ck = c0.key || c0.contactKey
  if (!ck) return ''
  const cached = await env.COMPANIES_KV.get(KV_CONTACT + ck)
  if (cached !== null) return cached
  let email = ''
  try {
    const c = await streak(key, `/v2/contacts/${ck}`)
    email = String((c.emailAddresses || [])[0] || c.email || '').toLowerCase()
  } catch { return '' }
  await env.COMPANIES_KV.put(KV_CONTACT + ck, email, { expirationTtl: 30 * 86400 })
  return email
}

// ── Google Calendar ───────────────────────────────────────────────
function gcalClient(env: any) {
  return { id: env.GOOGLE_CALENDAR_CLIENT_ID || '', secret: env.GOOGLE_CALENDAR_CLIENT_SECRET || '' }
}

async function refreshToken(env: any, deps: NextDueDeps): Promise<string> {
  if (env.GOOGLE_CALENDAR_REFRESH_TOKEN) return env.GOOGLE_CALENDAR_REFRESH_TOKEN
  const enc = await env.COMPANIES_KV.get(KV_REFRESH)
  if (enc && env.ENCRYPTION_KEY) return deps.decrypt(enc, env.ENCRYPTION_KEY)
  return ''
}

async function accessToken(env: any, deps: NextDueDeps): Promise<string> {
  const { id, secret } = gcalClient(env)
  const rt = await refreshToken(env, deps)
  if (!id || !secret) throw new Error('Google Calendar not configured: set Pages secrets GOOGLE_CALENDAR_CLIENT_ID and GOOGLE_CALENDAR_CLIENT_SECRET')
  if (!rt) throw new Error('Google Calendar not connected: open /api/admin/google-calendar/connect once, signed in as olivier@gershonconsulting.com (or set GOOGLE_CALENDAR_REFRESH_TOKEN)')
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: rt, grant_type: 'refresh_token' }),
  })
  const j: any = await r.json()
  if (!r.ok || !j.access_token) throw new Error(`Google token refresh failed: ${j.error || r.status} ${j.error_description || ''}`)
  return j.access_token
}

async function upcomingEvents(env: any, deps: NextDueDeps): Promise<any[]> {
  const token = await accessToken(env, deps)
  const cal = encodeURIComponent(env.GOOGLE_CALENDAR_ID || DEFAULT_CALENDAR)
  const now = new Date()
  const max = new Date(now.getTime() + HORIZON_DAYS * 86400e3)
  const out: any[] = []
  let pageToken = ''
  for (let i = 0; i < 10; i++) {
    const q = new URLSearchParams({ timeMin: now.toISOString(), timeMax: max.toISOString(), singleEvents: 'true', orderBy: 'startTime', maxResults: '2500' })
    if (pageToken) q.set('pageToken', pageToken)
    const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${cal}/events?${q}`, { headers: { Authorization: `Bearer ${token}` } })
    const j: any = await r.json()
    if (!r.ok) throw new Error(`Google Calendar ${r.status}: ${j?.error?.message || ''}`)
    out.push(...(j.items || []).filter((e: any) => e.status !== 'cancelled'))
    if (!j.nextPageToken) break
    pageToken = j.nextPageToken
  }
  return out
}

// email -> first (soonest) event that involves it: attendee, organizer, or mentioned in title/description/location
function indexEvents(events: any[], emails: Set<string>): Map<string, any> {
  const found = new Map<string, any>()
  for (const ev of events) {               // already sorted by start time
    const hay = new Set<string>()
    for (const a of ev.attendees || []) if (a.email) hay.add(String(a.email).toLowerCase())
    if (ev.organizer?.email) hay.add(String(ev.organizer.email).toLowerCase())
    const text = `${ev.summary || ''} ${ev.description || ''} ${ev.location || ''}`.toLowerCase()
    for (const em of emails) {
      if (found.has(em)) continue
      if (hay.has(em) || text.includes(em)) found.set(em, ev)
    }
    if (found.size === emails.size) break
  }
  return found
}

const evStart = (ev: any) => new Date(ev.start?.dateTime || `${ev.start?.date}T12:00:00Z`)

// ── Report data + HTML ────────────────────────────────────────────
export async function buildNextDue(env: any, deps: NextDueDeps) {
  const key = deps.streakKey()
  if (!key) throw new Error('Streak API key not configured')
  const pipe = await resolvePipeline(env, key)
  const boxes = (await listBoxes(key, pipe.key)).filter(b => STAGES.includes(String(b.stageKey)))
  const rows: any[] = []
  // small concurrency to stay friendly with Streak + subrequest budget
  for (let i = 0; i < boxes.length; i += 8) {
    const chunk = boxes.slice(i, i + 8)
    const emails = await Promise.all(chunk.map(b => contactEmail(env, key, b)))
    chunk.forEach((b, j) => rows.push({
      boxKey: b.boxKey || b.key, name: b.name || '(no name)', stageKey: String(b.stageKey),
      stage: pipe.stages[String(b.stageKey)] || String(b.stageKey), email: emails[j],
    }))
  }
  const emailSet = new Set(rows.map(r => r.email).filter(Boolean))
  const events = await upcomingEvents(env, deps)
  const idx = indexEvents(events, emailSet)
  for (const r of rows) {
    const ev = r.email ? idx.get(r.email) : null
    if (ev) {
      r.eventAt = evStart(ev).toISOString(); r.allDay = !ev.start?.dateTime
      r.eventTitle = ev.summary || '(no title)'; r.eventLink = ev.htmlLink || ''
    }
  }
  const withEvent = rows.filter(r => r.eventAt).sort((a, b) => a.eventAt.localeCompare(b.eventAt))
  const in7 = Date.now() + 7 * 86400e3
  return {
    date: nyDate(), pipelineKey: pipe.key,
    boxCount: rows.length,
    noEmail: rows.filter(r => !r.email).length,
    noEvent: rows.filter(r => r.email && !r.eventAt).sort((a, b) => a.name.localeCompare(b.name)),
    next7: withEvent.filter(r => Date.parse(r.eventAt) <= in7),
    all: withEvent,
    eventsScanned: events.length,
  }
}

function fmtWhen(r: any): string {
  const d = new Date(r.eventAt)
  const day = new Intl.DateTimeFormat('en-US', { timeZone: r.allDay ? 'UTC' : TZ, weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(d)
  if (r.allDay) return `${day} (all day)`
  const t = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' }).format(d)
  return `${day}, ${t} ET`
}

function table(list: any[]): string {
  if (!list.length) return '<p style="color:#6b7280;font-size:14px;margin:8px 0 0">None.</p>'
  const th = 'text-align:left;padding:8px 10px;border-bottom:2px solid #e5e7eb;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.04em'
  const td = 'padding:8px 10px;border-bottom:1px solid #f1f1f1;font-size:14px;color:#111827;vertical-align:top'
  return `<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-top:8px">
<tr><th style="${th}">Date</th><th style="${th}">Company</th><th style="${th}">Stage</th><th style="${th}">Event</th></tr>
${list.map(r => `<tr>
<td style="${td};white-space:nowrap">${esc(fmtWhen(r))}</td>
<td style="${td}"><a href="https://www.streak.com/a/boxes/${esc(r.boxKey)}" style="color:#c8102e;font-weight:600;text-decoration:none">${esc(r.name)}</a><br><span style="color:#6b7280;font-size:12px">${esc(r.email)}</span></td>
<td style="${td};color:#374151">${esc(r.stage)}</td>
<td style="${td}">${r.eventLink ? `<a href="${esc(r.eventLink)}" style="color:#1d4ed8;text-decoration:none">${esc(r.eventTitle)}</a>` : esc(r.eventTitle)}</td>
</tr>`).join('')}
</table>`
}

export function renderNextDue(d: any): string {
  const h2 = 'font-size:16px;color:#111827;margin:28px 0 4px'
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
<div style="max-width:760px;margin:0 auto;padding:24px;background:#ffffff">
<div style="border-top:4px solid #c8102e;padding-top:16px">
<div style="font-size:12px;color:#6b7280;letter-spacing:.06em;text-transform:uppercase">[07] GC Pipeline</div>
<h1 style="font-size:22px;color:#111827;margin:4px 0 6px">Next Due Dates from Calendar — ${esc(d.date)}</h1>
<p style="font-size:14px;color:#374151;margin:0"><b>${d.boxCount}</b> boxes in the active stages (Recycled excluded) ·
<b>${d.all.length}</b> with an upcoming meeting · <b>${d.next7.length}</b> in the next 7 days ·
${d.noEvent.length} with no meeting scheduled · ${d.noEmail} without a contact e-mail.</p>
</div>
<h2 style="${h2}">Next 7 days</h2>${table(d.next7)}
<h2 style="${h2}">All upcoming (sorted by date)</h2>${table(d.all)}
<h2 style="${h2}">No upcoming meeting (${d.noEvent.length})</h2>
<p style="font-size:13px;color:#374151;line-height:1.7;margin:6px 0 0">${d.noEvent.map((r: any) => `<a href="https://www.streak.com/a/boxes/${esc(r.boxKey)}" style="color:#c8102e;text-decoration:none">${esc(r.name)}</a> <span style="color:#9ca3af">(${esc(r.stage)})</span>`).join(' · ') || 'None.'}</p>
<p style="font-size:12px;color:#9ca3af;margin-top:28px">Calendar searched: next ${HORIZON_DAYS} days (${d.eventsScanned} events). Sent automatically by client.gershoncrm.com every Monday.</p>
</div></body></html>`
}

// ── Routes ────────────────────────────────────────────────────────
function siteUrl(c: any) { const u = new URL(c.req.url); return `${u.protocol}//${u.host}` }

export function registerNextDue(app: Hono<any>, deps: NextDueDeps) {
  app.get('/api/reports/next-due', async (c) => {
    try {
      const d = await buildNextDue(c.env, deps)
      return c.req.query('format') === 'json' ? c.json(d) : c.html(renderNextDue(d))
    } catch (e: any) { return c.json({ error: e.message }, 500) }
  })

  // Public path (cron) — guarded here: REPORT_CRON_KEY header or a signed-in session.
  app.post('/api/reports/next-due/send', async (c) => {
    if (!deps.cronAuthorized(c) && !(await deps.sessionUser(c))) return c.json({ error: 'Unauthorized' }, 401)
    try {
      if (!c.env.RESEND_API_KEY) return c.json({ error: 'RESEND_API_KEY not configured' }, 500)
      const today = nyDate()
      const sentKey = `__report_sent__:07:${today}`
      if (c.req.query('force') !== '1' && await c.env.COMPANIES_KV.get(sentKey)) {
        return c.json({ success: true, skipped: 'already sent today', date: today })
      }
      const d = await buildNextDue(c.env, deps)
      const r = await deps.sendEmail(c.env.RESEND_API_KEY, {
        from: FROM, to: [TO], subject: `[07] GC Pipeline Next Due Dates — ${today}`, html: renderNextDue(d),
      })
      await c.env.COMPANIES_KV.put(sentKey, r?.id || 'sent', { expirationTtl: 14 * 86400 })
      return c.json({ success: true, emailId: r?.id, boxCount: d.boxCount, upcoming: d.all.length, next7: d.next7.length })
    } catch (e: any) { return c.json({ error: e.message }, 500) }
  })

  app.get('/api/admin/google-calendar/status', async (c) => {
    const { id, secret } = gcalClient(c.env)
    const out: any = { clientId: !!id, clientSecret: !!secret, refreshToken: !!(await refreshToken(c.env, deps)), calendar: c.env.GOOGLE_CALENDAR_ID || DEFAULT_CALENDAR, redirectUri: `${siteUrl(c)}/api/auth/google-calendar/callback` }
    try { out.eventsNext180d = (await upcomingEvents(c.env, deps)).length; out.ok = true } catch (e: any) { out.ok = false; out.error = e.message }
    return c.json(out)
  })

  app.get('/api/admin/google-calendar/connect', async (c) => {
    const { id } = gcalClient(c.env)
    if (!id) return c.text('Set the Pages secret GOOGLE_CALENDAR_CLIENT_ID first.', 500)
    const state = crypto.randomUUID()
    await c.env.COMPANIES_KV.put(`__gcal_state__:${state}`, '1', { expirationTtl: 600 })
    const u = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    u.search = new URLSearchParams({
      client_id: id, redirect_uri: `${siteUrl(c)}/api/auth/google-calendar/callback`, response_type: 'code',
      scope: GCAL_SCOPE, access_type: 'offline', prompt: 'consent', include_granted_scopes: 'true',
      login_hint: c.env.GOOGLE_CALENDAR_ID || DEFAULT_CALENDAR, state,
    }).toString()
    return c.redirect(u.toString(), 302)
  })

  app.get('/api/auth/google-calendar/callback', async (c) => {
    const state = c.req.query('state') || ''
    if (!state || !(await c.env.COMPANIES_KV.get(`__gcal_state__:${state}`))) return c.text('Invalid or expired state — start again from /api/admin/google-calendar/connect', 400)
    await c.env.COMPANIES_KV.delete(`__gcal_state__:${state}`)
    const code = c.req.query('code')
    if (!code) return c.text(`Google did not return a code: ${c.req.query('error') || 'unknown'}`, 400)
    const { id, secret } = gcalClient(c.env)
    const r = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ code, client_id: id, client_secret: secret, redirect_uri: `${siteUrl(c)}/api/auth/google-calendar/callback`, grant_type: 'authorization_code' }),
    })
    const j: any = await r.json()
    if (!r.ok || !j.refresh_token) return c.text(`Token exchange failed: ${j.error || r.status} ${j.error_description || '(no refresh_token returned)'}`, 400)
    if (!c.env.ENCRYPTION_KEY) return c.text('ENCRYPTION_KEY secret missing — cannot store the token safely.', 500)
    await c.env.COMPANIES_KV.put(KV_REFRESH, await deps.encrypt(j.refresh_token, c.env.ENCRYPTION_KEY))
    return c.html('<p style="font-family:sans-serif">Google Calendar connected for the [07] Next Due Dates report. You can close this tab.</p>')
  })
}
