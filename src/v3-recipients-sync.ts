// Report recipients → Social / Social Tracking (Olivier, 2026-11-09: "We should be sending the reports
// to the same people we have in client.gershon.ai, for all our clients").
//
// client.gershon.ai stays the ONE place where recipients are kept (Settings → Targets & recipients,
// else the registry default). This pushes every client's professional recipients to the Social API
// (POST /api/report/promote?resource=recipients, same SOCIAL_PROMOTE_KEY as the Promote feed), which
// writes OrgSetting report_email:<socialId>. Social and Social Tracking share that database, so their
// monthly company reports go to exactly these people.
//
// When it runs: after every save on /settings, and daily via .github/workflows/recipients-sync.yml
// (POST /api/v3/recipients/sync — no input, idempotent, returns only counts and client names).
import type { Hono } from 'hono'
import { CLIENT_REGISTRY, readSettings, clientRecipientsOf, type V3Settings } from './v3-data'
import { recipientCheck } from './v3-approval'

const SOCIAL_API = 'https://social.gershon.ai'

export function recipientPayload(s: V3Settings) {
  return CLIENT_REGISTRY.filter(r => r.socialId).map(r => ({
    clientId: r.socialId as string,
    no: r.no,
    name: r.name,
    emails: recipientCheck(clientRecipientsOf(r, s)).pro,
  }))
}

export async function syncRecipientsToSocial(env: any, s?: V3Settings): Promise<{ ok: boolean; status?: number; saved?: number; clients?: Array<{ no: number; name: string; count: number; result: string }>; error?: string }> {
  const key = String(env?.SOCIAL_PROMOTE_KEY || '')
  if (!key) return { ok: false, error: 'SOCIAL_PROMOTE_KEY not configured' }
  const settings = s || await readSettings(env.COMPANIES_KV)
  const list = recipientPayload(settings)
  try {
    const r = await fetch(`${SOCIAL_API}/api/report/promote?resource=recipients`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipients: list.map(x => ({ clientId: x.clientId, emails: x.emails })) }),
    })
    const body = await r.json().catch(() => ({})) as any
    const byId = new Map<string, any>((body?.results || []).map((x: any) => [x.clientId, x]))
    return {
      ok: r.ok && !!body?.success, status: r.status, saved: body?.saved,
      clients: list.map(x => ({ no: x.no, name: x.name, count: x.emails.length, result: byId.get(x.clientId)?.saved ? 'saved' : (byId.get(x.clientId)?.skipped || 'not answered') })),
      error: r.ok ? undefined : String(body?.error || `HTTP ${r.status}`),
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'fetch failed' }
  }
}

export function registerRecipientsSync(app: Hono<any>) {
  // Public (listed in PUBLIC_EXACT_PATHS): takes no input, only re-sends what Settings already holds,
  // and answers with counts — never the addresses themselves.
  app.post('/api/v3/recipients/sync', async (c) => c.json(await syncRecipientsToSocial(c.env)))
}
