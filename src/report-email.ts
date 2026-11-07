// ─────────────────────────────────────────────────────────────────────────────
// Weekly / monthly portfolio report e-mail — house style + "GC" sender
// (2026-10-23 nightly).
//
// WHAT IT FIXES (Resend audit, last 7 days):
//   • The "🔴 Weekly Report — …" e-mail (POST /api/reports/weekly/send, and the
//     monthly twin) was sent as "GershonCRM Reports" with an indigo header and
//     white text. Rule: Gershon-internal reports use a display name starting
//     with "GC " → "GC Client Report". The ADDRESS and the recipients are kept.
//   • House style: white page, single column, max-width 680px, dark text
//     #12211d, links #1f6f5c, brand red #CC3333 as the accent line, never light
//     text on a dark band, one-line "Source: … · Data as of …" footer.
//   • Promote "0 followers · +0": social.gershon.ai holds no follower snapshot
//     for these clients (the Chrome extension collects posts, not follower
//     counts), so the e-mail now says "— not collected" instead of a fake 0.
//
// WHY IT IS DONE HERE AND NOT IN src/index.tsx:
//   The template (generateComprehensiveReportHtml) and the send handlers live
//   in src/index.tsx, which is 470 KB — too big for the GitHub API the nightly
//   agent can write with, and plain `git push` is blocked from its machine. So
//   this module re-dresses the finished e-mail at the last moment, just before
//   it goes to Resend. It is deliberately narrow:
//     - only POST https://api.resend.com/emails,
//     - only when the subject is "<emoji> Weekly Report — …" / "Monthly Report — …"
//       AND the html carries the legacy header "Gershon.AI · Promote · Network · Engage",
//     - every rewrite is a plain string replacement; if the template changes and a
//       pattern no longer matches, that part is simply left as it was (the e-mail
//       still goes out), and any error falls back to the untouched request.
//   PROPER FIX LATER (anyone with git access, ~15 min): apply the same styles in
//   generateComprehensiveReportHtml() + use reportFrom() below in the two send
//   handlers in src/index.tsx, then delete installReportEmailStyle().
// ─────────────────────────────────────────────────────────────────────────────

export const REPORT_FROM_NAME = 'GC Client Report'
const INK = '#12211d'
const LINK = '#1f6f5c'
const RED = '#CC3333'

