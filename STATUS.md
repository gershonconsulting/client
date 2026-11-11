# client.gershon.ai — status
Last updated: 2026-11-10

## Current state
- Hono on Cloudflare Pages (project gershoncrm-client), domains client.gershon.ai / client.gershoncrm.com.
- Leads per client = boxes in each client's Streak "– LG" pipeline (COMPANIES + COMPANIES_KV).
- Deploy route: merge to main → GitHub Actions builds and deploys (CI bumps the patch version).

## ✅ Done
- ✅ 2026-11-10: POST /api/machine/leads — read-only lead counts per client (total, week, previous week, last 30 days, months, average per month) for health.gershon.ai's Business tab. Auth = SHA-256 of the client-platform-matrix secret; no new secret.

## ❌ Open
- ❌ Unified design PR (nightly/2026-11-04-client-rebuilt) awaiting merge.
- ❌ DNS CNAME client.gershon.ai + LINKEDIN_CLIENT_SECRET (see HANDOFF.txt).
- ❌ Roles: team vs admin stored but not enforced.

## Known issues
- `tsc --noEmit` reports pre-existing type errors (KVNamespace types, COMPANIES indexing); `vite build` passes.
