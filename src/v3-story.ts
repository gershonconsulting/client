// ─────────────────────────────────────────────────────────────────────────────
// Interactive client report ("story") — the web version of the monthly client
// report. Always positive on the campaign's actions: what we did, what it built,
// what it is turning into. Every number comes from the same ClientMonth record
// as the email/PDF; nothing is invented, negative comparisons are simply left out.
//
//   GET /r/:no/:month/:sig      public, HMAC-signed link sent to the client
//   GET /client/:no/story       signed-in shortcut → redirects to the signed link
// Charts: Chart.js 4 (CDN). Palette validated with the dataviz validator
// (light surface): red #CC3333 · blue #4A7BC0 · gold #B88300 — all checks PASS.
// ─────────────────────────────────────────────────────────────────────────────
import type { ClientMonth } from './v3-data'
import type { MonthPoint } from './history-model'
import { HISTORY_BENCHMARKS as B } from './history-benchmarks'

const RED = '#CC3333', BLUE = '#4A7BC0', GOLD = '#B88300', INK = '#1d1d1f', MUT = '#6e6e73'
const esc = (s: any) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const fmt = (n: number | null | undefined) => (n == null ? '—' : Math.round(n).toLocaleString('en-US'))
const plural = (n: number, w: string, pl?: string) => `${fmt(n)} ${Math.round(n) === 1 ? w : (pl || w + 's')}`
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const mLabel = (k: string) => `${MONTHS[Number(k.slice(5, 7)) - 1]} ${k.slice(2, 4)}`
const mLong = (k: string) => `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][Number(k.slice(5, 7)) - 1]} ${k.slice(0, 4)}`

// ── Signed links ─────────────────────────────────────────────────────────────
function secretOf(env: any): string {
  return env.REPORT_LINK_SECRET || env.SESSION_SECRET || env.ENCRYPTION_KEY || env.AUTH_PASSWORD_HASH || 'gershon-client-report'
}
export async function reportSig(env: any, no: number | string, month: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secretOf(env)), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`client-report:${no}:${month}`))
  return Array.from(new Uint8Array(sig)).slice(0, 12).map(b => b.toString(16).padStart(2, '0')).join('')
}
export async function reportLink(env: any, origin: string, no: number | string, month: string): Promise<string> {
  return `${origin.replace(/\/$/, '')}/r/${no}/${month}/${await reportSig(env, no, month)}`
}
export async function verifyReportSig(env: any, no: string, month: string, sig: string): Promise<boolean> {
  const want = await reportSig(env, no, month)
  if (want.length !== sig.length) return false
  let d = 0
  for (let i = 0; i < want.length; i++) d |= want.charCodeAt(i) ^ sig.charCodeAt(i)
  return d === 0
}

// ── Story model: actions, insights, series ───────────────────────────────────
export interface StoryHistory { start: string | null; series: MonthPoint[]; next3RunRate: number; basis: string }
export interface Action { icon: string; value: string; label: string; detail: string }
export interface Insight { icon: string; title: string; text: string }

const SENIORITY: [string, RegExp][] = [
  ['C-level & founders', /\b(ceo|cfo|coo|cto|cmo|cio|cso|chief|founder|co-?founder|president|owner|managing director|general manager|partner)\b/i],
  ['VP & Head of', /\b(vp|vice[- ]president|svp|evp|head of|head)\b/i],
  ['Directors', /\b(director|directeur)\b/i],
  ['Managers & leads', /\b(manager|lead|principal|senior)\b/i],
]
export function seniorityOf(title: string): string {
  for (const [k, re] of SENIORITY) if (re.test(title || '')) return k
  return 'Other roles'
}

/** Months up to and including the report month, with data. */
function seriesUpTo(h: StoryHistory | null, month: string): MonthPoint[] {
  return (h?.series || []).filter(p => p.month <= month && (p.sent || p.accepted || p.opportunities))
}

