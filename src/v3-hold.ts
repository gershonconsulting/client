// ─────────────────────────────────────────────────────────────────────────────
// Block automatic report sending (Olivier, 2026-11-06: "I need to be able to block
// sending automatically a monthly report!").
//
//   /delivery/blocks           signed-in page: pause ALL automatic sends, block the
//                              monthly Straight-in report, block any client's report
//   KV v3:auto-send-paused     everything automatic stops (1st-of-month run + first-Friday delivery)
//   KV v3:auto-hold:<id>       id = client number, or 'straightin'. Stays until unblocked.
//
// Enforced by a middleware in front of the scheduled endpoints, so a blocked report is
// never sent whatever the validation status, even with force=1. Manual sends from the
// Reports page are not affected. /delivery and the validation pages show BLOCKED rows.
// ─────────────────────────────────────────────────────────────────────────────
import type { Hono } from 'hono'
import { CLIENT_REGISTRY, todayNY } from './v3-data'
import { upcomingReportMonth } from './v3-approval'

const PAUSE = 'v3:auto-send-paused'
const holdKey = (id: string) => `v3:auto-hold:${id}`
const TTL = 60 * 60 * 24 * 400
const esc = (s: any) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const nyStamp = () => new Date().toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' ET'

export interface HoldState { paused: string | null; holds: Record<string, string> }
export async function holdState(kv: KVNamespace): Promise<HoldState> {
  const ids = ['straightin', ...CLIENT_REGISTRY.map(r => String(r.no))]
  const [paused, ...vals] = await Promise.all([kv.get(PAUSE), ...ids.map(id => kv.get(holdKey(id)))])
  const holds: Record<string, string> = {}
  ids.forEach((id, i) => { if (vals[i]) holds[id] = vals[i] as string })
  return { paused, holds }
}

