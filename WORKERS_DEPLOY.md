# ⚡ CLOUDFLARE WORKERS DEPLOYMENT

## Critical Discovery

**Genspark "Hosted Deploy" uses Cloudflare Workers for Platform, NOT Node.js!**

The deployment logs show:
```
📤 Deploying to Cloudflare Workers for Platform...
📤 Dispatch Namespace: user_website
📤 Using entry point: ./dist/index.js
```

## Fixed Configuration

### Repository
```
https://github.com/gershonconsulting/client
```

### Entry Point
Genspark will automatically detect and use: `dist/_worker.js`

### Build Files
- `dist/_worker.js` - Cloudflare Workers entry point (200 KB)
- `dist/_routes.json` - Routing configuration
- No Node.js dependencies required!

### What Changed
1. ✅ Removed `@hono/node-server` (Node.js-only)
2. ✅ Removed `serveStatic` (doesn't work in Workers)
3. ✅ Removed `server.js` wrapper (not needed)
4. ✅ Built with Hono Vite Cloudflare Pages plugin
5. ✅ Output: `dist/_worker.js` for Workers runtime

### Static Files
Static files are now embedded in the worker bundle.
CSS is inlined in the HTML responses.

## Deploy Now

Just redeploy on Genspark - it will automatically:
1. Find `wrangler.jsonc`
2. Install dependencies
3. Use `dist/_worker.js` as entry point
4. Deploy to Workers for Platform

## Test After Deploy

```bash
curl https://client.gershoncrm.com/api/companies
```

Should return JSON with 10 companies.

---

**Latest Commit**: aa1825d
**Last Updated**: March 22, 2026
