/* client.gershonCRM v3 — page scripts (dashboard, client, reports, settings) */
(function () {
  var page = document.body.getAttribute('data-page');
  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return n == null ? '—' : Math.round(n).toLocaleString('en-US'); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var band = function (p) { return p == null ? 'none' : p >= 80 ? 'good' : p >= 40 ? 'warn' : 'crit'; };
  var bar = function (p) { var b = band(p); return '<div class="bar ' + b + '"><span style="width:' + (p == null ? 0 : Math.max(3, Math.min(100, p))) + '%"></span></div>'; };
  function toast(t) { var el = $('toast'); if (!el) return; el.textContent = t; el.classList.add('show'); setTimeout(function () { el.classList.remove('show'); }, 3500); }
  function ym(d) { return d.toISOString().slice(0, 7); }
  function nyToday() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })); }
  function monthKey(which) { var t = nyToday(); if (which === 'last') { t = new Date(t.getFullYear(), t.getMonth() - 1, 15); } else { t = new Date(t.getFullYear(), t.getMonth(), 15); } return ym(t); }
  var current = 'cur';
  try { current = localStorage.getItem('gc_month') || 'cur'; } catch (e) {}
  function setupSeg(onChange) {
    var seg = $('monthSeg'); if (!seg) return;
    seg.querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-m') === current);
      b.onclick = function () { current = b.getAttribute('data-m'); try { localStorage.setItem('gc_month', current); } catch (e) {} seg.querySelectorAll('button').forEach(function (x) { x.classList.toggle('active', x === b); }); onChange(); };
    });
  }
  function score(cm) {
    var parts = [cm.promote && cm.promote.pct, cm.network && cm.network.pct, cm.engage && cm.engage.pct].filter(function (v) { return v != null; });
    if (!parts.length) return null;
    return Math.round(parts.map(function (p) { return Math.min(100, p); }).reduce(function (a, b) { return a + b; }, 0) / parts.length);
  }
  function chanP(cm) {
    if (cm.promoteInPlan === false) return '<div class="chan"><div class="v muted">Not in plan</div><div class="s">No social content for this client</div></div>';
    if (!cm.promote) return '<div class="chan"><div class="v muted">No social account</div><div class="s">Not collecting in social.gershon.ai</div>' + bar(null) + '</div>';
    var p = cm.promote;
    return '<div class="chan"><div class="v">' + fmt(p.posts) + ' of ' + fmt(p.target) + ' posts <span class="pill ' + band(p.pct) + '">' + p.pct + '%</span></div>' + bar(p.pct) + '<div class="s">' + p.perDay + ' / working day · ' + fmt(p.engagement) + ' engagements</div></div>';
  }
  function chanN(cm, s) {
    if (!cm.network) return '<div class="chan"><div class="v muted">No campaign report</div><div class="s">Paste the Straight-in link</div>' + bar(null) + '</div>';
    var n = cm.network;
    if (n.pending) return '<div class="chan"><div class="v muted">Awaiting report</div><div class="s">No Straight-in week covers this month yet</div>' + bar(null) + '</div>';
    return '<div class="chan"><div class="v">' + n.rate + '% accepted <span class="pill ' + band(n.pct) + '">' + n.pct + '%</span></div>' + bar(n.pct) + '<div class="s">' + fmt(n.accepted) + ' of ' + fmt(n.sent) + ' invites · ' + fmt(n.opportunities) + ' opps</div></div>';
  }
  function chanE(cm, s) {
    if (!cm.engage) return '<div class="chan"><div class="v muted">No pipeline</div><div class="s">Streak not configured</div>' + bar(null) + '</div>';
    var e = cm.engage;
    return '<div class="chan"><div class="v">' + fmt(e.newLeads) + ' new leads <span class="pill ' + band(e.pct) + '">' + e.pct + '%</span></div>' + bar(e.pct) + '<div class="s">goal ' + e.target + '/month · ' + fmt(e.meetings) + ' meetings · ' + fmt(e.activeLeads) + ' active</div></div>';
  }
  function scoreBadge(v) { return '<span class="score ' + band(v) + '">' + (v == null ? '—' : v + '%') + '</span>'; }
  function getJSON(u) { return fetch(u, { credentials: 'same-origin' }).then(function (r) { if (r.status === 401) { location.href = '/login?next=' + encodeURIComponent(location.pathname); throw new Error('auth'); } return r.json(); }); }

  // ── Dashboard ──
  function dashboard() {
    var reg, results = {}, gen = 0;
    function load() {
      var my = ++gen, m = monthKey(current);
      results = {};
      $('rows').innerHTML = reg.clients.map(function (r) {
        return '<tr class="row" data-no="' + r.no + '" onclick="location.href=\'/client/' + r.no + '\'"><td><span class="cno">' + r.no + '</span> <b>' + esc(r.name) + '</b></td><td colspan="3"><span class="skeleton">loading three channels………………………………………………</span></td><td class="hide-sm"></td></tr>';
      }).join('');
      $('kpis').innerHTML = '';
      $('summaryText').innerHTML = '<span class="skeleton">Loading the portfolio…………………………</span>';
      var s = reg.settings;
      $('thP').textContent = '· ' + s.promoteTarget + ' posts/' + (s.promoteUnit === 'day' ? 'day' : 'week');
      $('thN').textContent = '· ' + s.acceptTarget + '% accepted';
      $('thE').textContent = '· ' + s.leadsPerMonth + ' leads/user/month';
      var queue = reg.clients.slice(), running = 0;
      function next() {
        if (my !== gen) return;
        while (running < 3 && queue.length) {
          (function (r) {
            running++;
            getJSON('/api/v3/client/' + r.no + '?month=' + m).then(function (d) {
              if (my !== gen) return;
              var cm = d.client; results[r.no] = cm;
              var tr = document.querySelector('tr[data-no="' + r.no + '"]');
              tr.innerHTML = '<td><span class="cno">' + r.no + '</span> <b>' + esc(r.name) + '</b></td><td>' + chanP(cm) + '</td><td>' + chanN(cm) + '</td><td>' + chanE(cm) + '</td><td class="hide-sm" style="text-align:center">' + scoreBadge(score(cm)) + '</td>';
              totals(d.month, s);
            }).catch(function () { }).then(function () { running--; next(); });
          })(queue.shift());
        }
      }
      next();
    }
    function totals(month, s) {
      var list = Object.keys(results).map(function (k) { return results[k]; });
      var P = list.filter(function (c) { return c.promote; }), N = list.filter(function (c) { return c.network && !c.network.pending; }), E = list.filter(function (c) { return c.engage; });
      var sum = function (a, f) { return a.reduce(function (x, c) { return x + f(c); }, 0); };
      var posts = sum(P, function (c) { return c.promote.posts; }), pt = sum(P, function (c) { return c.promote.target; });
      var sent = sum(N, function (c) { return c.network.sent; }), acc = sum(N, function (c) { return c.network.accepted; });
      var rate = sent ? Math.round(acc / sent * 1000) / 10 : 0;
      var leads = sum(E, function (c) { return c.engage.newLeads; }), meet = sum(E, function (c) { return c.engage.meetings; });
      var lt = E.reduce(function (a, c) { return a + c.engage.target; }, 0);
      var pp = pt ? Math.round(posts / pt * 100) : 0, np = Math.round(rate / s.acceptTarget * 100), ep = month.isCurrent ? Math.round(leads / (lt * month.days / new Date(+month.key.slice(0, 4), +month.key.slice(5, 7), 0).getDate()) * 100) : (lt ? Math.round(leads / lt * 100) : 0);
      var scores = list.map(score).filter(function (v) { return v != null; });
      var sc = scores.length ? Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / scores.length) : null;
      var kpi = function (label, val, sub, p) { return '<div class="kpi"><div class="kpi-label">' + label + '</div><div class="kpi-value" style="color:' + ({ good: 'var(--success)', warn: 'var(--warn)', crit: 'var(--brand)', none: 'var(--text)' })[band(p)] + '">' + val + '</div><div class="kpi-sub">' + sub + '</div>' + (p != null ? '<div style="margin-top:8px">' + bar(p) + '</div>' : '') + '</div>'; };
      $('kpis').innerHTML =
        kpi('Promote · posts', fmt(posts) + ' <span style="font-size:15px;color:var(--text-muted)">/ ' + fmt(pt) + '</span>', pp + '% of target · ' + P.length + ' clients posting', pp) +
        kpi('Network · acceptance', rate + '%', fmt(acc) + ' of ' + fmt(sent) + ' invites · target ' + s.acceptTarget + '%', np) +
        kpi('Engage · new leads', fmt(leads) + ' <span style="font-size:15px;color:var(--text-muted)">/ ' + fmt(lt) + '</span>', ep + '% of goal' + (month.isCurrent ? ' so far' : ''), ep) +
        kpi('Meetings', fmt(meet), 'prospects moved to meeting or beyond', null);
      var done = list.length, all = reg.clients.length;
      $('summaryText').innerHTML = '<b>' + esc(month.label) + (month.isCurrent ? ' so far' : '') + '</b> — portfolio at <b style="color:' + ({ good: 'var(--success)', warn: 'var(--warn)', crit: 'var(--brand)', none: 'inherit' })[band(sc)] + '">' + (sc == null ? '—' : sc + '%') + '</b> of plan across ' + done + (done < all ? ' of ' + all : '') + ' clients.';
    }
    getJSON('/api/v3/registry').then(function (r) { reg = r; setupSeg(load); load(); });
    trackRecord();
  }


  // ── Track record & projections (history + live) ──
  function pctTxt(v) { return v == null ? '—' : v + '%'; }
  function paceBand(v) { return v == null ? 'none' : v >= 100 ? 'good' : v >= 60 ? 'warn' : 'crit'; }
  function oppBars(series) {
    if (!series || !series.length) return '<div class="empty">No monthly history yet.</div>';
    var max = Math.max.apply(null, [1].concat(series.map(function (x) { return x.opportunities; })));
    return '<div class="daybars" style="height:90px">' + series.map(function (x) { return '<div title="' + x.month + ': ' + x.opportunities + ' opportunities' + (x.partial ? ' (month in progress)' : '') + (x.live ? ' · live report' : ' · Straight-in sheet') + '" style="height:' + Math.max(2, x.opportunities / max * 100) + '%;' + (x.live ? '' : 'background:var(--text-muted);opacity:.45;') + (x.partial ? 'opacity:.5;' : '') + '"></div>'; }).join('') + '</div><div class="axis"><span>' + series[0].month + '</span><span>' + series[series.length - 1].month + '</span></div>';
  }
  function trackRecord() {
    var el = $('track'); if (!el) return;
    el.innerHTML = '<div class="card"><span class="skeleton">Loading the track record…………</span></div>';
    getJSON('/api/v3/history').then(function (h) {
      var b = h.benchmarks, p = h.portfolio, nc = h.newClient;
      var k = function (label, val, sub) { return '<div class="kpi"><div class="kpi-label">' + label + '</div><div class="kpi-value">' + val + '</div><div class="kpi-sub">' + sub + '</div></div>'; };
      var rows = h.clients.filter(function (c) { return c.monthsWithData > 0; }).sort(function (a, c) { return c.next3Expected - a.next3Expected; }).map(function (c) {
        return '<tr><td><a href="/client/' + c.no + '"><span class="cno">#' + c.no + '</span> ' + esc(c.name) + '</a></td><td class="num">' + (c.tenureMonths == null ? '—' : c.tenureMonths) + '</td><td class="num">' + fmt(c.totalOpportunities) + '</td><td class="num">' + (c.last3Avg == null ? '—' : c.last3Avg) + '</td><td class="hide-sm"><span class="score ' + paceBand(c.vsBenchmarkPct) + '">' + pctTxt(c.vsBenchmarkPct) + '</span></td><td class="num">' + pctTxt(c.stay6) + '</td><td class="num"><b>' + fmt(c.next3Expected) + '</b></td></tr>';
      }).join('');
      el.innerHTML = '<div class="card"><div class="card-header"><h3><i class="fas fa-clock-rotate-left" style="color:var(--brand)"></i> Track record & outlook</h3><span class="muted" style="font-size:11px">History since 2021 · ' + b.clientsRun + ' clients · ' + fmt(b.totalOpportunities) + ' opportunities</span></div>' +
        '<div class="kpi-row" style="margin-bottom:14px">' +
        k('Average client lifetime', b.lifetimeMeanMonths + ' mo', 'median ' + b.lifetimeMedianMonths + ' months') +
        k('Still with us after 6 / 12 months', Math.round(b.retention['6'] * 100) + '% / ' + Math.round(b.retention['12'] * 100) + '%', 'share of clients, all years') +
        k('Opportunities per client per month', b.oppsPerClientMonthMean, 'history median ' + b.oppsPerClientMonthMedian + ' · now ' + pctTxt(p.paceVsHistoryPct) + ' of that pace') +
        k('Next 3 months (expected)', fmt(p.next3Expected), 'opportunities · ' + fmt(p.next3RunRate) + ' if every client stays') +
        k('Clients expected in 6 months', p.expectedClientsIn6 + ' of ' + p.clients, p.expectedClientsIn12 + ' in 12 months, before new signings') +
        k('A new client is worth', '~' + nc.expectedOpportunities + ' opps', 'over ~' + nc.expectedMonths + ' months · ~' + nc.firstQuarterOpps + ' in its first 3') +
        '</div>' +
        '<div style="overflow:auto"><table class="data-table"><thead><tr><th>Client</th><th>Months with us</th><th>Opps to date</th><th>Last 3 mo / month</th><th class="hide-sm">Pace vs history</th><th>Stays 6 more mo</th><th>Next 3 mo (exp.)</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<p class="muted" style="font-size:11px;margin-top:10px">Retention and pace come from every Gershon client since 2021 (Straight-in sheet + finance roster). Expected opportunities = each client\'s last 3 full months × the historical chance a client of that age is still with us. Clients with fewer than 3 months follow the average ramp of a new campaign.</p></div>';
    }).catch(function () { el.innerHTML = ''; });
  }
  function clientHistory(no) {
    var el = $('history'); if (!el) return;
    el.innerHTML = '<div class="card"><span class="skeleton">Loading the track record…………</span></div>';
    getJSON('/api/v3/history/' + no).then(function (h) {
      var c = h.client, b = h.benchmarks;
      var stat = function (k, v) { return '<div><div class="k">' + k + '</div><div class="v">' + v + '</div></div>'; };
      var basis = c.basis === 'run-rate' ? 'based on its last 3 full months' : c.basis === 'ramp' ? 'based on how a typical new campaign ramps up' : 'blending its first months with a typical new campaign';
      el.innerHTML = '<div class="grid cols-2"><div class="card"><div class="card-header"><h3><i class="fas fa-clock-rotate-left" style="color:var(--brand)"></i> Track record</h3><span class="muted" style="font-size:11px">' + (c.start ? 'with us since ' + esc(c.start) : 'start date unknown') + '</span></div>' +
        '<div class="stat-grid">' + stat('Months with us', c.tenureMonths == null ? '—' : c.tenureMonths) + stat('Opportunities to date', fmt(c.totalOpportunities)) + stat('Avg per month', c.avgPerMonth) + '</div>' +
        '<div class="stat-grid">' + stat('Last 3 months / month', c.last3Avg == null ? '—' : c.last3Avg) + stat('Pace vs average client', '<span class="score ' + paceBand(c.vsBenchmarkPct) + '">' + pctTxt(c.vsBenchmarkPct) + '</span>') + stat('History average', b.oppsPerClientMonthMean + ' / mo') + '</div>' +
        '<div class="section-title" style="margin-top:12px">Opportunities per month</div>' + oppBars(c.series.slice(-24)) +
        '<div class="muted" style="font-size:11px;margin-top:6px">Grey: Straight-in sheet · red: live weekly reports</div></div>' +
        '<div class="card"><div class="card-header"><h3><i class="fas fa-chart-line" style="color:var(--brand)"></i> Projection</h3><span class="muted" style="font-size:11px">' + basis + '</span></div>' +
        '<div class="big">' + fmt(c.next3Expected) + ' <span style="font-size:15px;color:var(--text-muted)">opportunities expected in the next 3 months</span></div>' +
        '<div class="muted" style="font-size:12px;margin:6px 0 10px">' + fmt(c.next3RunRate) + ' if the campaign keeps running at this pace · ' + fmt(c.next12Expected) + ' expected over 12 months</div>' +
        '<div class="stat-grid">' + stat('Still with us in 3 months', pctTxt(c.stay3)) + stat('In 6 months', pctTxt(c.stay6)) + stat('In 12 months', pctTxt(c.stay12)) + '</div>' +
        '<div class="note" style="margin-top:12px">Clients who reach ' + (c.tenureMonths == null ? 'this point' : Math.round(c.tenureMonths) + ' months') + ' typically stay about <b>' + (c.expectedLifetime == null ? '—' : c.expectedLifetime) + ' months</b> in total (average across all clients: ' + b.lifetimeMeanMonths + ', median ' + b.lifetimeMedianMonths + '). ' + (c.vsBenchmarkPct != null && c.vsBenchmarkPct < 60 ? 'The pace is well below the historical average: worth a targeting review with Straight-in.' : c.vsBenchmarkPct != null && c.vsBenchmarkPct >= 100 ? 'The pace is at or above the historical average.' : '') + '</div></div></div>';
    }).catch(function () { el.innerHTML = ''; });
  }

  // ── Client page ──
  function clientView() {
    var no = document.body.getAttribute('data-no');
    function load() {
      var m = monthKey(current);
      $('pdfBtn').href = '/api/v3/report/client?client=' + no + '&month=' + m + '&format=pdf';
      $('channels').innerHTML = '<div class="card"><span class="skeleton">loading…………</span></div><div class="card"><span class="skeleton">loading…………</span></div><div class="card"><span class="skeleton">loading…………</span></div>';
      $('details').innerHTML = '';
      getJSON('/api/v3/client/' + no + '?month=' + m).then(function (d) {
        var cm = d.client, mo = d.month, s = d.settings, sc = score(cm);
        $('summaryText').innerHTML = '<b>' + esc(mo.label) + (mo.isCurrent ? ' so far' : '') + '</b> — ' + (sc == null ? 'no data collected yet.' : 'on <b>' + sc + '%</b> of plan across the channels this client has.');
        $('scoreBox').innerHTML = scoreBadge(sc);
        var card = function (icon, title, src, inner) { return '<div class="card chan-card"><div class="card-header"><h3><i class="fas ' + icon + '"></i>' + title + '</h3><span class="muted" style="font-size:11px">' + src + '</span></div>' + inner + '</div>'; };
        var stat = function (k, v) { return '<div><div class="k">' + k + '</div><div class="v">' + v + '</div></div>'; };
        var p = cm.promote, n = cm.network, e = cm.engage;
        var cp = cm.promoteInPlan === false ? '<div class="empty">Social content creation is not part of this project.</div>' : p ? '<div class="big">' + fmt(p.posts) + ' <span style="font-size:15px;color:var(--text-muted)">of ' + fmt(p.target) + ' posts</span></div><div style="margin:8px 0">' + bar(p.pct) + '</div><div class="muted" style="font-size:12px">' + p.pct + '% of ' + esc(p.targetLabel) + ' · ' + p.perDay + ' per working day</div><div class="stat-grid">' + stat('Engagements', fmt(p.engagement)) + stat('Followers', p.followers ? fmt(p.followers) : '—') + stat('New followers', p.followers ? (p.followersGrowth >= 0 ? '+' : '') + fmt(p.followersGrowth) : '—') + '</div><div class="muted" style="font-size:11px">' + esc(p.platforms.join(' + ') || '') + ' · last month ' + fmt(p.prevPosts) + ' posts</div>' : '<div class="empty">No social account is collecting for this client in social.gershon.ai.</div>';
        var cn = n && n.pending ? '<div class="empty">No Straight-in weekly report covers ' + esc(mo.label) + ' yet. Last report: ' + esc(n.lastReport) + '.</div>' : n ? '<div class="big">' + n.rate + '% <span style="font-size:15px;color:var(--text-muted)">accepted</span></div><div style="margin:8px 0">' + bar(n.pct) + '</div><div class="muted" style="font-size:12px">' + n.pct + '% of the ' + s.acceptTarget + '% target · last month ' + n.prevRate + '%</div><div class="stat-grid">' + stat('Invitations', fmt(n.sent)) + stat('Accepted', fmt(n.accepted)) + stat('Opportunities', fmt(n.opportunities)) + '</div><div class="muted" style="font-size:11px">' + fmt(n.messages) + ' messages · latest report ' + esc(n.lastReport) + '</div>' : '<div class="empty">No Straight-in campaign report linked. <a href="/straightin" style="color:var(--brand);font-weight:600">Paste this week\'s links</a></div>';
        var ce = e ? '<div class="big">' + fmt(e.newLeads) + ' <span style="font-size:15px;color:var(--text-muted)">new leads</span></div><div style="margin:8px 0">' + bar(e.pct) + '</div><div class="muted" style="font-size:12px">' + e.pct + '% of ' + e.target + ' per month' + (mo.isCurrent ? ' (pro rata)' : '') + ' · last month ' + fmt(e.prevNewLeads) + '</div><div class="stat-grid">' + stat('Meetings', fmt(e.meetings)) + stat('Active', fmt(e.activeLeads)) + stat('Won', fmt(e.won)) + '</div><div class="muted" style="font-size:11px">' + fmt(e.meetingsTotal) + ' at meeting stage or beyond · ' + fmt(e.totalLeads) + ' in pipeline</div>' : '<div class="empty">No Streak pipeline configured for this client.</div>';
        if (n && ((n.missingCampaigns || []).length || (n.staleCampaigns || []).length)) cn += '<div class="note" style="margin-top:10px">' + (n.missingCampaigns || []).map(function (m) { return 'No report linked for <b>' + esc(m) + '</b>. '; }).join('') + (n.staleCampaigns || []).map(function (m) { return '<b>' + esc(m) + '</b>: report has no week in this month. '; }).join('') + '<a href="/straightin" style="color:var(--brand);font-weight:600">Straight-in links</a></div>';
        $('channels').innerHTML = card('fa-bullhorn', 'Promote', 'social.gershon.ai', cp) + card('fa-user-plus', 'Network', 'Straight-in', cn) + card('fa-handshake', 'Engage', 'Streak', ce);
        var det = '';
        if (p) {
          var max = Math.max.apply(null, [1].concat(p.daily.map(function (x) { return x.posts; })));
          det += '<div class="card"><div class="card-header"><h3>Posts per day</h3><span class="muted">target line: ' + esc(p.targetLabel) + '</span></div><div class="daybars">' + p.daily.map(function (x) { var w = new Date(x.date + 'T12:00:00Z').getUTCDay(); return '<div class="' + (x.posts ? '' : 'zero ') + (w === 0 || w === 6 ? 'wkend' : '') + '" title="' + x.date + ': ' + x.posts + '" style="height:' + Math.max(2, x.posts / max * 100) + '%"></div>'; }).join('') + '</div><div class="axis"><span>' + p.daily[0].date.slice(5) + '</span><span>' + p.daily[p.daily.length - 1].date.slice(5) + '</span></div>' + (p.topPost ? '<div class="note" style="margin-top:14px"><b>Top post · ' + fmt(p.topPost.engagement) + ' engagements</b><br>' + esc(p.topPost.snippet) + (p.topPost.url ? ' <a href="' + esc(p.topPost.url) + '" target="_blank" style="color:var(--brand)">open</a>' : '') + '</div>' : '') + '</div>';
        }
        if (n || e) {
          var inner = '';
          if (n && n.campaigns && (n.campaigns.length > 1 || (cm.campaigns || []).length > 1)) inner += '<table class="data-table" style="margin-bottom:14px"><thead><tr><th>Campaign</th><th>Sent</th><th>Accepted</th><th>Rate</th><th>Opps</th></tr></thead><tbody>' + n.campaigns.map(function (k) { return '<tr><td><b>' + esc(k.label) + '</b></td><td>' + fmt(k.sent) + '</td><td>' + fmt(k.accepted) + '</td><td>' + k.rate + '%</td><td>' + fmt(k.opportunities) + '</td></tr>'; }).join('') + '</tbody></table>';
          if (n && n.weeks.length) inner += '<table class="data-table"><thead><tr><th>Week of</th><th>Sent</th><th>Accepted</th><th>Messages</th><th>Opps</th></tr></thead><tbody>' + n.weeks.map(function (w) { return '<tr><td>' + w.weekStart + '</td><td>' + fmt(w.sent) + '</td><td>' + fmt(w.accepted) + '</td><td>' + fmt(w.messages) + '</td><td>' + fmt(w.opportunities) + '</td></tr>'; }).join('') + '</tbody></table>';
          if (n && n.namedOpps.length) inner += '<div style="margin-top:12px">' + n.namedOpps.map(function (o) { return '<div class="feed-item ok"><div class="feed-dot"></div><div class="feed-text"><b>' + esc(o.name) + '</b> — ' + esc(o.title) + (o.company ? ' at ' + esc(o.company) : '') + '<div class="feed-time">' + esc(o.type) + ' · ' + o.date + '</div></div></div>'; }).join('') + '</div>';
          if (e) { var f = e.funnel, tot = Object.keys(f).reduce(function (a, k) { return a + f[k]; }, 0) || 1; inner += '<div class="section-title" style="margin-top:16px">Pipeline funnel</div>' + ['contacted', 'connected', 'meeting', 'proposal', 'won', 'recycled'].map(function (k) { return '<div style="display:grid;grid-template-columns:90px 1fr 50px;gap:10px;align-items:center;margin-bottom:6px;font-size:12px"><span style="text-transform:capitalize">' + k + '</span><div class="bar ' + (k === 'recycled' ? 'none' : k === 'won' || k === 'meeting' || k === 'proposal' ? 'good' : 'crit') + '"><span style="width:' + Math.max(1, f[k] / tot * 100) + '%"></span></div><span class="num" style="text-align:right">' + fmt(f[k]) + '</span></div>'; }).join(''); }
          det += '<div class="card"><div class="card-header"><h3>Network weeks & pipeline</h3></div>' + (inner || '<div class="empty">No weekly data this month.</div>') + '</div>';
        }
        $('details').innerHTML = det;
      });
    }
    setupSeg(load); load(); clientHistory(no);
  }

  // ── Reports ──
  function reports() {
    var monthEl = $('month');
    var url = function (kind, fmtq) { var u = '/api/v3/report/' + kind + '?month=' + monthEl.value; if (kind === 'client') u += '&client=' + $('clientSel').value; return u + (fmtq ? '&format=' + fmtq : ''); };
    document.querySelectorAll('[data-preview]').forEach(function (b) { b.onclick = function () { var k = b.getAttribute('data-preview'); $('previewCard').style.display = ''; $('previewTitle').textContent = 'Preview · ' + b.closest('.card').querySelector('h3').textContent.trim(); $('previewFrame').src = url(k); $('previewCard').scrollIntoView({ behavior: 'smooth' }); }; });
    document.querySelectorAll('[data-pdf]').forEach(function (b) { b.onclick = function () { window.open(url(b.getAttribute('data-pdf'), 'pdf'), '_blank'); }; });
    document.querySelectorAll('[data-send]').forEach(function (b) {
      b.onclick = function () {
        var k = b.getAttribute('data-send'); b.disabled = true; var old = b.innerHTML; b.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending';
        var u = '/api/v3/report/' + k + '/send?month=' + monthEl.value + (k === 'client' ? '&client=' + $('clientSel').value : '');
        fetch(u, { method: 'POST', credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (d) { toast(d.ok ? 'Sent to ' + d.to.join(', ') : 'Not sent: ' + (d.error || 'error')); }).catch(function () { toast('Not sent'); }).then(function () { b.disabled = false; b.innerHTML = old; });
      };
    });
  }

  // ── Settings ──
  function settings() {
    $('settingsForm').onsubmit = function (ev) {
      ev.preventDefault();
      var f = ev.target, body = { promoteTargets: {}, clientEmails: {} };
      ['promoteTarget', 'acceptTarget', 'leadsPerMonth'].forEach(function (k) { body[k] = Number(f[k].value); });
      body.promoteUnit = f.promoteUnit.value; body.internalEmail = f.internalEmail.value.trim(); body.straightinEmail = f.straightinEmail.value.trim(); body.autoSendClients = f.autoSendClients.checked;
      Array.prototype.forEach.call(f.elements, function (el) {
        if (/^pt_/.test(el.name) && el.value !== '') body.promoteTargets[el.name.slice(3)] = Number(el.value);
        if (/^ce_/.test(el.name) && el.value.trim()) body.clientEmails[el.name.slice(3)] = el.value.trim();
      });
      fetch('/api/v3/settings', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json(); }).then(function (d) { toast(d.ok ? 'Saved' : 'Not saved'); });
    };
  }

  if (page === 'dashboard') dashboard();
  else if (page === 'client') clientView();
  else if (page === 'reports') reports();
  else if (page === 'settings') settings();
})();
