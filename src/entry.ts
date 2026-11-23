// Build entry (vite.config.ts -> pages({ entry })). Puts the read-only Client Platform
// Matrix feed (POST /api/matrix-stats, see src/matrix-stats.ts) in front of the main app,
// so src/index.tsx and its session gate stay untouched. Everything else goes to the app.
import { Hono } from 'hono'
import app from './index'
import { MATRIX_STATS_PATH, handleMatrixStats } from './matrix-stats'
import { PW_EYE_JS } from './pw-eye'

const root = new Hono<{ Bindings: { COMPANIES_KV: KVNamespace } }>()
root.all(MATRIX_STATS_PATH, (c) => handleMatrixStats(c.req.raw, c.env))

// 2026-11-19: /login is declared in index.tsx before the page-title middleware, so it is
// renamed here ("Client by Gershon.AI"), text only; the login flow is untouched.
declare const __APP_VERSION__: string
const LOGIN_VERSION = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : ''
const LOGIN_REWRITES: [string, string][] = [
  ['<title>Sign in — client.gershonCRM</title>', '<title>Client by Gershon.AI</title>'],
  ['letter-spacing:-.02em;line-height:1">Gershon</div>', 'letter-spacing:-.02em;line-height:1">Client</div>'],
  ['text-transform:uppercase">Client results</div>', 'text-transform:uppercase">by Gershon.AI</div>'],
  ['>Gershon Consulting — internal use only</p>', '>Client by Gershon.AI · v' + LOGIN_VERSION + ' · Internal use only</p>'],
]
root.use('/login', async (c, next) => {
  await next()
  if (c.req.method !== 'GET' || !(c.res.headers.get('content-type') || '').includes('text/html')) return
  let out = await c.res.text()
  for (const [a, b] of LOGIN_REWRITES) out = out.split(a).join(b)
  out = out.replace('</body>', '<script>' + PW_EYE_JS + '</script></body>') // 2026-11-23 show/hide password eye
  const headers = new Headers(c.res.headers); headers.delete('content-length')
  c.res = new Response(out, { status: c.res.status, headers })
})
root.route('/', app)

export default root