export function actionsOf(c: ClientMonth): Action[] {
  const a: Action[] = []
  const P = c.promote, N = c.network, E = c.engage
  if (N && N.sent > 0) a.push({ icon: 'fa-paper-plane', value: fmt(N.sent), label: 'Personalised invitations', detail: 'sent to targeted US decision-makers' })
  if (N && N.accepted > 0) a.push({ icon: 'fa-user-plus', value: fmt(N.accepted), label: 'New connections', detail: 'decision-makers who accepted' })
  if (N && N.messages > 0) a.push({ icon: 'fa-comments', value: fmt(N.messages), label: 'Personal conversations', detail: 'follow-up messages written and sent' })
  if (N && N.opportunities > 0) a.push({ icon: 'fa-bullseye', value: fmt(N.opportunities), label: 'Opportunities opened', detail: 'prospects who showed interest' })
  if (P && P.posts > 0) a.push({ icon: 'fa-bullhorn', value: fmt(P.posts), label: 'Posts published', detail: (P.platforms.join(' + ') || 'social') + ' content for your brand' })
  if (P && P.engagement > 0) a.push({ icon: 'fa-heart', value: fmt(P.engagement), label: 'Engagements earned', detail: 'likes, comments and shares' })
  if (E && E.newLeads > 0) a.push({ icon: 'fa-filter', value: fmt(E.newLeads), label: 'Prospects qualified', detail: 'added to your US pipeline' })
  if (E && E.meetings > 0) a.push({ icon: 'fa-handshake', value: fmt(E.meetings), label: 'Moved to meeting', detail: 'prospects advanced this month' })
  if (E && E.activeLeads > 0 && a.length < 8) a.push({ icon: 'fa-briefcase', value: fmt(E.activeLeads), label: 'Active prospects', detail: 'being worked in your pipeline' })
  return a.slice(0, 8)
}