function markRows(html: string, st: HoldState): string {
  return html.replace(/<tr style="border-top:1px solid #e5e7eb;vertical-align:top">[\s\S]*?<\/tr>/g, row => {
    const m = row.match(/<b>#(\d+) /)
    if (!m || !(st.paused || st.holds[m[1]])) return row
    return row
      .replace('<span style="color:#057642;font-weight:800">● Ready — goes out Friday</span>', '<span style="color:#b91c1c;font-weight:800">⛔ BLOCKED — will not be sent</span>')
      .replace('✖ Will NOT be sent</span>', '✖ Will NOT be sent — ⛔ BLOCKED</span>')
  })
}
function banner(st: HoldState): string {
  const blocked = Object.keys(st.holds).map(id => id === 'straightin' ? 'Straight-in monthly report' : `#${id} ${CLIENT_REGISTRY.find(r => String(r.no) === id)?.name || ''}`)
  const line = st.paused
    ? `<b style="color:#b91c1c">⛔ ALL automatic sending is paused</b> <span style="color:#6e6e73">(${esc(st.paused)})</span>`
    : blocked.length ? `<b style="color:#b91c1c">⛔ Blocked:</b> ${esc(blocked.join(' · '))}` : `<span style="color:#057642;font-weight:700">● Automatic sending is on</span>`
  return `<div style="background:#fff;border:1px solid ${st.paused || blocked.length ? '#b91c1c' : '#e5e7eb'};border-radius:12px;padding:12px 16px;margin:0 0 14px;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div>${line}</div><a href="/delivery/blocks" style="background:#CC3333;color:#fff;text-decoration:none;border-radius:999px;padding:8px 16px;font-weight:800;font-size:13px">⛔ Block / unblock sending</a></div>`
}
async function rewrite(c: any, st: HoldState, anchor: string) {
  const ct = c.res.headers.get('content-type') || ''
  if (!ct.includes('text/html')) return
  let html = await c.res.text()
  html = markRows(html, st)
  const i = html.indexOf(anchor)
  if (i >= 0) html = html.slice(0, i) + banner(st) + html.slice(i)
  const h = new Headers(c.res.headers); h.delete('content-length')
  c.res = new Response(html, { status: c.res.status, headers: h })
}

export function registerHold(app: Hono<any>) {
  // ── Gate in front of every scheduled send ──────────────────────────────────
  app.use('/api/v3/monthly/*', async (c, next) => {
    if (c.req.method !== 'POST') return next()
    const path = new URL(c.req.url).pathname
    if (path !== '/api/v3/monthly/deliver' && path !== '/api/v3/monthly/run') return next()
    const kv = c.env.COMPANIES_KV as KVNamespace
    const paused = await kv.get(PAUSE)
    if (path === '/api/v3/monthly/deliver') {
      const no = String(c.req.query('no') || '')
      const held = paused || (no ? await kv.get(holdKey(no)) : null)
      if (held) {
        const month = /^\d{4}-\d{2}$/.test(c.req.query('month') || '') ? c.req.query('month')! : upcomingReportMonth(todayNY())
        const reason = paused ? `automatic sending paused (${paused})` : `blocked (${held})`
        if (no) await kv.put(`v3:delivery-block:${month}:${no}`, reason, { expirationTtl: TTL })
        return c.json({ ok: true, sent: false, skipped: true, blocked: true, no, reason })
      }
    } else {
      const part = String(c.req.query('part') || '')
      const held = paused || (part === 'straightin' ? await kv.get(holdKey('straightin')) : null)
      if (held) return c.json({ ok: true, skipped: true, blocked: true, reason: paused ? `automatic sending paused (${paused})` : `blocked (${held})` })
    }
    return next()
  })

  // ── Show the blocks on the delivery + validation pages ─────────────────────
  app.use('/delivery', async (c, next) => { await next(); if (c.req.method === 'GET') await rewrite(c, await holdState(c.env.COMPANIES_KV), '<div class="card" style="overflow:auto">') })
  app.use('/approve/*', async (c, next) => { await next(); if (c.req.method === 'GET') await rewrite(c, await holdState(c.env.COMPANIES_KV), '<form method="post">') })

  // ── The control page ───────────────────────────────────────────────────────
  const page = (st: HoldState, msg: string) => {
    const btn = (id: string, on: boolean) => `<form method="post" style="margin:0"><input type="hidden" name="id" value="${esc(id)}"><input type="hidden" name="on" value="${on ? '0' : '1'}"><button type="submit" style="border:0;border-radius:999px;padding:8px 16px;font-weight:800;cursor:pointer;${on ? 'background:#057642;color:#fff' : 'background:#CC3333;color:#fff'}">${on ? 'Unblock' : '⛔ Block'}</button></form>`
    const row = (label: string, sub: string, id: string) => {
      const on = !!st.holds[id] || (id === 'all' && !!st.paused)
      const status = id === 'all' ? (st.paused ? `<b style="color:#b91c1c">⛔ PAUSED</b> <span style="color:#6e6e73;font-size:12px">${esc(st.paused)}</span>` : '<b style="color:#057642">● On</b>')
        : on ? `<b style="color:#b91c1c">⛔ BLOCKED</b> <span style="color:#6e6e73;font-size:12px">${esc(st.holds[id])}</span>` : st.paused ? '<span style="color:#b76b00;font-weight:700">Paused (global)</span>' : '<span style="color:#057642;font-weight:700">● Sends automatically</span>'
      return `<tr style="border-top:1px solid #e5e7eb"><td style="padding:12px 10px"><b>${esc(label)}</b><div style="font-size:12px;color:#6e6e73">${esc(sub)}</div></td><td style="padding:12px 10px">${status}</td><td style="padding:12px 10px;text-align:right">${btn(id, on)}</td></tr>`
    }
    const rows = [
      row('ALL automatic sending', 'Stops the 1st-of-month emails and the first-Friday client delivery', 'all'),
      row('Straight-in monthly report', 'Provider report sent on the 1st', 'straightin'),
      ...CLIENT_REGISTRY.map(r => row(`#${r.no} ${r.name}`, 'Client monthly report — first-Friday delivery', String(r.no))),
    ].join('')
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Block automatic sending · Gershon</title><link rel="icon" type="image/svg+xml" href="/static/clients-icon.svg"><link rel="stylesheet" href="/static/gershon.css?v=5"></head>
<body style="background:#f6f6f7"><div style="max-width:900px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,Segoe UI,sans-serif">
<div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:900;color:#CC3333;letter-spacing:.04em">GERSHON · CLIENT REPORTS</div><a href="/delivery" style="color:#CC3333;font-weight:700">← Client delivery</a></div>
<h1 style="margin:6px 0 4px">Block automatic sending</h1>
<p style="color:#444;margin:0 0 14px">A blocked report is <b>never sent automatically</b>, even if it was validated, until you unblock it. Sending a report by hand from the Reports page still works.</p>
${msg ? `<div style="background:#ecfdf3;border:1px solid #057642;color:#057642;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-weight:700">${esc(msg)}</div>` : ''}
<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:auto"><table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table></div>
</div></body></html>`
  }
  const who = (c: any) => String(c.get('authUser' as never) || '')
  app.get('/delivery/blocks', async (c) => {
    if (!who(c)) return c.redirect('/', 302)
    return c.html(page(await holdState(c.env.COMPANIES_KV), c.req.query('saved') ? 'Saved.' : ''))
  })
  app.post('/delivery/blocks', async (c) => {
    const u = who(c)
    if (!u) return c.text('Sign in first.', 401)
    const kv = c.env.COMPANIES_KV as KVNamespace
    const f = await c.req.parseBody()
    const id = String(f['id'] || ''), on = String(f['on'] || '') === '1'
    const valid = id === 'all' || id === 'straightin' || CLIENT_REGISTRY.some(r => String(r.no) === id)
    if (!valid) return c.text('Unknown report.', 400)
    const key = id === 'all' ? PAUSE : holdKey(id)
    if (on) await kv.put(key, `by ${u}, ${nyStamp()}`, { expirationTtl: TTL }); else await kv.delete(key)
    return c.redirect('/delivery/blocks?saved=1', 303)
  })
}
