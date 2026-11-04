/**
 * client.gershoncrm.com report schedule — Cloudflare Worker "gershon-client-cron".
 * Replaces Claude scheduled tasks #24 and #07. Calls the app's own routes:
 *   • Mon 09:05 UTC → POST /api/reports/weekly/send  {"period":"lastWeek"}   (#24)
 *   • Mon 13:10 UTC → POST /api/reports/next-due/send                       (#07)
 * Both routes keep a once-per-New-York-day sent-log, so a retry never double-sends.
 * Secret binding REPORT_CRON_KEY must equal the Pages project's REPORT_CRON_KEY.
 */
const BASE = "https://client.gershoncrm.com";

const JOBS = {
  "5 9 * * 1": { path: "/api/reports/weekly/send", body: { period: "lastWeek" } },
  "10 13 * * 1": { path: "/api/reports/next-due/send", body: {} },
};

async function call(job, env) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(BASE + job.path, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.REPORT_CRON_KEY || ""}` },
        body: JSON.stringify(job.body),
      });
      const text = await r.text();
      console.log(job.path, "attempt", attempt, r.status, text.slice(0, 500));
      if (r.ok || r.status === 401) return;
    } catch (e) {
      console.log(job.path, "attempt", attempt, "error", String(e));
    }
    await new Promise((res) => setTimeout(res, 20000 * attempt));
  }
}

export default {
  async scheduled(event, env, ctx) {
    const job = JOBS[event.cron];
    if (job) ctx.waitUntil(call(job, env));
    else console.log("no job for cron", event.cron);
  },
  async fetch() {
    return new Response("client.gershoncrm.com schedule: #24 weekly Mon 09:05 UTC, #07 next due dates Mon 13:10 UTC", { status: 200 });
  },
};