export function insightsOf(c: ClientMonth, h: StoryHistory | null, month: string): Insight[] {
  const out: Insight[] = []
  const P = c.promote, N = c.network, E = c.engage
  const S = seriesUpTo(h, month)
  const totAcc = S.reduce((x, p) => x + p.accepted, 0), totOpp = S.reduce((x, p) => x + p.opportunities, 0), totSent = S.reduce((x, p) => x + p.sent, 0)

  if (S.length >= 2 && totAcc > 0) out.push({ icon: 'fa-chart-line', title: 'A network that keeps compounding',
    text: `Since ${mLong(S[0].month)} your campaign has connected you with ${plural(totAcc, 'US decision-maker')}${totOpp ? ` and opened ${plural(totOpp, 'opportunity', 'opportunities')}` : ''}. Every one of them stays in your network and keeps seeing your name.` })
  if (N && !N.pending && N.sent >= 20 && N.rate >= B.acceptanceRate) out.push({ icon: 'fa-medal', title: 'Your message lands',
    text: `${N.rate}% of invited decision-makers accepted — above the ${B.acceptanceRate}% average across ${B.clientsRun} Gershon campaigns. Your positioning resonates with the US market.` })
  else if (N && N.accepted > 0 && N.sent > 0) out.push({ icon: 'fa-bullseye', title: 'Targeted, not mass',
    text: `Each of the ${fmt(N.sent)} invitations went to a hand-picked profile matching your ideal buyer; ${fmt(N.accepted)} of them chose to connect with you this month.` })
  if (N && N.prevAccepted > 0 && N.accepted > N.prevAccepted) out.push({ icon: 'fa-arrow-trend-up', title: 'Momentum is building',
    text: `${fmt(N.accepted - N.prevAccepted)} more new connections than last month (+${Math.round(((N.accepted - N.prevAccepted) / N.prevAccepted) * 100)}%).` })
  if (N && N.weeks && N.weeks.length > 1) {
    const best = [...N.weeks].sort((a, b) => b.accepted - a.accepted)[0]
    if (best && best.accepted > 0) out.push({ icon: 'fa-calendar-check', title: 'Best week of the month',
      text: `The week of ${best.weekStart.slice(5).replace('-', '/')} brought ${plural(best.accepted, 'new connection')}${best.opportunities ? ` and ${plural(best.opportunities, 'opportunity', 'opportunities')}` : ''}.` })
  }
  if (totOpp > 0 && totAcc > 0 && S.length >= 2) {
    const per = Math.max(1, Math.round(totAcc / totOpp))
    out.push({ icon: 'fa-magnifying-glass-dollar', title: 'Conversion you can count on',
      text: `Historically, about one in every ${per} new connections turns into an opportunity for you — so this month's ${fmt(N?.accepted || 0)} connections are tomorrow's conversations.` })
  }
  const opps = N?.namedOpps || []
  if (opps.length) {
    const sen = opps.filter(o => /C-level|VP/.test(seniorityOf(o.title))).length
    out.push({ icon: 'fa-user-tie', title: 'Senior conversations',
      text: sen ? `${plural(sen, 'opportunity', 'opportunities')} this month ${sen === 1 ? 'is' : 'are'} with C-level or VP-level executives — the people who sign.` : `${plural(opps.length, 'named opportunity', 'named opportunities')} this month, each one a real person at a real company.` })
  }
  if (P && P.posts > 0 && N && N.accepted > 0) out.push({ icon: 'fa-link', title: 'Promote × Network',
    text: `Your ${fmt(N.accepted)} new connections now see your posts in their feed — the ${fmt(P.posts)} posts published this month warm them up before the first conversation.` })
  if (P && P.followersGrowth > 0) out.push({ icon: 'fa-users', title: 'Growing audience',
    text: `${plural(P.followersGrowth, 'new follower')} this month, ${fmt(P.followers)} in total.` })
  if (P?.topPost && P.topPost.engagement > 0) out.push({ icon: 'fa-star', title: 'Your best-performing post',
    text: `"${P.topPost.snippet.slice(0, 140)}${P.topPost.snippet.length > 140 ? '…' : ''}" — ${plural(P.topPost.engagement, 'engagement')}.` })
  if (E && E.meetingsTotal > 0) out.push({ icon: 'fa-handshake', title: 'Pipeline in motion',
    text: `${plural(E.meetingsTotal, 'prospect')} ${E.meetingsTotal === 1 ? 'is' : 'are'} at meeting stage or beyond, out of ${fmt(E.activeLeads)} active in your pipeline.` })
  if (h && h.next3RunRate > 0 && (h.basis === 'run-rate' || h.basis === 'blend')) out.push({ icon: 'fa-forward', title: 'What the next quarter looks like',
    text: `At the current pace, your campaign is on track for about ${plural(h.next3RunRate, 'new opportunity', 'new opportunities')} over the next three months.` })
  if (totSent > 0 && !out.length) out.push({ icon: 'fa-seedling', title: 'Foundations in place', text: `${fmt(totSent)} decision-makers invited so far — your US presence is growing every week.` })
  if (!out.length) out.push({ icon: 'fa-seedling', title: 'Foundations in place', text: 'Targeting, messaging and content are set up — results build from here.' })
  return out.slice(0, 8)
}

