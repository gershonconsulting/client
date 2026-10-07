// ===== /overview clarity layer (v2) =====
// Loaded right after the inline /overview script. Function declarations below
// replace the inline ones of the same name, so render() picks these up.
// Goal: every number on the page shows its unit, its target and how far it is from it.

function v2Cap(v) { return (v === null || v === undefined) ? null : Math.max(0, Math.min(100, v)); }
function v2r1(n) { return Math.round((n || 0) * 10) / 10; }

function scoreCompany(co) {
  var goal = PERIOD_GOAL[currentPeriod] || 10;
  var sel = svcOf(co);
  var promote = sel.promote ? (co.promoteConfigured ? (co.promotePostsPerDay / TARGET_POSTS_PER_DAY) * 100 : null) : null;
  var network = sel.network ? (co.networkConfigured ? (co.networkAcceptanceRate / TARGET_ACCEPTANCE) * 100 : null) : null;
  var engage  = sel.engage ? (co.periodLeads / goal) * 100 : null;
  // each channel counts for at most 100% so one over-performing channel cannot hide a failing one
  var parts = [promote, network, engage].filter(function(v){ return v !== null; }).map(v2Cap);
  var overall = parts.length ? parts.reduce(function(a,b){ return a+b; }, 0) / parts.length : null;
  return { promote: promote, network: network, engage: engage, overall: overall, goal: goal, sel: sel,
           measured: parts.length, offered: [sel.promote, sel.network, sel.engage].filter(Boolean).length };
}

function v2Bar(pct, b, h) {
  var w = (pct === null || pct === undefined) ? 0 : Math.max(2, Math.min(100, pct));
  h = h || 6;
  return '<div style="height:' + h + 'px;background:#eceef2;border-radius:99px;overflow:hidden"><div style="height:' + h + 'px;width:' + w + '%;background:' + BAND_META[b].color + ';border-radius:99px"></div></div>';
}

function v2Pill(b, txt) {
  var m = BAND_META[b];
  return '<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:' + m.ink + ';background:' + m.wash + ';padding:2px 9px;border-radius:99px;white-space:nowrap"><i class="fas ' + m.icon + '"></i>' + (txt || m.label) + '</span>';
}

function v2Thresh(k, goal) {
  if (k === 'promote') return { good: v2r1(0.8 * TARGET_POSTS_PER_DAY) + ' posts/day or more', warn: v2r1(0.4 * TARGET_POSTS_PER_DAY) + '–' + v2r1(0.8 * TARGET_POSTS_PER_DAY) + ' posts/day', crit: 'under ' + v2r1(0.4 * TARGET_POSTS_PER_DAY) + ' posts/day' };
  if (k === 'network') return { good: Math.round(0.8 * TARGET_ACCEPTANCE) + '% acceptance or more', warn: Math.round(0.4 * TARGET_ACCEPTANCE) + '–' + Math.round(0.8 * TARGET_ACCEPTANCE) + '% acceptance', crit: 'under ' + Math.round(0.4 * TARGET_ACCEPTANCE) + '% acceptance' };
  return { good: v2r1(0.8 * goal) + ' leads or more', warn: v2r1(0.4 * goal) + '–' + v2r1(0.8 * goal) + ' leads', crit: 'under ' + v2r1(0.4 * goal) + ' leads' };
}

function v2Channel(co, s, k) {
  if (!s.sel[k]) return { main: 'Not in plan', sub: 'Client did not buy this channel', pct: null, b: 'none' };
  if (k === 'promote') {
    if (!co.promoteConfigured) return { main: 'No data', sub: 'Social account not linked yet', pct: null, b: 'none' };
    return { main: v2r1(co.promotePostsPerDay) + ' posts / day', sub: 'Target ' + TARGET_POSTS_PER_DAY + ' post / day · ' + fmtNum(co.promoteTotalPosts) + ' posts total', pct: s.promote, b: band(s.promote) };
  }
  if (k === 'network') {
    if (!co.networkConfigured) return { main: 'No data', sub: 'LinkedIn campaign not linked yet', pct: null, b: 'none' };
    return { main: Math.round(co.networkAcceptanceRate) + '% accepted', sub: fmtNum(co.networkAccepted) + ' of ' + fmtNum(co.networkInvitations) + ' invites · target ' + TARGET_ACCEPTANCE + '%', pct: s.network, b: band(s.network) };
  }
  return { main: co.periodLeads + ' of ' + s.goal + ' leads', sub: 'New leads · ' + periodLabel(currentPeriod), pct: s.engage, b: band(s.engage) };
}

