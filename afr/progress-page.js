/* ============================================================
   AI FAMILY ROOM — progress.html logic
   Lifted from the original page (behavior unchanged): reads
   localStorage 'afr_v1'; renders the prominent cabinet, XP
   card + level ladder, mission log, per-track badge cabinet;
   wires share-to-clipboard and cross-device recovery (POSTs
   to AFR_CONFIG.scriptUrl). progress.js owns the nav XP chip.
   Aligned to the full 12-badge / 13-mission set so counts
   match missions.html.
   ============================================================ */

var LEVELS = [
  { min: 0,    name: 'Just Arrived',        sub: 'Complete your first mission to begin' },
  { min: 100,  name: 'Getting Settled',     sub: 'You are finding your footing' },
  { min: 300,  name: 'Finding Your People', sub: 'The skills are starting to stack' },
  { min: 600,  name: 'Running Things',      sub: 'You know what you are doing' },
  { min: 1000, name: 'Community Anchor',    sub: 'People come to you for this stuff' },
  { min: 1500, name: 'Fully Loaded',        sub: 'Maximum level. You built this.' },
];

var ALL_MISSIONS = [
  { id: 'm7',  title: 'Weak vs. Strong Prompts',         track: 'Foundations',          xp: 50, badge: 'first-spark',     url: 'mission-7.html' },
  { id: 'm1',  title: 'Turn a Thought into a Message',   track: 'Foundations',          xp: 50, badge: 'voice-activated', url: 'mission-1.html' },
  { id: 'm3',  title: 'Teach Claude Who You Are',        track: 'Foundations',          xp: 50, badge: 'prompt-builder',  url: 'mission-3.html' },
  { id: 'm2',  title: 'Write a Love Note from Memory',   track: 'Build Your Superpower', xp: 50, badge: null,              url: 'mission-2.html' },
  { id: 'm5',  title: 'Brain Dump to Doc in 60 Seconds', track: 'Build Your Superpower', xp: 50, badge: 'page-turner',     url: 'mission-5.html' },
  { id: 'm6',  title: 'Family Stories into a Deck',      track: 'Build Your Superpower', xp: 50, badge: 'story-keeper',    url: 'mission-6.html' },
  { id: 'm8',  title: 'Follow-Up Superpower',            track: 'Build Your Superpower', xp: 50, badge: 'follow-up-queen', url: 'mission-8.html' },
  { id: 'ms1', title: 'The PCS Survival Kit',            track: 'Mil-Spouse',           xp: 50, badge: 'pcs-ready',       url: 'milspouse.html#pcs' },
  { id: 'ms2', title: 'Career Gap Translator',           track: 'Mil-Spouse',           xp: 50, badge: 'career-unlocked', url: 'milspouse.html#career' },
  { id: 'ms3', title: 'The Free Access File',            track: 'Mil-Spouse',           xp: 50, badge: 'base-explorer',   url: 'milspouse.html#parks' },
  { id: 'v1',  title: 'Build Your Transition Brief',     track: 'The Next Mission',     xp: 50, badge: 'self-command',    url: 'next-mission.html' },
  { id: 'p1',  title: 'The Accommodation Translator',    track: 'Parent Intel',         xp: 50, badge: 'translator',      url: 'parent-1.html' },
  { id: 'p2',  title: 'The Hard Conversation Prep',      track: 'Parent Intel',         xp: 50, badge: 'in-the-room',     url: 'parent-2.html' },
];

var BADGES = {
  'first-spark':     { name: 'First Spark',     icon: '🌱', track: 'f', desc: 'You saw the difference between vague and strong.' },
  'voice-activated': { name: 'Voice Activated', icon: '💬', track: 'f', desc: 'You turned a thought into a message that actually works.' },
  'prompt-builder':  { name: 'Prompt Builder',  icon: '✏️', track: 'f', desc: 'You taught Claude who you are. Now it works for you.' },
  'page-turner':     { name: 'Page Turner',     icon: '📄', track: 'g', desc: 'Brain dump to finished document. In under 60 seconds.' },
  'story-keeper':    { name: 'Story Keeper',    icon: '🎤', track: 'g', desc: 'You preserved something that matters.' },
  'follow-up-queen': { name: 'Follow-Up Queen', icon: '🔁', track: 'g', desc: 'The second prompt is where the real magic happens.' },
  'pcs-ready':       { name: 'PCS Ready',       icon: '📦', track: 'm', desc: 'Orders came. You had a plan.' },
  'career-unlocked': { name: 'Career Unlocked', icon: '💼', track: 'm', desc: 'Every move was a skill. AI helped you prove it.' },
  'base-explorer':   { name: 'Base Explorer',   icon: '🏕️', track: 'm', desc: 'You found the good stuff. Now go use it.' },
  'self-command':    { name: 'Independent Operations', icon: '⭐', track: 'n', desc: 'You stood up your own civilian operation.' },
  'translator':      { name: 'Translator',      icon: '📝', track: 'p', desc: 'You turned the system\u2019s language into your own.' },
  'in-the-room':     { name: 'In the Room',     icon: '💬', track: 'p', desc: 'You walked into the hard conversation prepared.' },
};