// ── Page ─────────────────────────────────────────────────────────────────────
export function storyPage(c: ClientMonth, monthKey: string, monthLabel: string, headline: string, subline: string, h: StoryHistory | null, pdfUrl: string | null, next: string[]): string {
  const P = c.promote, N = c.network, E = c.engage
  const actions = actionsOf(c), insights = insightsOf(c, h, monthKey)
  const S = seriesUpTo(h, monthKey)
  let cA = 0, cO = 0
  const cum = S.map(p => { cA += p.accepted; cO += p.opportunities; return { m: mLabel(p.month), sent: p.sent, acc: p.accepted, opp: p.opportunities, cA, cO } })
  const weeks = (N?.weeks || []).filter(w => w.sent || w.accepted || w.opportunities)
  const fOrder: [string, string][] = [['contacted', 'In your pipeline'], ['connected', 'In conversation'], ['meeting', 'Meeting'], ['proposal', 'Proposal'], ['won', 'Won']]
  const f = E?.funnel || {}
  const funnel = fOrder.map(([k, label], i) => ({ label, n: fOrder.slice(i).reduce((x, [kk]) => x + (f[kk] || 0), 0) })).filter((x, i) => i === 0 || x.n > 0)
  const opps = N?.namedOpps || []
  const senMap: Record<string, number> = {}
  for (const o of opps) { const k = seniorityOf(o.title); senMap[k] = (senMap[k] || 0) + 1 }
  const seniority = [...SENIORITY.map(x => x[0]), 'Other roles'].filter(k => senMap[k]).map(k => ({ k, n: senMap[k] }))
  const daily = P && P.posts > 0 ? P.daily : []
  const eng = P && P.engagement > 0 ? [{ k: 'Likes', n: P.likes }, { k: 'Comments', n: P.comments }, { k: 'Shares', n: P.shares }].filter(x => x.n > 0) : []
  const accounts = (c.accounts || []).filter(a => a.network && a.network.sent > 0)
  const L = c.profile
  const presence: { k: string; v: string; d: string }[] = []
  if (L) {
    const num = (v: any) => (typeof v === 'number' ? v : null)
    const add = (k: string, key: string) => { const to = num(L.to[key]); if (to == null) return; const fr = L.from ? num(L.from[key]) : null; presence.push({ k, v: fmt(to), d: fr != null && to > fr ? `+${fmt(to - fr)} this month` : '' }) }
    add('LinkedIn connections', 'connections'); add('Profile views (90 days)', 'profile_views'); add('Company page followers', 'company_followers')
    add('Post impressions (30 days)', 'company_post_impressions'); add('Search appearances (30 days)', 'company_search_appearances')
  }

  const data = { cum, weeks: weeks.map(w => ({ w: w.weekStart.slice(5).replace('-', '/'), sent: w.sent, acc: w.accepted, opp: w.opportunities })), funnel, seniority, daily, eng, accounts: accounts.map(a => ({ k: a.name, sent: a.network!.sent, acc: a.network!.accepted, opp: a.network!.opportunities })) }
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  const card = (title: string, sub: string, body: string, wide = false) => `<section class="card${wide ? ' wide' : ''}"><h2>${esc(title)}</h2>${sub ? `<p class="sub">${esc(sub)}</p>` : ''}${body}</section>`
  const chart = (id: string, h = 260) => `<div class="chart" style="height:${h}px"><canvas id="${id}" role="img"></canvas></div>`
  const table = (head: string[], rows: (string | number)[][]) => `<details><summary>Show the numbers</summary><table><tr>${head.map(x => `<th>${esc(x)}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(v => `<td>${esc(typeof v === 'number' ? fmt(v) : v)}</td>`).join('')}</tr>`).join('')}</table></details>`

  const sections: string[] = []
  if (cum.length >= 2) sections.push(card('Your US network, growing month after month', `Decision-makers connected and opportunities opened since ${mLong(S[0].month)} — cumulative`,
    chart('cCum', 280) + table(['Month', 'Invitations', 'Accepted', 'Opportunities', 'Connections to date', 'Opportunities to date'], cum.map(x => [x.m, x.sent, x.acc, x.opp, x.cA, x.cO])), true))
  if (cum.length >= 2) sections.push(card('Campaign activity by month', 'Invitations sent and accepted each month', chart('cMonthly') + ''))
  if (data.weeks.length) sections.push(card(`${monthLabel}, week by week`, 'Invitations sent and new connections each week', chart('cWeeks') + table(['Week of', 'Invitations', 'Accepted', 'Opportunities'], data.weeks.map(w => [w.w, w.sent, w.acc, w.opp]))))
  if (data.accounts.length > 1) sections.push(card('By LinkedIn account', 'Each account runs its own campaign', chart('cAccounts', 200) + table(['Account', 'Invitations', 'Accepted', 'Opportunities'], data.accounts.map(a => [a.k, a.sent, a.acc, a.opp]))))
  if (E && funnel[0] && funnel[0].n > 0) sections.push(card('Your US pipeline', 'Prospects by how far they have progressed (each stage includes those beyond it)', chart('cFunnel', 220) + table(['Stage', 'Prospects'], funnel.map(x => [x.label, x.n]))))
  if (seniority.length) sections.push(card('Who you are talking to', 'Opportunities this month by seniority', chart('cSen', 200) + `<table class="opps"><tr><th>Role</th><th>Company</th><th>Stage</th><th>Date</th></tr>${opps.slice(0, 12).map(o => `<tr><td>${esc(o.title || 'Decision-maker')}</td><td>${esc(o.company || '')}</td><td>${esc(o.type)}</td><td>${esc(o.date)}</td></tr>`).join('')}</table>`))
  if (daily.length) sections.push(card('Brand visibility', `${fmt(P!.posts)} posts published in ${monthLabel}`, chart('cDaily', 200)))
  if (eng.length) sections.push(card('How your audience responded', `${fmt(P!.engagement)} engagements on your content`, chart('cEng', 160)))
  if (presence.length) sections.push(card('Your LinkedIn presence', 'Captured at the end of the month', `<div class="pres">${presence.map(p => `<div><div class="pv">${esc(p.v)}</div><div class="pk">${esc(p.k)}</div>${p.d ? `<div class="pd">${esc(p.d)}</div>` : ''}</div>`).join('')}</div>`))

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${esc(c.name)} — ${esc(monthLabel)} report · Gershon Consulting</title>
<link rel="icon" type="image/svg+xml" href="/static/clients-icon.svg">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<style>
*{box-sizing:border-box}body{margin:0;background:#f5f4f0;color:${INK};font:15px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
.wrap{max-width:1120px;margin:0 auto;padding:28px 18px 60px}
.top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap}
.eyebrow{font-size:12px;font-weight:700;color:${MUT};letter-spacing:.05em;text-transform:uppercase}
h1{font-size:30px;margin:4px 0 0;font-weight:800}.brand{font-weight:900;color:${RED};letter-spacing:.14em;font-size:12px;text-align:right}
.month{font-size:22px;font-weight:800;color:${RED};text-align:right}
.hero{margin:22px 0;padding:22px 24px;border-radius:16px;background:linear-gradient(120deg,${RED},#a8281f);color:#fff}
.hero .h{font-size:24px;font-weight:800;line-height:1.25}.hero .s{opacity:.92;margin-top:6px}
.hero .btns{margin-top:14px;display:flex;gap:10px;flex-wrap:wrap}.hero a{color:#fff;border:1px solid rgba(255,255,255,.6);padding:7px 12px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600}
h3.sec{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:${MUT};margin:30px 0 12px}
.actions{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.act{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px 16px}
.act i{color:${RED};font-size:16px}.act .v{font-size:28px;font-weight:800;margin-top:6px;line-height:1.1}.act .l{font-weight:700;font-size:13px;margin-top:2px}.act .d{font-size:12px;color:${MUT}}
.ins{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px}
.in{background:#fff;border:1px solid #e5e7eb;border-left:4px solid ${RED};border-radius:12px;padding:14px 16px}
.in .t{font-weight:800;font-size:14px}.in .t i{color:${RED};margin-right:6px}.in p{margin:6px 0 0;font-size:14px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:18px}.card.wide{grid-column:1/-1}
.card h2{font-size:16px;margin:0}.sub{color:${MUT};font-size:13px;margin:2px 0 10px}
.chart{position:relative}
details{margin-top:10px;font-size:12px}summary{cursor:pointer;color:${MUT}}
table{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px}th{text-align:left;color:${MUT};font-weight:700;text-transform:uppercase;font-size:10px;letter-spacing:.05em;border-bottom:1px solid #e5e7eb;padding:6px}td{padding:6px;border-bottom:1px solid #f0f0f0}
table.opps{margin-top:12px}
.pres{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.pres>div{border:1px solid #e5e7eb;border-radius:10px;padding:10px 12px}
.pv{font-size:22px;font-weight:800}.pk{font-size:12px;color:${MUT}}.pd{font-size:12px;color:#057642;font-weight:700}
.next{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px 20px}.next li{margin:6px 0}
.foot{margin-top:30px;color:${MUT};font-size:12px;text-align:center}
@media(max-width:760px){.grid{grid-template-columns:1fr}h1{font-size:24px}.hero .h{font-size:20px}}
@media print{.hero a,details{display:none}body{background:#fff}}
</style></head><body><div class="wrap">
<div class="top"><div><div class="eyebrow">Gershon Consulting · Monthly campaign report · Client #${c.no}</div><h1>${esc(c.name)}</h1></div>
<div><div class="month">${esc(monthLabel)}</div><div class="brand">GERSHON.AI</div></div></div>
<div class="hero"><div class="h">${esc(headline)}</div><div class="s">${esc(subline)}</div>
<div class="btns">${pdfUrl ? `<a href="${esc(pdfUrl)}" target="_blank"><i class="fas fa-file-pdf"></i> One-page PDF</a>` : ''}<a href="https://www.gershonconsulting.com/calendar" target="_blank"><i class="fas fa-calendar"></i> Book a review call</a></div></div>
${actions.length ? `<h3 class="sec">What we did for you in ${esc(monthLabel)}</h3><div class="actions">${actions.map(a => `<div class="act"><i class="fas ${a.icon}"></i><div class="v">${esc(a.value)}</div><div class="l">${esc(a.label)}</div><div class="d">${esc(a.detail)}</div></div>`).join('')}</div>` : ''}
<h3 class="sec">Insights</h3><div class="ins">${insights.map(i => `<div class="in"><div class="t"><i class="fas ${i.icon}"></i>${esc(i.title)}</div><p>${esc(i.text)}</p></div>`).join('')}</div>
${sections.length ? `<h3 class="sec">Your results, interactive</h3><div class="grid">${sections.join('')}</div>` : ''}
<h3 class="sec">Next month, our plan</h3><div class="next"><ul>${next.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>
<div class="foot">Gershon Consulting · US market entry · <a href="https://www.gershonconsulting.com" style="color:${RED}">gershonconsulting.com</a> · data as of ${esc(c.generatedAt.slice(0, 10))}</div>
</div>
<script>
(function(){
var D=${json};
if(!window.Chart)return;
var RED='${RED}',BLUE='${BLUE}',GOLD='${GOLD}',GRID='#eef0f3',MUT='${MUT}';
Chart.defaults.font.family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
Chart.defaults.color=MUT;
var base=function(extra){var o={responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
 plugins:{legend:{position:'top',align:'start',labels:{boxWidth:10,boxHeight:10,usePointStyle:true}},tooltip:{backgroundColor:'#1d1d1f',padding:10,callbacks:{label:function(c){return ' '+c.dataset.label+': '+Number(c.parsed.y!=null&&c.chart.options.indexAxis!=='y'?c.parsed.y:c.parsed.x).toLocaleString('en-US')}}}},
 scales:{x:{grid:{display:false}},y:{beginAtZero:true,grid:{color:GRID},border:{display:false}}}};
 if(extra)for(var k in extra)o[k]=extra[k];return o};
var bar=function(label,data,color){return {type:'bar',label:label,data:data,backgroundColor:color,borderRadius:4,borderSkipped:'start',maxBarThickness:28,borderColor:'#fff',borderWidth:{left:1,right:1}}};
function mk(id,cfg){var el=document.getElementById(id);if(el)new Chart(el,cfg)}
if(D.cum.length>1){
 mk('cCum',{type:'line',data:{labels:D.cum.map(function(x){return x.m}),datasets:[
  {label:'Decision-makers connected (to date)',data:D.cum.map(function(x){return x.cA}),borderColor:RED,backgroundColor:'rgba(204,51,51,.12)',fill:true,borderWidth:2,tension:.3,pointRadius:3,pointHoverRadius:6}]},options:base()});
 mk('cMonthly',{type:'bar',data:{labels:D.cum.map(function(x){return x.m}),datasets:[bar('Invitations',D.cum.map(function(x){return x.sent}),BLUE),bar('Accepted',D.cum.map(function(x){return x.acc}),RED)]},options:base()});
 var cumOpp=document.getElementById('cCum');
 if(D.cum[D.cum.length-1].cO>0&&cumOpp){var box=document.createElement('div');box.className='chart';box.style.height='200px';box.style.marginTop='14px';box.innerHTML='<canvas id="cCumO"></canvas>';cumOpp.parentNode.after(box);
  mk('cCumO',{type:'line',data:{labels:D.cum.map(function(x){return x.m}),datasets:[{label:'Opportunities opened (to date)',data:D.cum.map(function(x){return x.cO}),borderColor:GOLD,backgroundColor:'rgba(184,131,0,.12)',fill:true,borderWidth:2,tension:.3,pointRadius:3,pointHoverRadius:6}]},options:base()});}
}
if(D.weeks.length)mk('cWeeks',{type:'bar',data:{labels:D.weeks.map(function(x){return x.w}),datasets:[bar('Invitations',D.weeks.map(function(x){return x.sent}),BLUE),bar('Accepted',D.weeks.map(function(x){return x.acc}),RED)]},options:base()});
if(D.accounts.length>1)mk('cAccounts',{type:'bar',data:{labels:D.accounts.map(function(x){return x.k}),datasets:[bar('Invitations',D.accounts.map(function(x){return x.sent}),BLUE),bar('Accepted',D.accounts.map(function(x){return x.acc}),RED)]},options:base()});
var hbar=function(id,labels,data,label,color){mk(id,{type:'bar',data:{labels:labels,datasets:[bar(label,data,color)]},options:base({indexAxis:'y',plugins:{legend:{display:false},tooltip:{backgroundColor:'#1d1d1f',callbacks:{label:function(c){return ' '+Number(c.parsed.x).toLocaleString('en-US')+' '+label.toLowerCase()}}}},scales:{x:{beginAtZero:true,grid:{color:GRID},border:{display:false},ticks:{precision:0}},y:{grid:{display:false}}}})})};
if(D.funnel.length)hbar('cFunnel',D.funnel.map(function(x){return x.label}),D.funnel.map(function(x){return x.n}),'Prospects',RED);
if(D.seniority.length)hbar('cSen',D.seniority.map(function(x){return x.k}),D.seniority.map(function(x){return x.n}),'Opportunities',GOLD);
if(D.eng.length)hbar('cEng',D.eng.map(function(x){return x.k}),D.eng.map(function(x){return x.n}),'Engagements',RED);
if(D.daily.length)mk('cDaily',{type:'bar',data:{labels:D.daily.map(function(x){return x.date.slice(5)}),datasets:[Object.assign(bar('Posts',D.daily.map(function(x){return x.posts}),RED),{maxBarThickness:14})]},options:base({plugins:{legend:{display:false},tooltip:{backgroundColor:'#1d1d1f'}},scales:{x:{grid:{display:false},ticks:{maxTicksLimit:10}},y:{beginAtZero:true,grid:{color:GRID},border:{display:false},ticks:{precision:0}}}})});
})();
</script></body></html>`
}