function v2Cell(c) {
  var muted = c.b === 'none';
  return '<div style="min-width:0">'
    + '<div style="font-size:14px;font-weight:700;color:' + (muted ? '#9aa1ab' : '#111827') + '">' + esc(c.main) + '</div>'
    + '<div style="font-size:11px;color:#6b7280;margin:1px 0 5px">' + esc(c.sub) + '</div>'
    + (c.pct !== null ? '<div style="display:flex;align-items:center;gap:8px"><div style="flex:1">' + v2Bar(c.pct, c.b) + '</div><span style="font-size:11px;font-weight:700;color:' + BAND_META[c.b].ink + ';white-space:nowrap">' + Math.round(c.pct) + '% of target</span></div>' : '')
    + '</div>';
}

function renderLegend() {
  var el = document.getElementById('rag-legend'); if (!el) return;
  el.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end">'
    + v2Pill('good', 'Good = 80%+ of target') + v2Pill('warn', 'OK = 40–79%') + v2Pill('crit', 'Off track = under 40%') + v2Pill('none', 'No data / not in plan') + '</div>';
}

function renderHero(rows, data) {
  var goal = PERIOD_GOAL[currentPeriod] || 10;
  var cnt = { good: 0, warn: 0, crit: 0, none: 0 }, critNames = [];
  rows.forEach(function(r) { var b = band(r.s.overall); cnt[b]++; if (b === 'crit') critNames.push(r.co.name); });
  var engageClients = rows.filter(function(r){ return r.s.sel.engage; }).length;
  var leadTarget = Math.round(goal * engageClients);
  var leads = data.totalPeriodLeads || 0;
  var leadPct = leadTarget ? leads / leadTarget * 100 : null;
  var inv = 0, acc = 0;
  rows.forEach(function(r) { if (r.s.sel.network && r.co.networkConfigured) { inv += r.co.networkInvitations || 0; acc += r.co.networkAccepted || 0; } });
  var accRate = inv ? acc / inv * 100 : null;
  var accScore = accRate === null ? null : accRate / TARGET_ACCEPTANCE * 100;
  var scored = rows.filter(function(r){ return r.s.overall !== null; });
  var port = scored.length ? scored.reduce(function(a, r){ return a + r.s.overall; }, 0) / scored.length : null;
  function T(label, big, unit, line1, line2, b, pct) {
    return '<div class="bg-white rounded-xl border border-gray-200 p-4">'
      + '<p style="font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#6b7280">' + label + '</p>'
      + '<p style="margin:6px 0 2px"><span style="font-size:32px;font-weight:800;color:#111827;line-height:1">' + big + '</span><span style="font-size:14px;font-weight:600;color:#6b7280;margin-left:6px">' + unit + '</span></p>'
      + '<p style="font-size:12px;color:#374151;margin-bottom:6px">' + line1 + '</p>'
      + (pct !== null && pct !== undefined ? v2Bar(pct, b, 8) : '')
      + '<p style="font-size:11px;color:#6b7280;margin-top:6px">' + line2 + '</p>'
      + '</div>';
  }
  var html = '';
  html += T('New leads · ' + periodLabel(currentPeriod), leads, 'of ' + leadTarget + ' target',
    v2Pill(band(leadPct), Math.round(leadPct || 0) + '% of target'),
    'Target = ' + goal + ' leads per client × ' + engageClients + ' clients', band(leadPct), leadPct);
  html += T('Clients on track', cnt.good, 'of ' + rows.length + ' clients',
    v2Pill('good', cnt.good + ' good') + ' ' + v2Pill('warn', cnt.warn + ' OK') + ' ' + v2Pill('crit', cnt.crit + ' off track'),
    'On track = overall score 80%+ of target', 'good', rows.length ? cnt.good / rows.length * 100 : 0);
  html += T('Need attention', cnt.crit, cnt.crit === 1 ? 'client' : 'clients',
    v2Pill('crit', 'under 40% of target'),
    critNames.length ? esc(critNames.join(', ')) : 'Nobody — all clients are at 40%+', 'crit', null);
  html += T('LinkedIn acceptance', accRate === null ? 'n/a' : Math.round(accRate) + '%', 'of invites accepted',
    accRate === null ? v2Pill('none') : v2Pill(band(accScore), 'target ' + TARGET_ACCEPTANCE + '%'),
    fmtNum(acc) + ' accepted out of ' + fmtNum(inv) + ' invites, all clients' + (port !== null ? ' · portfolio score ' + Math.round(port) + '%' : ''),
    band(accScore), accScore);
  document.getElementById('hero-tiles').innerHTML = html;
}

