// Page title consistency (2026-11-06): sibling apps use "<App> by Gershon.AI"
// (e.g. "Task by Gershon.AI"). The landing page title is hard-coded in
// src/index.tsx (renderHomePage, served at "/"); this middleware rewrites it in
// the served HTML so index.tsx does not have to change.
//
// 2026-11-19: also the landing wordmark + a visible footer version line (same
// __APP_VERSION__ as package.json), and the v3 shell title suffix + sidebar wordmark.
//
// Registered from registerHistory(), which registerV3() calls right after its
// theme middleware, so it wraps every page route declared later in index.tsx
// (including "/"). Only HTML responses are read; everything else passes through.
import type { Hono } from 'hono'

declare const __APP_VERSION__: string
const APP_VERSION = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : ''

export const OLD_HOME_TITLE = '<title>client.gershonCRM — Client Performance Dashboard</title>'
export const NEW_HOME_TITLE = '<title>Client by Gershon.AI — Client Performance Dashboard</title>'

const HOME_REWRITES: [string, string][] = [
  [OLD_HOME_TITLE, NEW_HOME_TITLE],
  ['<span class="font-bold tracking-tight">client.gershonCRM</span>', '<span class="font-bold tracking-tight">Client by Gershon.AI</span>'],
  ['>Gershon Consulting — Internal Use Only</p>', '>Client by Gershon.AI · v' + APP_VERSION + ' · Internal use only</p>'],
]
const ALL_REWRITES: [string, string][] = [
  ['<title>Straight-in Week Drop | client.gershonCRM</title>', '<title>Straight-in Week Drop | Client by Gershon.AI</title>'],
  ['<title>Campaign Effectiveness — client.gershonCRM</title>', '<title>Campaign Effectiveness — Client by Gershon.AI</title>'],
  ['<p class="font-bold text-sm leading-tight">client.gershonCRM</p>', '<p class="font-bold text-sm leading-tight">Client by Gershon.AI</p>'],
  ['Collected from social.gershonCRM.com', 'Collected from social.gershoncrm.com'],
  ['Gershon Consulting — client reporting', 'Client reporting'],
  [' · client.gershonCRM</title>', ' · Client by Gershon.AI</title>'],
  ['<span>Gershon<span class="tag">Client results</span></span>', '<span>Client<span class="tag">by Gershon.AI</span></span>'],
]

export function registerPageTitle(app: Hono<any>) {
  app.use('*', async (c, next) => {
    await next()
    const ct = c.res.headers.get('content-type') || ''
    if (!ct.includes('text/html')) return
    const isHome = new URL(c.req.url).pathname === '/'
    let out = await c.res.text()
    for (const [a, b] of (isHome ? HOME_REWRITES.concat(ALL_REWRITES) : ALL_REWRITES)) out = out.split(a).join(b)
    const headers = new Headers(c.res.headers); headers.delete('content-length')
    c.res = new Response(out, { status: c.res.status, headers })
  })
}
