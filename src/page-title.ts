// Page title consistency (2026-11-06): sibling apps use "<App> by Gershon.AI"
// (e.g. "Task by Gershon.AI"). The landing page title is hard-coded in
// src/index.tsx (renderHomePage, served at "/"); this middleware rewrites it in
// the served HTML so index.tsx does not have to change.
//
// Registered from registerHistory(), which registerV3() calls right after its
// theme middleware, so it wraps every page route declared later in index.tsx
// (including "/"). Only HTML responses for "/" are read; everything else passes
// through untouched.
import type { Hono } from 'hono'

export const OLD_HOME_TITLE = '<title>client.gershonCRM — Client Performance Dashboard</title>'
export const NEW_HOME_TITLE = '<title>Client by Gershon.AI — Client Performance Dashboard</title>'

export function registerPageTitle(app: Hono<any>) {
  app.use('*', async (c, next) => {
    await next()
    if (new URL(c.req.url).pathname !== '/') return
    const ct = c.res.headers.get('content-type') || ''
    if (!ct.includes('text/html')) return
    const html = await c.res.text()
    const out = html.replace(OLD_HOME_TITLE, NEW_HOME_TITLE)
    const headers = new Headers(c.res.headers); headers.delete('content-length')
    c.res = new Response(out, { status: c.res.status, headers })
  })
}