function renderChannelHealth(rows) {
  var goal = PERIOD_GOAL[currentPeriod] || 10;
  var defs = [
    { k: 'promote', icon: 'fa-bullhorn', name: 'Promote', what: 'LinkedIn posts per day · target ' + TARGET_POSTS_PER_DAY + '/day' },
    { k: 'network', icon: 'fa-users', name: 'Network', what: 'Invite acceptance rate · target ' + TARGET_ACCEPTANCE + '%' },
    { k: 'engage', icon: 'fa-handshake', name: 'Engage', what: 'New leads · target ' + goal + ' per client (' + periodLabel(currentPeriod) + ')' }
  ];
  var html = '<div style="display:flex;flex-direction:column;gap:14px">';
  defs.forEach(function(d) {
    var groups = { good: [], warn: [], crit: [], none: [] };
    rows.forEach(function(r) { groups[band(r.s[d.k])].push(r.co.name); });
    var th = v2Thresh(d.k, goal);
    var total = rows.length || 1;
    var bar = '<div style="display:flex;height:10px;border-radius:99px;overflow:hidden;background:#eceef2;margin:6px 0">';
    BAND_ORDER.forEach(function(b) { if (groups[b].length) bar += '<div title="' + esc(groups[b].join(', ')) + '" style="width:' + (groups[b].length / total * 100) + '%;background:' + BAND_META[b].color + '"></div>'; });
    bar += '</div>';
    var pills = BAND_ORDER.map(function(b) {
      var desc = b === 'none' ? 'no data / not in plan' : th[b];
      return '<span title="' + esc(groups[b].join(', ') || 'none') + '">' + v2Pill(b, groups[b].length + ' ' + BAND_META[b].label.toLowerCase() + ' <span style="font-weight:400">(' + desc + ')</span>') + '</span>';
    }).join(' ');
    html += '<div>'
      + '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap"><span style="font-size:14px;font-weight:700;color:#111827"><i class="fas ' + d.icon + '" style="color:#6b7280;margin-right:6px"></i>' + d.name + '</span><span style="font-size:12px;color:#6b7280">' + d.what + '</span></div>'
      + bar + '<div style="display:flex;flex-wrap:wrap;gap:6px">' + pills + '</div></div>';
  });
  html += '</div>';
  document.getElementById('channel-health').innerHTML = html;
}