function getState() {
  try { return JSON.parse(localStorage.getItem('afr_v1') || '{}'); }
  catch (e) { return {}; }
}
function getLevel(xp) {
  var l = LEVELS[0];
  for (var i = 0; i < LEVELS.length; i++) { if (xp >= LEVELS[i].min) l = LEVELS[i]; }
  return l;
}
function levelProgress(xp) {
  var lv = getLevel(xp), idx = LEVELS.indexOf(lv);
  if (idx >= LEVELS.length - 1) return 100;
  var next = LEVELS[idx + 1];
  return Math.min(100, Math.round(((xp - lv.min) / (next.min - lv.min)) * 100));
}
function xpToNext(xp) {
  var lv = getLevel(xp), idx = LEVELS.indexOf(lv);
  if (idx >= LEVELS.length - 1) return 0;
  return LEVELS[idx + 1].min - xp;
}

function renderXP(state) {
  var xp = state.xp || 0, lv = getLevel(xp), pct = levelProgress(xp), nxt = xpToNext(xp);
  document.getElementById('xp-level-name').textContent = lv.name;
  document.getElementById('xp-level-sub').textContent = lv.sub;
  document.getElementById('xp-number').innerHTML = xp + ' <span>XP earned</span>';
  document.getElementById('xp-bar-fill').style.width = pct + '%';
  document.getElementById('xp-bar-left').textContent = nxt > 0 ? nxt + ' XP to next level' : 'Maximum level reached!';
  document.getElementById('xp-bar-right').textContent = pct + '%';

  var ladder = document.getElementById('level-ladder'), lhtml = '';
  LEVELS.forEach(function (level) {
    var cls = xp >= level.min ? (lv.name === level.name ? 'level-rung current' : 'level-rung done') : 'level-rung';
    lhtml += '<div class="' + cls + '"><span class="level-rung-name">' + level.name + '</span>';
    lhtml += '<span class="level-rung-xp">' + level.min + ' XP</span></div>';
  });
  ladder.innerHTML = lhtml;
}

function renderMissions(state) {
  var completed = state.missionsCompleted || [];
  var list = document.getElementById('mission-list'), html = '';
  ALL_MISSIONS.forEach(function (m) {
    var done = completed.includes(m.id);
    html += '<div class="mc-row ' + (done ? 'done' : 'pending') + '">';
    html += '<div class="mc-check">' + (done ? '✓' : '—') + '</div>';
    html += '<div class="mc-info"><div class="mc-title">' + m.title + '</div>';
    html += '<div class="mc-track">' + m.track + ' Track</div></div>';
    if (done) html += '<span class="mc-xp-tag">+' + m.xp + ' XP</span>';
    else html += '<a href="' + m.url + '" class="mc-start">Start →</a>';
    html += '</div>';
  });
  list.innerHTML = html;
}

function badgeSlot(slug, isEarned, prominent) {
  var b = BADGES[slug];
  var h = '<div class="badge-slot ' + (isEarned ? 'earned' : 'locked') + (prominent ? ' prominent' : '') + '" data-slug="' + slug + '">';
  h += '<span class="b-icon-lg">' + b.icon + '</span>';
  h += '<div class="b-name">' + b.name + '</div>';
  h += '<div class="b-hint-text">' + (isEarned ? '✓ Earned' : b.desc) + '</div>';
  h += '</div>';
  return h;
}

function renderBadges(state) {
  var earned = state.badges || state.badgesEarned || [];
  document.getElementById('badge-count').textContent = earned.length;

  // Prominent top cabinet — all badges, earned first
  var top = document.getElementById('top-cabinet');
  if (top) {
    var order = Object.keys(BADGES).slice().sort(function (a, b) {
      return (earned.includes(b) ? 1 : 0) - (earned.includes(a) ? 1 : 0);
    });
    top.innerHTML = order.map(function (slug) { return badgeSlot(slug, earned.includes(slug), true); }).join('');
  }

  // Per-track rows
  var tracks = {
    f: document.getElementById('badges-foundations'),
    g: document.getElementById('badges-glow'),
    m: document.getElementById('badges-milspouse'),
    n: document.getElementById('badges-next-mission'),
    p: document.getElementById('badges-parents'),
  };
  Object.keys(tracks).forEach(function (track) {
    if (!tracks[track]) return;
    var html = '';
    Object.keys(BADGES).forEach(function (slug) {
      if (BADGES[slug].track !== track) return;
      html += badgeSlot(slug, earned.includes(slug), false);
    });
    tracks[track].innerHTML = html;
  });
}

