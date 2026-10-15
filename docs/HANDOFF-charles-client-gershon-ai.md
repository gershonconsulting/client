# Charles — 2 steps to finish client.gershon.ai (≈5 min, Cloudflare + LinkedIn dashboards)

Code is shipped (LinkedIn sign-in + Users panel + new icon). Two dashboard steps remain
that Claude is not allowed to do (DNS change, typing a secret).

## ❌ 1. DNS record for client.gershon.ai
Cloudflare → account Oattia@gmail.com → gershon.ai → DNS → Records → **Add record**
- Type **CNAME** · Name **client** · Target **gershoncrm-client.pages.dev** · Proxied (orange) · Save
(Same as the existing task / social records.) The Pages custom domain is already attached
and waits for this record: Workers & Pages → gershoncrm-client → Custom domains → client.gershon.ai
should turn **Active** within a few minutes.

## ❌ 2. LinkedIn secret on the Pages project
- LinkedIn developers → app **Client** (id 78up2kwkdki2kh) → Auth → copy the **Primary Client Secret**
- Cloudflare → Workers & Pages → **gershoncrm-client** → Settings → Variables and Secrets →
  Production → Add → type **Secret** · name **LINKEDIN_CLIENT_SECRET** · paste · Save
- Then Deployments → latest → **Retry deployment** (secrets reach the next deployment only).

## Test
- https://client.gershon.ai/api/auth/linkedin/health → `"clientSecretConfigured": true`
- https://client.gershon.ai/login → blue "Sign in with LinkedIn" → lands on /dashboard