function renderMatrix(rows) {
  var sorted = rows.slice().sort(function(a, b) {
    var av = a.s.overall === null ? -1 : a.s.overall, bv = b.s.overall === null ? -1 : b.s.overall;
    return bv - av || a.co.name.localeCompare(b.co.name);
  });
  var goal = PERIOD_GOAL[currentPeriod] || 10;
  var cols = 'grid-template-columns:minmax(150px,1.3fr) repeat(3,minmax(150px,1fr)) minmax(170px,1.1fr);';
  var H = function(t, s) { return '<div><b style="color:#374151;text-transform:uppercase;letter-spacing:.04em">' + t + '</b><br>' + s + '</div>'; };
  var head = '<div style="display:grid;' + cols + 'gap:16px;padding:8px 6px;border-bottom:1px solid #e5e7eb;font-size:11px;color:#6b7280">'
    + H('Client', 'leads total · campaign age')
    + H('Promote', 'posts per day vs ' + TARGET_POSTS_PER_DAY + '/day')
    + H('Network', 'invites accepted vs ' + TARGET_ACCEPTANCE + '%')
    + H('Engage', 'new leads vs ' + goal + ' (' + periodLabel(currentPeriod) + ')')
    + H('Overall', 'average of channels with data (each max 100%)') + '</div>';
  var body = sorted.map(function(r) {
    var b = band(r.s.overall);
    var overallTxt = r.s.overall === null ? 'No data' : Math.round(r.s.overall) + '%';
    var months = r.co.campaignMonths || 0;
    return '<div style="display:grid;' + cols + 'gap:16px;padding:12px 6px;border-bottom:1px solid #f1f2f4;align-items:start">'
      + '<div><a href="/?company=' + encodeURIComponent(r.co.key) + '" style="font-size:14px;font-weight:700;color:#1e40af">' + esc(r.co.name) + '</a>'
      + '<div style="font-size:11px;color:#6b7280">' + fmtNum(r.co.totalLeads) + ' leads total · ' + months + (months === 1 ? ' month' : ' months') + ' running</div></div>'
      + v2Cell(v2Channel(r.co, r.s, 'promote'))
      + v2Cell(v2Channel(r.co, r.s, 'network'))
      + v2Cell(v2Channel(r.co, r.s, 'engage'))
      + '<div><div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:5px"><span style="font-size:18px;font-weight:800;color:' + BAND_META[b].ink + '">' + overallTxt + '</span>' + v2Pill(b) + '</div>'
      + v2Bar(r.s.overall, b, 8)
      + '<div style="font-size:11px;color:#6b7280;margin-top:4px">Based on ' + r.s.measured + ' of ' + r.s.offered + ' channel' + (r.s.offered === 1 ? '' : 's') + ' in plan</div></div>'
      + '</div>';
  }).join('');
  var html = '<div style="overflow-x:auto"><div style="min-width:900px">' + head + body + '</div></div>';
  ['matrix-chart', 'matrix-table'].forEach(function(id){ var el = document.getElementById(id); if (el) el.innerHTML = html; });
}

function renderMomentum(rows) {
  var now = new Date();
  var items = rows.slice().sort(function(a, b) { return momentumDelta(b.co) - momentumDelta(a.co); });
  var TH = function(t) { return '<div style="font-size:11px;color:#6b7280;font-weight:600;text-transform:uppercase">' + t + '</div>'; };
  var html = '<p style="font-size:12px;color:#374151;margin-bottom:10px">New leads so far this month (day ' + now.getDate() + ') compared with what the same client had at the same point last month.</p>'
    + '<div style="overflow-x:auto"><div style="display:grid;grid-template-columns:minmax(150px,1.4fr) 1fr 1fr 1fr;gap:6px 16px;font-size:13px;align-items:center;min-width:560px">'
    + TH('Client') + TH('This month') + TH('Last month, same point') + TH('Change');
  items.forEach(function(r) {
    var cur = r.co.engageThisMonthLeads || 0;
    var prev = v2r1(pacedPrev(r.co));
    var d = v2r1(cur - prev);
    var b = d > 0 ? 'good' : (d < 0 ? 'crit' : 'none');
    var txt = d > 0 ? '▲ +' + d + ' leads' : (d < 0 ? '▼ ' + d + ' leads' : '= no change');
    html += '<div style="font-weight:600;color:#111827">' + esc(r.co.name) + '</div><div>' + cur + ' leads</div><div style="color:#6b7280">' + prev + ' leads</div><div>' + v2Pill(b, txt) + '</div>';
  });
  html += '</div></div>';
  document.getElementById('momentum').innerHTML = html;
}

// If the data already arrived before this file loaded, redraw with the clearer layout.
try { if (typeof lastData !== 'undefined' && lastData) render(lastData); } catch (e) { console.error('overview-v2', e); }
