/* client.gershonCRM — "Where we stand" campaign section on /client/:no
   Data: GET /api/v3/campaign/:no (whole campaign since launch).
   Charts: Chart.js 4. Palette as the interactive report: red #FE1B04 · blue #4A7BC0 · gold #B88300. */
(function () {
  var root = document.getElementById('campaign');
  if (!root) return;
  var no = root.getAttribute('data-no');
  var RED = '#FE1B04', BLUE = '#4A7BC0', GOLD = '#B88300', GREEN = '#057642', GREY = '#8e8e93', GRID = '#eef0f3', MUT = '#6e6e73';
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var mL = function (k) { return MON[+k.slice(5, 7) - 1] + ' ' + k.slice(2, 4); };
  var mLong = function (k) { return MONL[+k.slice(5, 7) - 1] + ' ' + k.slice(0, 4); };
  var fmt = function (n) { return n == null || isNaN(n) ? '—' : Math.round(n).toLocaleString('en-US'); };
  var f1 = function (n) { return n == null || isNaN(n) ? '—' : (Math.round(n * 10) / 10).toLocaleString('en-US'); };
  var pct = function (a, b) { return b > 0 ? Math.round(a / b * 1000) / 10 : null; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var sum = function (a, k) { return a.reduce(function (x, m) { return x + (m[k] || 0); }, 0); };
  var charts = [];
  var D = null, range = 'all';
  try { range = localStorage.getItem('gc_camp_range') || 'all'; } catch (e) {}

  injectCss();
  fetch('/api/v3/campaign/' + no, { credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (d) {
    if (d.error) throw new Error(d.error);
    D = d; render();
  }).catch(function (e) { root.innerHTML = '<div class="card"><div class="empty">Campaign history could not be loaded (' + esc(e.message) + ').</div></div>'; });

  function inRange(months) {
    var data = months.filter(function (m) { return m.sent || m.accepted || m.opportunities || m.streakNew; });
    if (range === 'all') return data;
    var n = +range, full = data.filter(function (m) { return !m.partial; });
    var keep = full.slice(-n).map(function (m) { return m.month; });
    return data.filter(function (m) { return keep.indexOf(m.month) >= 0 || (m.partial); });
  }

  function stats(ms) {
    var full = ms.filter(function (m) { return !m.partial && (m.sent || m.accepted || m.opportunities); });
    var net = ms.filter(function (m) { return m.sent || m.accepted || m.opportunities; });
    var last3 = full.slice(-3);
    var s = {
      months: net.length, full: full.length,
      sent: sum(net, 'sent'), accepted: sum(net, 'accepted'), opps: sum(net, 'opportunities'),
      rate: pct(sum(net, 'accepted'), sum(net, 'sent')),
      avgSent: full.length ? sum(full, 'sent') / full.length : null,
      avgAcc: full.length ? sum(full, 'accepted') / full.length : null,
      avgOpps: full.length ? sum(full, 'opportunities') / full.length : null,
      l3Rate: pct(sum(last3, 'accepted'), sum(last3, 'sent')),
      l3Opps: last3.length ? sum(last3, 'opportunities') / last3.length : null,
      l3: last3,
    };
    s.perLead = s.opps > 0 ? s.accepted / s.opps : null;
    var withRate = full.filter(function (m) { return m.sent >= 50 && m.accepted <= m.sent; });
    s.bestRate = withRate.slice().sort(function (a, b) { return b.accepted / b.sent - a.accepted / a.sent; })[0] || null;
    s.bestOpps = full.slice().sort(function (a, b) { return b.opportunities - a.opportunities; })[0] || null;
    s.monthsAtGoal = full.filter(function (m) { return m.opportunities >= D.targets.leadsPerMonth; }).length;
    s.monthsAboveRate = withRate.filter(function (m) { return m.accepted / m.sent * 100 >= D.targets.acceptRate; }).length;
    s.rateMonths = withRate.length;
    return s;
  }

  function trend(now, avg) {
    if (now == null || avg == null || avg === 0) return '';
    var d = Math.round((now - avg) / avg * 100);
    if (Math.abs(d) < 3) return '<span class="ct-flat">≈ campaign average</span>';
    return d > 0 ? '<span class="ct-up"><i class="fas fa-arrow-up"></i> ' + d + '% vs campaign avg</span>' : '<span class="ct-down"><i class="fas fa-arrow-down"></i> ' + Math.abs(d) + '% vs campaign avg</span>';
  }

  function render() {
    charts.forEach(function (c) { c.destroy(); }); charts = [];
    var T = D.targets, B = D.benchmarks;
    var ms = inRange(D.months);
    var S = stats(ms);
    var hasNet = D.services.network !== false && S.months > 0;
    var since = ms.length ? ms[0].month : D.start;
    var rangeLbl = range === 'all' ? 'since launch' : 'last ' + range + ' months';

    var seg = '<div class="seg" id="campRange">' + [['all', 'Since launch'], ['12', '12 months'], ['6', '6 months'], ['3', '3 months']].map(function (r) { return '<button data-r="' + r[0] + '" class="' + (range === r[0] ? 'active' : '') + '">' + r[1] + '</button>'; }).join('') + '</div>';
    var tools = '<button class="btn" id="campCall" title="Hide the menu and enlarge everything for a client call"><i class="fas fa-display"></i> Call mode</button>' +
      '<button class="btn" id="campCopy"><i class="fas fa-copy"></i> Copy talking points</button>' +
      '<button class="btn" id="campCsv"><i class="fas fa-file-csv"></i> CSV</button>';

    if (!hasNet) {
      root.innerHTML = '<div class="card camp"><div class="camp-head"><h2><i class="fas fa-flag-checkered"></i> Where we stand in this campaign</h2></div><div class="empty">' +
        (D.services.network === false ? 'No LinkedIn campaign is part of this client\'s plan — see the monthly detail below.' : 'No Straight-in campaign report has been collected for this client yet. Paste its weekly link in <a href="/straightin" style="color:var(--brand)">Straight-in links</a>.') + '</div></div>';
      return;
    }

    var rateGood = S.rate != null && S.rate >= T.acceptRate;
    var oppGood = S.avgOpps != null && S.avgOpps >= T.leadsPerMonth;
    var tile = function (cls, label, big, sub, extra) { return '<div class="ct ' + cls + '"><div class="ct-l">' + label + '</div><div class="ct-v">' + big + '</div><div class="ct-s">' + sub + '</div>' + (extra ? '<div class="ct-x">' + extra + '</div>' : '') + '</div>'; };
    var tiles =
      tile(rateGood ? 'good' : 'bad', 'Acceptance rate · ' + rangeLbl, (S.rate == null ? '—' : f1(S.rate) + '%'),
        'target ' + T.acceptRate + '% · Gershon average ' + B.acceptanceRate + '%',
        S.l3Rate != null ? 'Last 3 months: <b>' + f1(S.l3Rate) + '%</b> ' + trend(S.l3Rate, S.rate) : '') +
      tile(oppGood ? 'good' : 'bad', 'Leads per month · average', f1(S.avgOpps),
        'goal ' + T.leadsPerMonth + '/month' + (D.users > 1 ? ' (' + D.users + ' accounts × ' + T.leadsPerUser + ')' : '') + ' · Gershon avg ' + B.oppsPerClientMonth,
        S.l3Opps != null ? 'Last 3 months: <b>' + f1(S.l3Opps) + '/month</b> ' + trend(S.l3Opps, S.avgOpps) : '') +
      tile('', 'Leads · total ' + rangeLbl, fmt(S.opps), S.full + ' full months' + (S.months > S.full ? ' + current month' : '') + ' · ' + S.monthsAtGoal + ' of ' + S.full + ' at goal',
        S.perLead ? 'About <b>1 lead for every ' + Math.round(S.perLead) + '</b> new connections' : '') +
      tile('', 'Invitations sent', fmt(S.sent), 'average ' + fmt(S.avgSent) + ' / month · Gershon avg ' + fmt(B.invitesPerClientMonth), '') +
      tile('', 'New connections', fmt(S.accepted), 'average ' + fmt(S.avgAcc) + ' / month', S.rateMonths ? S.monthsAboveRate + ' of ' + S.rateMonths + ' months above the ' + T.acceptRate + '% target' : '') +
      (D.pipeline ? tile('', 'Streak pipeline now', fmt(D.pipeline.activeLeads), 'active prospects · ' + fmt(D.pipeline.meetingsTotal) + ' at meeting stage or beyond', fmt(D.pipeline.totalLeads) + ' in pipeline · ' + fmt(D.pipeline.won) + ' won') : '');

    var cards = [];
    cards.push(card('Acceptance rate, month by month', 'Accepted ÷ invitations sent. Dashed lines: campaign average, ' + T.acceptRate + '% target, Gershon average across ' + B.clientsRun + ' clients.', 'chRate', 280, true));
    cards.push(card('Leads per month', 'Opportunities reported by Straight-in. Line = 3-month rolling average; dashed = goal of ' + T.leadsPerMonth + '/month.', 'chLeads', 260));
    cards.push(card('Invitations and new connections', 'Activity each month', 'chAct', 260));
    cards.push(card('Built since ' + (since ? mLong(since) : 'launch'), 'Cumulative connections and leads', 'chCum', 260));
    if (D.weeks && D.weeks.length > 1) cards.push(card('Recent weeks', 'Weekly invitations, acceptance rate and leads (live reports since ' + mLong(D.liveFrom) + ')', 'chWeeks', 240));
    var accNames = uniq(D.accounts.map(function (a) { return a.account; }));
    if (accNames.length > 1) cards.push(card('By LinkedIn account', 'Live months · acceptance rate (line) and leads (bars) per account', 'chAcc', 260, false, accTable(accNames)));

    var tp = talkingPoints(S, ms);
    root.innerHTML = '<div class="card camp">' +
      '<div class="camp-head"><div><h2><i class="fas fa-flag-checkered"></i> Where we stand in this campaign</h2>' +
      '<div class="camp-sub">' + esc(D.name) + (D.campaigns.length > 1 ? ' · ' + D.campaigns.length + ' LinkedIn accounts (' + esc(D.campaigns.join(' + ')) + ')' : '') + ' · campaign since <b>' + (D.start ? mLong(D.start) : '—') + '</b> · last report ' + esc(D.lastReport || '—') + '</div></div>' +
      '<div class="camp-tools">' + seg + tools + '</div></div>' +
      '<div class="camp-tiles">' + tiles + '</div>' +
      '<div class="camp-tp"><div class="camp-tp-h"><i class="fas fa-comment-dots"></i> Talking points for the call</div><ul id="campTp">' + tp.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>' +
      '<div class="camp-grid">' + cards.join('') + '</div>' +
      '<details class="camp-table"' + (ms.length <= 12 ? ' open' : '') + '><summary>Month by month (' + ms.length + ' months)</summary>' + monthTable(ms, S) + '</details>' +
      '<p class="camp-note">Months before ' + mLong(D.liveFrom) + ' come from the Straight-in history sheet; later months from the weekly Straight-in reports collected here. ' +
      (ms.some(function (m) { return m.partial; }) ? 'The current month is <i>in progress</i> (hollow point / light bar) and is left out of the per-month averages. ' : '') +
      'Averages per month use full months only; the acceptance rate is weighted (total accepted ÷ total sent).</p></div>';

    document.querySelectorAll('#campRange button').forEach(function (b) { b.onclick = function () { range = b.getAttribute('data-r'); try { localStorage.setItem('gc_camp_range', range); } catch (e) {} render(); }; });
    document.getElementById('campCall').onclick = function () { document.body.classList.toggle('call-mode'); this.classList.toggle('primary'); setTimeout(function () { charts.forEach(function (c) { c.resize(); }); }, 60); };
    document.getElementById('campCopy').onclick = function () {
      var txt = D.name + ' — campaign ' + rangeLbl + '\n' + tp.map(function (t) { return '• ' + t.replace(/<[^>]+>/g, ''); }).join('\n');
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { flash('Talking points copied'); }, function () { window.prompt('Copy the talking points', txt); });
    };
    document.getElementById('campCsv').onclick = function () { csv(ms); };
    if (document.body.classList.contains('call-mode')) document.getElementById('campCall').classList.add('primary');
    draw(ms, S, accNames);
  }

  function card(title, sub, id, h, wide, extra) {
    return '<section class="cc' + (wide ? ' wide' : '') + '"><h3>' + esc(title) + '</h3><p>' + esc(sub) + '</p><div class="cc-chart" style="height:' + h + 'px"><canvas id="' + id + '" role="img" aria-label="' + esc(title) + '"></canvas></div>' + (extra || '') + '</section>';
  }
  function uniq(a) { var o = []; a.forEach(function (x) { if (o.indexOf(x) < 0) o.push(x); }); return o; }

  function talkingPoints(S, ms) {
    var T = D.targets, B = D.benchmarks, out = [];
    var first = ms[0] ? mLong(ms[0].month) : '';
    out.push('Since ' + first + ' we sent <b>' + fmt(S.sent) + '</b> personalised invitations; <b>' + fmt(S.accepted) + '</b> decision-makers accepted (<b>' + f1(S.rate) + '%</b>) and <b>' + fmt(S.opps) + '</b> leads came out of it.');
    if (S.rate != null) out.push('Acceptance rate ' + f1(S.rate) + '% — ' + (S.rate >= B.acceptanceRate ? 'above' : S.rate >= T.acceptRate ? 'above our ' + T.acceptRate + '% target, below' : 'below our ' + T.acceptRate + '% target and below') + ' the ' + B.acceptanceRate + '% average across ' + B.clientsRun + ' Gershon campaigns.');
    if (S.avgOpps != null) out.push('On average <b>' + f1(S.avgOpps) + ' leads a month</b> against a goal of ' + T.leadsPerMonth + (S.monthsAtGoal ? '; the goal was reached in ' + S.monthsAtGoal + ' of ' + S.full + ' full months.' : '.'));
    if (S.l3.length === 3 && S.l3Rate != null && S.rate != null) {
      var d = S.l3Rate - S.rate;
      out.push('Last 3 months (' + mL(S.l3[0].month) + '–' + mL(S.l3[2].month) + '): ' + f1(S.l3Rate) + '% acceptance and ' + f1(S.l3Opps) + ' leads/month — ' + (Math.abs(d) < 1 ? 'in line with' : d > 0 ? 'better than' : 'below') + (range === 'all' ? ' the campaign average.' : ' the average of the period.'));
    }
    if (S.perLead) out.push('About 1 lead for every ' + Math.round(S.perLead) + ' new connections, so each month\'s ' + fmt(S.avgAcc) + ' new connections are worth roughly ' + f1(S.avgAcc / S.perLead) + ' leads.');
    if (S.bestOpps && S.bestOpps.opportunities > 0) out.push('Best month for leads: <b>' + mLong(S.bestOpps.month) + '</b> with ' + fmt(S.bestOpps.opportunities) + ' leads' + (S.bestRate ? '; best acceptance: ' + mLong(S.bestRate.month) + ' at ' + f1(S.bestRate.accepted / S.bestRate.sent * 100) + '%.' : '.'));
    var cur = ms.filter(function (m) { return m.partial; })[0];
    if (cur && (cur.sent || cur.opportunities)) out.push(mLong(cur.month) + ' so far: ' + fmt(cur.sent) + ' invitations, ' + fmt(cur.accepted) + ' accepted (' + f1(pct(cur.accepted, cur.sent)) + '%), ' + fmt(cur.opportunities) + ' leads.');
    if (D.pipeline) out.push('Streak pipeline today: ' + fmt(D.pipeline.activeLeads) + ' active prospects, ' + fmt(D.pipeline.meetingsTotal) + ' at meeting stage or beyond' + (D.pipeline.won ? ', ' + fmt(D.pipeline.won) + ' won' : '') + '.');
    return out;
  }

  function monthTable(ms, S) {
    var T = D.targets, cA = 0, cO = 0;
    var rows = ms.map(function (m) { cA += m.accepted; cO += m.opportunities; return { m: m, cA: cA, cO: cO }; }).reverse();
    var rc = function (r) { return r == null ? '' : r >= T.acceptRate ? 'g' : 'r'; };
    var head = '<tr><th>Month</th><th class="n">Invitations</th><th class="n">Accepted</th><th class="n">Acceptance</th><th class="n">Leads</th><th class="n">vs goal</th>' + (ms.some(function (m) { return m.streakNew != null; }) ? '<th class="n">New in Streak</th>' : '') + '<th class="n">Connections to date</th><th class="n">Leads to date</th></tr>';
    var streak = ms.some(function (m) { return m.streakNew != null; });
    var avg = '<tr class="avg"><td>Average / month</td><td class="n">' + fmt(S.avgSent) + '</td><td class="n">' + fmt(S.avgAcc) + '</td><td class="n ' + rc(S.rate) + '">' + f1(S.rate) + '%</td><td class="n">' + f1(S.avgOpps) + '</td><td class="n">' + (S.avgOpps == null ? '—' : Math.round(S.avgOpps / T.leadsPerMonth * 100) + '%') + '</td>' + (streak ? '<td></td>' : '') + '<td></td><td></td></tr>';
    var body = rows.map(function (x) {
      var m = x.m, r = pct(m.accepted, m.sent);
      return '<tr' + (m.partial ? ' class="part"' : '') + '><td>' + mLong(m.month) + (m.partial ? ' <i>(in progress)</i>' : '') + '</td><td class="n">' + fmt(m.sent) + '</td><td class="n">' + fmt(m.accepted) + '</td><td class="n ' + rc(r) + '">' + (r == null ? '—' : f1(r) + '%') + '</td><td class="n"><b>' + fmt(m.opportunities) + '</b></td><td class="n">' + (m.partial ? '—' : Math.round(m.opportunities / T.leadsPerMonth * 100) + '%') + '</td>' + (streak ? '<td class="n">' + (m.streakNew == null ? '—' : fmt(m.streakNew)) + '</td>' : '') + '<td class="n">' + fmt(x.cA) + '</td><td class="n">' + fmt(x.cO) + '</td></tr>';
    }).join('');
    return '<div class="tbl-wrap"><table class="camp-tbl">' + head + avg + body + '</table></div>';
  }

  function accTable(names) {
    var rows = names.map(function (n) {
      var a = D.accounts.filter(function (x) { return x.account === n; });
      var s = sum(a, 'sent'), ac = sum(a, 'accepted'), o = sum(a, 'opportunities'), sk = a.some(function (x) { return x.streakNew != null; }) ? sum(a, 'streakNew') : null;
      var r = pct(ac, s);
      return '<tr><td><b>' + esc(n) + '</b></td><td class="n">' + fmt(s) + '</td><td class="n">' + fmt(ac) + '</td><td class="n ' + (r == null ? '' : r >= D.targets.acceptRate ? 'g' : 'r') + '">' + (r == null ? '—' : f1(r) + '%') + '</td><td class="n">' + fmt(o) + '</td><td class="n">' + (sk == null ? '—' : fmt(sk)) + '</td></tr>';
    }).join('');
    return '<div class="tbl-wrap"><table class="camp-tbl sm"><tr><th>Account (since ' + mL(D.liveFrom) + ')</th><th class="n">Invitations</th><th class="n">Accepted</th><th class="n">Acceptance</th><th class="n">Leads</th><th class="n">New in Streak</th></tr>' + rows + '</table></div>';
  }

  function draw(ms, S, accNames) {
    if (!window.Chart) return;
    var T = D.targets, B = D.benchmarks;
    Chart.defaults.font.family = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
    Chart.defaults.color = MUT;
    var labels = ms.map(function (m) { return mL(m.month) + (m.partial ? '*' : ''); });
    var base = function (o) {
      var b = { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
        plugins: { legend: { position: 'top', align: 'start', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true } }, tooltip: { backgroundColor: '#1d1d1f', padding: 10 } },
        scales: { x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 14 } }, y: { beginAtZero: true, grid: { color: GRID }, border: { display: false } } } };
      for (var k in (o || {})) b[k] = o[k];
      return b;
    };
    var flat = function (label, v, color, dash) { return { type: 'line', label: label, data: ms.map(function () { return v; }), borderColor: color, borderDash: dash || [6, 4], borderWidth: 1.5, pointRadius: 0, pointHoverRadius: 0, fill: false }; };
    var mk = function (id, cfg) { var el = document.getElementById(id); if (el) charts.push(new Chart(el, cfg)); };
    var pctTip = { callbacks: { label: function (c) { return ' ' + c.dataset.label + ': ' + (c.parsed.y == null ? '—' : f1(c.parsed.y) + '%'); } } };
    var partialPt = function (color) { return ms.map(function (m) { return m.partial ? '#fff' : color; }); };

    // Acceptance rate — a month can show more acceptances than invitations (earlier invitations accepted later): cap the axis at 70% so one outlier does not flatten the chart; the tooltip keeps the real value.
    var rateCap = ms.some(function (m) { return m.sent > 0 && m.accepted / m.sent > .7; }) ? 70 : undefined;
    mk('chRate', { type: 'line', data: { labels: labels, datasets: [
      { label: 'Acceptance rate', data: ms.map(function (m) { return pct(m.accepted, m.sent); }), borderColor: RED, backgroundColor: 'rgba(254,27,4,.10)', fill: true, borderWidth: 2.5, tension: .25, pointRadius: 3.5, pointHoverRadius: 6, pointBackgroundColor: partialPt(RED), pointBorderColor: RED, spanGaps: true },
      flat('Campaign average (' + f1(S.rate) + '%)', S.rate, '#1d1d1f'),
      flat('Target (' + T.acceptRate + '%)', T.acceptRate, GREEN, [2, 3]),
      flat('Gershon average (' + B.acceptanceRate + '%)', B.acceptanceRate, GREY, [8, 4])] },
      options: base({ plugins: { legend: { position: 'top', align: 'start', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true } }, tooltip: Object.assign({ backgroundColor: '#1d1d1f', padding: 10 }, pctTip) },
        scales: { x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 14 } }, y: { beginAtZero: true, suggestedMax: 50, max: rateCap, grid: { color: GRID }, border: { display: false }, ticks: { callback: function (v) { return v + '%'; } } } } }) });

    // Leads
    var roll = ms.map(function (m, i) { var w = ms.slice(Math.max(0, i - 2), i + 1).filter(function (x) { return !x.partial; }); return m.partial || !w.length ? null : Math.round(sum(w, 'opportunities') / w.length * 10) / 10; });
    var leadsDs = [
      { type: 'bar', label: 'Leads', data: ms.map(function (m) { return m.opportunities; }), backgroundColor: ms.map(function (m) { return m.partial ? 'rgba(184,131,0,.35)' : GOLD; }), borderRadius: 4, maxBarThickness: 26, order: 3 },
      { type: 'line', label: '3-month average', data: roll, borderColor: '#1d1d1f', borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: .3, spanGaps: true, order: 1 },
      Object.assign(flat('Goal (' + T.leadsPerMonth + '/month)', T.leadsPerMonth, GREEN, [2, 3]), { order: 0 })];
    if (ms.some(function (m) { return m.streakNew != null; })) leadsDs.splice(1, 0, { type: 'bar', label: 'New in Streak', data: ms.map(function (m) { return m.streakNew; }), backgroundColor: 'rgba(74,123,192,.55)', borderRadius: 4, maxBarThickness: 26, order: 4, hidden: false });
    mk('chLeads', { type: 'bar', data: { labels: labels, datasets: leadsDs }, options: base() });

    // Activity
    mk('chAct', { type: 'bar', data: { labels: labels, datasets: [
      { label: 'Invitations', data: ms.map(function (m) { return m.sent; }), backgroundColor: ms.map(function (m) { return m.partial ? 'rgba(74,123,192,.35)' : BLUE; }), borderRadius: 4, maxBarThickness: 22 },
      { label: 'Accepted', data: ms.map(function (m) { return m.accepted; }), backgroundColor: ms.map(function (m) { return m.partial ? 'rgba(254,27,4,.35)' : RED; }), borderRadius: 4, maxBarThickness: 22 }] }, options: base() });

    // Cumulative
    var cA = 0, cO = 0;
    var cum = ms.map(function (m) { cA += m.accepted; cO += m.opportunities; return [cA, cO]; });
    mk('chCum', { type: 'line', data: { labels: labels, datasets: [
      { label: 'Connections (to date)', data: cum.map(function (x) { return x[0]; }), borderColor: RED, backgroundColor: 'rgba(254,27,4,.10)', fill: true, borderWidth: 2, tension: .3, pointRadius: 2, yAxisID: 'y' },
      { label: 'Leads (to date)', data: cum.map(function (x) { return x[1]; }), borderColor: GOLD, borderWidth: 2.5, tension: .3, pointRadius: 2, yAxisID: 'y1' }] },
      options: base({ scales: { x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 12 } }, y: { beginAtZero: true, grid: { color: GRID }, border: { display: false }, title: { display: true, text: 'connections' } }, y1: { beginAtZero: true, position: 'right', grid: { display: false }, border: { display: false }, title: { display: true, text: 'leads' } } } }) });

    // Weeks
    if (D.weeks && D.weeks.length > 1) {
      var W = D.weeks;
      mk('chWeeks', { type: 'bar', data: { labels: W.map(function (w) { return w.weekStart.slice(5).replace('-', '/'); }), datasets: [
        { type: 'bar', label: 'Invitations', data: W.map(function (w) { return w.sent; }), backgroundColor: 'rgba(74,123,192,.55)', borderRadius: 4, maxBarThickness: 20, yAxisID: 'y' },
        { type: 'bar', label: 'Leads', data: W.map(function (w) { return w.opportunities; }), backgroundColor: GOLD, borderRadius: 4, maxBarThickness: 20, yAxisID: 'y2' },
        { type: 'line', label: 'Acceptance %', data: W.map(function (w) { return pct(w.accepted, w.sent); }), borderColor: RED, borderWidth: 2, pointRadius: 3, tension: .25, yAxisID: 'y1', spanGaps: true }] },
        options: base({ plugins: { legend: { position: 'top', align: 'start', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true } }, tooltip: { backgroundColor: '#1d1d1f', padding: 10, callbacks: { label: function (c) { return ' ' + c.dataset.label + ': ' + (c.dataset.yAxisID === 'y1' ? f1(c.parsed.y) + '%' : fmt(c.parsed.y)); } } } },
          scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: GRID }, border: { display: false }, title: { display: true, text: 'invitations' } }, y2: { display: false, beginAtZero: true, suggestedMax: 6 }, y1: { beginAtZero: true, suggestedMax: 50, position: 'right', grid: { display: false }, border: { display: false }, ticks: { callback: function (v) { return v + '%'; } } } } }) });
    }

    // Accounts
    if (accNames.length > 1) {
      var am = uniq(D.accounts.map(function (a) { return a.month; })).sort();
      var colors = [RED, BLUE, GOLD, GREY];
      var ds = [];
      accNames.forEach(function (n, i) {
        var rows = am.map(function (k) { return D.accounts.filter(function (a) { return a.account === n && a.month === k; })[0] || null; });
        ds.push({ type: 'bar', label: n + ' · leads', data: rows.map(function (r) { return r ? r.opportunities : null; }), backgroundColor: colors[i % 4] + '99', borderRadius: 4, maxBarThickness: 22, yAxisID: 'y' });
        ds.push({ type: 'line', label: n + ' · acceptance %', data: rows.map(function (r) { return r ? pct(r.accepted, r.sent) : null; }), borderColor: colors[i % 4], borderWidth: 2, pointRadius: 3, tension: .25, yAxisID: 'y1', spanGaps: true });
      });
      mk('chAcc', { type: 'bar', data: { labels: am.map(mL), datasets: ds }, options: base({ plugins: { legend: { position: 'top', align: 'start', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true } }, tooltip: { backgroundColor: '#1d1d1f', padding: 10, callbacks: { label: function (c) { return ' ' + c.dataset.label + ': ' + (c.dataset.yAxisID === 'y1' ? f1(c.parsed.y) + '%' : fmt(c.parsed.y)); } } } },
        scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: GRID }, border: { display: false }, title: { display: true, text: 'leads' }, ticks: { precision: 0 } }, y1: { beginAtZero: true, suggestedMax: 50, position: 'right', grid: { display: false }, border: { display: false }, ticks: { callback: function (v) { return v + '%'; } } } } }) });
    }
  }

  function csv(ms) {
    var lines = [['Month', 'Invitations', 'Accepted', 'Acceptance %', 'Leads', 'New in Streak', 'In progress'].join(',')];
    ms.forEach(function (m) { lines.push([m.month, m.sent, m.accepted, pct(m.accepted, m.sent) == null ? '' : pct(m.accepted, m.sent), m.opportunities, m.streakNew == null ? '' : m.streakNew, m.partial ? 'yes' : ''].join(',')); });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }));
    a.download = '#' + D.no + ' ' + D.name + ' - campaign.csv';
    document.body.appendChild(a); a.click(); a.remove();
  }
  function flash(t) { var el = document.getElementById('toast'); if (!el) return; el.textContent = t; el.classList.add('show'); setTimeout(function () { el.classList.remove('show'); }, 2500); }

  function injectCss() {
    var css = [
      '.camp{margin-bottom:22px}',
      '.camp-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;margin-bottom:16px}',
      '.camp-head h2{margin:0;font-size:18px;font-weight:800;letter-spacing:-.01em}.camp-head h2 i{color:var(--brand);margin-right:6px}',
      '.camp-sub{color:var(--text-muted);font-size:12.5px;margin-top:3px}',
      '.camp-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center}',
      '.camp-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px}',
      '.ct{border:1px solid var(--border);border-radius:12px;padding:14px 16px;background:#fff}',
      '.ct.good{border-top:4px solid var(--success)}.ct.bad{border-top:4px solid var(--brand)}',
      '.ct-l{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted)}',
      '.ct-v{font-size:30px;font-weight:800;letter-spacing:-.02em;line-height:1.15;margin-top:4px}',
      '.ct.good .ct-v{color:var(--success)}.ct.bad .ct-v{color:var(--brand)}',
      '.ct-s{font-size:12px;color:var(--text-muted);margin-top:2px}.ct-x{font-size:12.5px;margin-top:8px;padding-top:8px;border-top:1px solid #f0f0f2}',
      '.ct-up{color:var(--success);font-weight:700;white-space:nowrap}.ct-down{color:var(--brand);font-weight:700;white-space:nowrap}.ct-flat{color:var(--text-muted);white-space:nowrap}',
      '.camp-tp{background:#fafafa;border:1px solid var(--border);border-left:4px solid var(--brand);border-radius:12px;padding:12px 18px;margin-bottom:16px}',
      '.camp-tp-h{font-weight:800;font-size:13px}.camp-tp-h i{color:var(--brand);margin-right:6px}.camp-tp ul{margin:6px 0 0;padding-left:18px}.camp-tp li{margin:4px 0;font-size:13.5px;line-height:1.45}',
      '.camp-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}',
      '.cc{border:1px solid var(--border);border-radius:12px;padding:14px 16px;background:#fff;min-width:0}.cc.wide{grid-column:1/-1}',
      '.cc h3{margin:0;font-size:14.5px;font-weight:800}.cc p{margin:2px 0 8px;color:var(--text-muted);font-size:12px}.cc-chart{position:relative}',
      '.camp-table{margin-top:16px}.camp-table summary{cursor:pointer;font-weight:700;font-size:13px;margin-bottom:8px}',
      '.tbl-wrap{overflow-x:auto}.camp-tbl{width:100%;border-collapse:collapse;font-size:12.5px}.camp-tbl.sm{margin-top:10px}',
      '.camp-tbl th{text-align:left;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-muted);border-bottom:1px solid var(--border);padding:7px 8px;white-space:nowrap}',
      '.camp-tbl td{padding:7px 8px;border-bottom:1px solid #f2f2f4;white-space:nowrap}.camp-tbl .n{text-align:right;font-variant-numeric:tabular-nums}',
      '.camp-tbl td.g{color:var(--success);font-weight:700}.camp-tbl td.r{color:var(--brand);font-weight:700}',
      '.camp-tbl tr.avg td{background:#fff5f5;font-weight:800}.camp-tbl tr.part td{color:var(--text-muted)}',
      '.camp-note{color:var(--text-muted);font-size:11.5px;margin:12px 0 0}',
      '.sec-title{font-size:13px;text-transform:uppercase;letter-spacing:.07em;color:var(--text-muted);margin:6px 0 12px;font-weight:800}.sec-title i{color:var(--brand);margin-right:6px}',
      'body.call-mode .sidebar,body.call-mode .menu-toggle{display:none!important}',
      'body.call-mode .app{grid-template-columns:1fr!important;display:block}body.call-mode main{margin-left:0!important;max-width:none}',
      'body.call-mode .content{max-width:1400px;margin:0 auto}',
      'body.call-mode .ct-v{font-size:36px}body.call-mode .camp-tp li{font-size:15px}',
      '@media(max-width:900px){.camp-grid{grid-template-columns:1fr}.ct-v{font-size:26px}}',
    ].join('\n');
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  }
})();