/** "Anything <addr>" or "addr" → "GC Client Report <addr>" (address unchanged). */
export function reportFrom(from: string): string {
  const raw = String(from || '').trim()
  const m = raw.match(/<([^>]+)>/)
  const addr = (m ? m[1] : raw).trim()
  if (!addr) return raw
  const name = m ? raw.slice(0, raw.indexOf('<')).replace(/"/g, '').trim() : ''
  if (/^GC\s/.test(name)) return raw
  return `${REPORT_FROM_NAME} <${addr}>`
}

const SUBJECT_RE = /(^|\s)(Weekly|Monthly) Report — /
const MARKER = 'Gershon.AI · Promote · Network · Engage'

export function isLegacyPortfolioReport(payload: any): boolean {
  return !!payload && typeof payload.subject === 'string' && SUBJECT_RE.test(payload.subject) &&
    typeof payload.html === 'string' && payload.html.includes(MARKER)
}

/** Re-dress the legacy portfolio report HTML in the report house style. Pure. */
export function restyleLegacyReportHtml(html: string, asOf: Date = new Date()): string {
  let h = html
  const rep = (a: string | RegExp, b: string) => { h = h.split(a as any).join(b) }
  const asOfTxt = asOf.toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' })

  // Page: white, 680px, dark text.
  rep('<body style="margin:0;padding:0;background:#f1f5f9;', '<body style="margin:0;padding:0;background:#ffffff;')
  h = h.replace(/(<body style="[^"]*?)color:#1e293b;/, `$1color:${INK};`)
  rep('max-width:960px;margin:0 auto;padding:20px 16px 40px;', 'max-width:680px;margin:0 auto;padding:0 16px 32px;background:#ffffff;')

  // Header: indigo gradient + white text → red accent line + light header.
  rep('<div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);border-radius:14px;padding:26px 28px;color:#fff;">',
    `<div style="height:4px;background:${RED};line-height:4px;font-size:0;">&nbsp;</div>\n  <div style="padding:20px 0 16px;border-bottom:1px solid #e5e7eb;margin-bottom:6px;color:${INK};">`)
  rep(`<div style="font-size:12px;color:rgba(255,255,255,.75);letter-spacing:2px;text-transform:uppercase;">${MARKER}</div>`,
    `<div style="font-size:11px;color:${RED};letter-spacing:2px;text-transform:uppercase;font-weight:700;">GC Client Report · Promote · Network · Engage</div>`)
  rep('<h1 style="margin:6px 0 2px;font-size:24px;font-weight:800;">', `<h1 style="margin:6px 0 2px;font-size:23px;font-weight:800;color:${INK};">`)
  rep('<div style="font-size:13px;color:rgba(255,255,255,.85);">', '<div style="font-size:13px;color:#4b5563;">')

  // Single column: the three channel panels of each client are stacked.
  rep('<td valign="top" style="width:33.33%;background:#fff;border:1px solid #e2e8f0;border-radius:8px;">',
    '<td valign="top" style="display:block;width:auto;background:#fff;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 8px;">')
  rep('<td style="width:10px;"></td>', '<td style="display:block;height:0;"></td>')
  // Portfolio score cards stay three across (short numbers), squarer and lighter.
  rep('style="width:33.33%;padding:14px 12px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;"',
    'style="width:33.33%;padding:12px 10px;background:#fff;border:1px solid #e5e7eb;"')
  rep('border-spacing:10px 14px;margin:2px 0 6px;', 'border-spacing:0;margin:12px 0 6px;table-layout:fixed;')

  // Indigo / cyan brand accents → dark text; client badges → red tint.
  rep('background:#eef2ff;color:#4f46e5;', 'background:#fdf2f2;color:#a8281f;')
  rep('color:#6366f1;', `color:${INK};`)
  rep('color:#0ea5e9;', `color:${INK};`)
  rep('color:#1e293b;', `color:${INK};`)
  rep('color:#7c3aed;', `color:${INK};`)
  rep('color:#8b5cf6;', `color:${INK};`)
  rep('<div style="font-size:10px;color:#94a3b8;margin-top:1px;">likes+comments+shares</div>',
    '<div style="font-size:10px;color:#94a3b8;margin-top:1px;">likes · comments · shares</div>')

  // Promote followers: "0 · +0 last 7d" means no follower snapshot exists → say so.
  h = h.replace(
    /(<div style="font-size:19px;font-weight:800;color:[^;"]+;line-height:1\.1;">)0(<\/div>\s*<div[^>]*>Followers<\/div>\s*<div[^>]*>)\+0 last (?:7|30)d(<\/div>)/g,
    '$1—$2not collected$3',
  )

  // Footer → one-line provenance.
  h = h.replace(
    /<div style="text-align:center;padding:24px 0 0;font-size:11px;color:#94a3b8;">[\s\S]*?<\/div>(\s*<\/div><\/body>)/,
    `<div style="border-top:1px solid #e5e7eb;margin-top:8px;padding:14px 0 0;font-size:11px;line-height:1.5;color:#64748b;">` +
      `Source: <a href="https://client.gershoncrm.com" style="color:${LINK};">client.gershoncrm.com</a> — Promote (social.gershon.ai) · Network (Straight-in) · Engage (Streak CRM) · Data as of ${asOfTxt} ET` +
      `</div>$1`,
  )
  return h
}

/** Rewrite one Resend payload (object). Returns the same object when it is not the legacy report. */
export function restylePayload(payload: any, asOf: Date = new Date()): any {
  if (!isLegacyPortfolioReport(payload)) return payload
  return { ...payload, from: reportFrom(payload.from), html: restyleLegacyReportHtml(payload.html, asOf) }
}

/**
 * Wrap fetch once per isolate. Only the legacy portfolio report request to
 * Resend is touched; everything else passes straight through.
 */
export function installReportEmailStyle(): void {
  const g = globalThis as any
  if (g.__gcReportEmailStyle || typeof g.fetch !== 'function') return
  g.__gcReportEmailStyle = true
  const original = g.fetch.bind(g)
  g.fetch = function (input: any, init?: any) {
    try {
      const url = typeof input === 'string' ? input : (input && input.url) || ''
      if (url === 'https://api.resend.com/emails' && init && typeof init.body === 'string' && init.body.includes(MARKER)) {
        const payload = JSON.parse(init.body)
        if (isLegacyPortfolioReport(payload)) {
          init = { ...init, body: JSON.stringify(restylePayload(payload)) }
        }
      }
    } catch {
      /* never block a send because of styling */
    }
    return original(input, init)
  }
}

installReportEmailStyle()
