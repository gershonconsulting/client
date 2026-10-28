// ─────────────────────────────────────────────────────────────────────────────
// POST /api/matrix-stats — read-only feed for the weekly "Client Platform Matrix"
// email (Supabase edge function `client-platform-matrix` in task.gershoncrm.com,
// column key `client`). Same contract as social.gershon.ai, linalysis.net,
// nexashare.com and pulse.gershoncrm.com:
//
//   Request : {"secret":"…","people":[{"key":"…","company":"…","emails":["a@b.com"]}]}
//             (the secret may also be sent as `Authorization: Bearer <secret>`)
//   Auth    : SHA-256 hex of the secret must equal MATRIX_SECRET_SHA256. Only the hash
//             lives here; the plain value is cc_health_config.matrix_stats_secret in the
//             task project. Mismatch -> 401 {"ok":false}. No new Pages secret is needed.
//   Response: {"ok":true,"platform":"client","as_of":"<ISO>","results":[{"key","ok","note"}]}
//
// Matching: the person's company is matched to CLIENT_REGISTRY (the Gershon client
// numbers: 175 Finance Montreal, 200 MAbSilico, 212 Wallix, 229 Altavia, 233 Valos,
// 245 PhiTech, 246 Enzymicals AG, 247 Flying Secoya, 248 Meteor Biotech, 250 Amphasys)
// by name (case/accents/legal suffixes ignored) or by company key.
// ok   = the company has a Gershon client number on this platform.
// note = "#<no>" + the score of the month when a month record is already cached in KV
//        (v3:cm6:<month>:<no>, this month first, then last month); "lost client" for
//        RECYCLED_KEYS; "no client no." when unmatched.
// Reads KV only (two GETs per client at most) — never computes, never writes.
//
// Mounted in src/entry.ts in front of the main app, so the session gate in
// src/index.tsx is not involved and index.tsx is untouched.
// ─────────────────────────────────────────────────────────────────────────────
import { CLIENT_REGISTRY, RECYCLED_KEYS, monthWin, lastFullMonthKey, overallScore, type RegistryEntry, type ClientMonth } from './v3-data'

export const MATRIX_STATS_PATH = '/api/matrix-stats'
const MATRIX_SECRET_SHA256 = '7031a38bde30c34db677585e85f696f51d78cc417e40d38572d20ebeb1c77569'

const SUFFIXES = new Set([
  'ag', 'intl', 'international', 'inc', 'incorporated', 'llc', 'ltd', 'limited', 'gmbh',
  'sa', 'sas', 'sarl', 'sl', 'srl', 'spa', 'bv', 'nv', 'plc', 'corp', 'corporation', 'co',
  'company', 'group', 'holding', 'holdings', 'na', 'usa', 'us', 'the', 'bioinformatics', 'biotech',
])

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function nameTokens(name: string): string[] {
  const t = String(name || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  while (t.length > 1 && SUFFIXES.has(t[t.length - 1])) t.pop()
  while (t.length > 1 && t[0] === 'the') t.shift()
  return t
}

export function namesMatch(a: string[], b: string[]): boolean {
  if (!a.length || !b.length) return false
  const A = a.join(' '), B = b.join(' ')
  if (A === B || A.replace(/ /g, '') === B.replace(/ /g, '')) return true
  const [s, l] = a.length <= b.length ? [a, b] : [b, a]
  if (s.join('').length < 4) return false
  return s.every((w, i) => l[i] === w)
}

const slug = (s: string) => nameTokens(s).join('-')

export type MatchResult = { kind: 'client'; entry: RegistryEntry } | { kind: 'lost' } | null

export function matchCompany(company: string): MatchResult {
  const ct = nameTokens(company)
  if (!ct.length) return null
  const s = slug(company)
  const entry = CLIENT_REGISTRY.find((r) => namesMatch(ct, nameTokens(r.name)) || r.keys.some((k) => k === s || k.startsWith(s + '-')))
  if (entry) return { kind: 'client', entry }
  if (RECYCLED_KEYS.some((k) => k === s || namesMatch(ct, k.split('-')))) return { kind: 'lost' }
  return null
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

export async function handleMatrixStats(request: Request, env: { COMPANIES_KV: KVNamespace }): Promise<Response> {
  if (request.method !== 'POST') return json({ ok: false }, 405)
  let body: any = null
  try { body = await request.json() } catch { body = null }
  const bearer = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  const secret = typeof body?.secret === 'string' && body.secret ? body.secret : bearer
  if (!secret || (await sha256Hex(secret)) !== MATRIX_SECRET_SHA256) return json({ ok: false }, 401)

  try {
    const people: any[] = Array.isArray(body?.people) ? body.people.slice(0, 200) : []
    const months = [monthWin().key, lastFullMonthKey()]
    const cache = new Map<number, Promise<{ month: string; cm: ClientMonth } | null>>()
    const cached = (no: number) => {
      if (!cache.has(no)) {
        cache.set(no, (async () => {
          for (const m of months) {
            try {
              const raw = await env.COMPANIES_KV.get(`v3:cm6:${m}:${no}`)
              if (raw) return { month: m, cm: JSON.parse(raw) as ClientMonth }
            } catch { /* miss */ }
          }
          return null
        })())
      }
      return cache.get(no)!
    }

    const results = []
    for (const p of people) {
      const key = String(p?.key ?? '')
      const m = matchCompany(typeof p?.company === 'string' ? p.company : '')
      if (!m) { results.push({ key, ok: false, note: 'no client no.' }); continue }
      if (m.kind === 'lost') { results.push({ key, ok: false, note: 'lost client' }); continue }
      const c = await cached(m.entry.no)
      let note = `#${m.entry.no}`
      if (c) {
        const score = overallScore(c.cm)
        const mon = monthWin(c.month).short.slice(0, 3)
        note += score == null ? ` · no data ${mon}` : ` · score ${score}% ${mon}`
      }
      results.push({ key, ok: true, note })
    }
    return json({ ok: true, platform: 'client', as_of: new Date().toISOString(), results })
  } catch (e) {
    console.error('matrix-stats failed', { message: (e as Error)?.message })
    return json({ ok: false }, 500)
  }
}
