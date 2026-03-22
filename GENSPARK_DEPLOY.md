# Genspark Hosted Deploy Instructions

## Repository
- **GitHub**: https://github.com/gershonconsulting/client
- **Branch**: main
- **Latest Commit**: 30e6e02

## Deployment Configuration

### Build Command
```bash
npm install
```
**Note**: Build is already completed. The `dist/` folder contains pre-built files.

### Start Command
```bash
npm start
```
*(This runs `node server.js` which sets the correct working directory)*

### Required Files (all in repo)
- ✅ `server.js` - Entry point with working directory setup
- ✅ `dist/index.js` - Built application (193.54 kB)
- ✅ `dist/static/style.css` - Static CSS
- ✅ `public/static/style.css` - Source static files
- ✅ `package.json` - Dependencies and scripts
- ✅ `src/index.tsx` - TypeScript source (for future builds)

### Environment Variables
None required - all configuration is embedded in the code.

### Port
The application listens on port 3000 by default.
Genspark will automatically map this to your domain.

## Verification Steps

### 1. Test Endpoints
After deployment, verify these URLs:
- **Dashboard**: https://client.gershoncrm.com/
- **Admin Panel**: https://client.gershoncrm.com/admin
- **API**: https://client.gershoncrm.com/api/companies
- **Static Files**: https://client.gershoncrm.com/static/style.css

### 2. Expected Responses
- `/` - Returns HTML dashboard (HTTP 200)
- `/admin` - Returns HTML admin panel (HTTP 200)
- `/api/companies` - Returns JSON with `{"count": 10, "companies": [...]}`
- `/static/style.css` - Returns CSS file (HTTP 200)

## Troubleshooting

### Error 1101 or "Worker threw exception"
**Cause**: Application crashed on startup
**Solution**: Check that:
1. `npm install` completed successfully
2. `node_modules/@hono/node-server` exists
3. `dist/index.js` exists
4. `public/static/` directory exists

### 404 on static files
**Cause**: Working directory is incorrect
**Solution**: Ensure you're using `npm start` (which runs `node server.js`), not `node dist/index.js` directly.

### Missing companies or API errors
**Cause**: COMPANIES object not loaded
**Solution**: Check that `dist/index.js` contains the COMPANIES object with all 10 companies.

## Architecture Notes

### Pure Node.js Implementation
This application is built for **Node.js environments only**. It does NOT use:
- ❌ Cloudflare Workers
- ❌ Cloudflare D1 Database
- ❌ Cloudflare KV Storage
- ❌ Cloudflare Pages Functions

### Data Storage
Companies are stored in an **in-memory JavaScript object** in `dist/index.js`.
Changes to companies will persist only for the current session.

### Dependencies
```json
{
  "@hono/node-server": "^1.19.11",
  "hono": "^4.11.3"
}
```
**No build dependencies required** - all files are pre-built.

## Deployment Checklist

- [x] Repository URL configured
- [x] Build command: `npm install && npm run build`
- [x] Start command: `npm start`
- [x] All required files in repo
- [x] Local testing passed
- [x] GitHub pushed
- [ ] Deploy on Genspark
- [ ] Verify all endpoints
- [ ] Test company CRUD operations

## Support Information

**Project**: Gershon CRM Client Dashboard v1.0.0
**Deployment Platform**: Genspark Hosted Deploy (Node.js)
**Tech Stack**: Hono + Node.js + Vanilla JavaScript + TailwindCSS
**Last Updated**: March 22, 2026
**Git Commit**: 78b9302