/* ── Share progress ── */
var shareBtn = document.getElementById('share-btn');
if (shareBtn) shareBtn.addEventListener('click', function () {
  var state = getState(), xp = state.xp || 0, lv = getLevel(xp);
  var badges = state.badges || [], missions = state.missionsCompleted || [];
  var text =
    'AI Family Room — My Progress\n\n' +
    'Level: ' + lv.name + ' (' + xp + ' XP)\n' +
    'Missions complete: ' + missions.length + ' of ' + ALL_MISSIONS.length + '\n' +
    'Badges earned: ' + badges.length + ' of 12\n\n' +
    'Built with EdJustice Collective\n' +
    'https://aifamilyroom.com/';
  navigator.clipboard.writeText(text).then(function () {
    var msg = document.getElementById('share-msg');
    msg.classList.add('show');
    setTimeout(function () { msg.classList.remove('show'); }, 3000);
  }).catch(function () {});
});

/* ── Cross-device recovery (POST to AFR_CONFIG.scriptUrl) ── */
var recoveryBtn = document.getElementById('recovery-btn');
if (recoveryBtn) recoveryBtn.addEventListener('click', function () {
  var emailInput = document.getElementById('recovery-email');
  var msg = document.getElementById('recovery-msg');
  var btn = this;
  var email = (emailInput.value || '').trim().toLowerCase();

  if (!email || !email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
    msg.textContent = 'Please enter a valid email address.';
    msg.style.color = '#C44D2E'; msg.classList.add('show'); return;
  }
  var cfg = window.AFR_CONFIG || {};
  if (!cfg.scriptUrl) {
    msg.textContent = 'Recovery service is not configured yet. Try again later.';
    msg.style.color = '#C44D2E'; msg.classList.add('show'); return;
  }
  btn.disabled = true;
  var origText = btn.innerHTML;
  btn.innerHTML = 'Looking up…';
  msg.textContent = ''; msg.classList.remove('show');

  fetch(cfg.scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ token: cfg.token || '', type: 'recover', email: email })
  })
  .then(function (r) { return r.json(); })
  .then(function (data) {
    btn.disabled = false; btn.innerHTML = origText;
    if (!data || !data.ok) {
      msg.textContent = 'No saved progress found for that email. Start a mission to begin.';
      msg.style.color = '#8A6B0F'; msg.classList.add('show'); return;
    }
    var missionCount = (data.missions || []).length;
    var badgeCount = (data.badges || []).length;
    if (missionCount === 0 && badgeCount === 0) {
      msg.textContent = 'No saved progress found for that email. Start a mission to begin.';
      msg.style.color = '#8A6B0F'; msg.classList.add('show'); return;
    }
    var s = {};
    try { s = JSON.parse(localStorage.getItem('afr_v1') || '{}'); } catch (e) {}
    s.email = email;
    s.name = data.name || s.name || '';
    s.xp = Math.max(s.xp || 0, data.xp || 0);
    s.missionsCompleted = Array.from(new Set([].concat(s.missionsCompleted || [], data.missions || [])));
    s.badges = Array.from(new Set([].concat(s.badges || [], data.badges || [])));
    s.tracks = s.tracks || [];
    if (['m7', 'm1', 'm3'].every(function (id) { return s.missionsCompleted.indexOf(id) > -1; })) {
      if (s.tracks.indexOf('foundations') === -1) s.tracks.push('foundations');
    }
    if (['m2', 'm5', 'm6', 'm8'].every(function (id) { return s.missionsCompleted.indexOf(id) > -1; })) {
      if (s.tracks.indexOf('glow') === -1) s.tracks.push('glow');
    }
    if (['ms1', 'ms2', 'ms3'].every(function (id) { return s.missionsCompleted.indexOf(id) > -1; })) {
      if (s.tracks.indexOf('milspouse') === -1) s.tracks.push('milspouse');
    }
    s.lastActive = new Date().toISOString();
    if (!s.joinedAt) s.joinedAt = data.lastActive || new Date().toISOString();
    localStorage.setItem('afr_v1', JSON.stringify(s));

    msg.innerHTML = '✓ Welcome back! Restored <strong>' + missionCount + ' mission' +
      (missionCount === 1 ? '' : 's') + '</strong> and <strong>' + badgeCount + ' badge' +
      (badgeCount === 1 ? '' : 's') + '</strong>. Refreshing…';
    msg.style.color = 'var(--ejc-teal-deep)';
    msg.classList.add('show');
    setTimeout(function () { location.reload(); }, 1800);
  })
  .catch(function (err) {
    btn.disabled = false; btn.innerHTML = origText;
    msg.textContent = 'Something went wrong. Please try again in a moment.';
    msg.style.color = '#C44D2E'; msg.classList.add('show');
    console.warn('Recovery error:', err);
  });
});

(function () {
  var state = getState();
  renderXP(state);
  renderMissions(state);
  renderBadges(state);
})();
