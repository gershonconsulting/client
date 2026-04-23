#!/bin/bash
# Automated release script for client.gershonCRM.com
# Called by the Claude Code Stop hook after each session with committed changes.
set -e

cd /home/user/client

# ── 1. Only proceed if there are commits since the last release tag ────────────
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -n "$LAST_TAG" ]; then
  COMMITS_SINCE=$(git log "${LAST_TAG}..HEAD" --oneline 2>/dev/null | wc -l | tr -d ' ')
  if [ "$COMMITS_SINCE" -eq 0 ]; then
    exit 0  # Nothing new — skip silently
  fi
fi

# ── 2. Capture the current (previous) version ─────────────────────────────────
PREV_VERSION=$(node -p "require('./package.json').version")

# ── 3. Tag the previous version as a backup BEFORE bumping ────────────────────
git tag -a "v${PREV_VERSION}" -m "Backup: v${PREV_VERSION} before release" 2>/dev/null || \
  git tag -f "v${PREV_VERSION}" -m "Backup: v${PREV_VERSION} before release"

# ── 4. Bump patch version in package.json (e.g. 1.1.7 → 1.1.8) ───────────────
npm version patch --no-git-tag-version --silent
NEW_VERSION=$(node -p "require('./package.json').version")

# ── 5. Rebuild — injects __APP_VERSION__ into homepage ────────────────────────
npm run build --silent

# ── 6. Commit the version bump + new dist ─────────────────────────────────────
git add package.json package-lock.json dist/_worker.js
git commit -m "Release v${NEW_VERSION} — client.gershonCRM.com"

# ── 7. Tag the new release ────────────────────────────────────────────────────
git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}"

# ── 8. Push branch + both tags to GitHub ─────────────────────────────────────
git push -u origin HEAD
git push origin "v${PREV_VERSION}" --force 2>/dev/null || true
git push origin "v${NEW_VERSION}" 2>/dev/null || true

# ── 9. Deploy to Cloudflare Pages (client.gershonCRM.com) ────────────────────
DEPLOY_OUT=""
if command -v wrangler &>/dev/null || [ -f ./node_modules/.bin/wrangler ]; then
  DEPLOY_OUT=$(./node_modules/.bin/wrangler pages deploy dist \
    --project-name gershon-client 2>&1) && \
    DEPLOY_STATUS="deployed to client.gershoncrm.com" || \
    DEPLOY_STATUS="deploy failed — run: npm run deploy"
else
  DEPLOY_STATUS="wrangler not found — run: npm run deploy"
fi

# ── 10. Report back to Claude UI ──────────────────────────────────────────────
echo "{\"systemMessage\": \"v${PREV_VERSION} → v${NEW_VERSION} released. Backup tag v${PREV_VERSION} saved. ${DEPLOY_STATUS}.\"}"
