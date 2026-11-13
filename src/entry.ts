// Build entry (vite.config.ts -> pages({ entry })). Puts the read-only Client Platform
// Matrix feed (POST /api/matrix-stats, see src/matrix-stats.ts) in front of the main app,
// so src/index.tsx and its session gate stay untouched. Everything else goes to the app.
import { Hono } from 'hono'
import app from './index'
import { MATRIX_STATS_PATH, handleMatrixStats } from './matrix-stats'

const root = new Hono<{ Bindings: { COMPANIES_KV: KVNamespace } }>()
root.all(MATRIX_STATS_PATH, (c) => handleMatrixStats(c.req.raw, c.env))
root.route('/', app)

export default root
