/* ============================================================
   AI FAMILY ROOM — missions.html map logic
   Lifted verbatim from the original page (behavior unchanged):
   reads localStorage 'afr_v1', renders the XP strip, mission
   cards into #grid-* containers, and the badge cabinet into
   #badges-* rows. progress.js owns the nav XP chip, so this
   file no longer touches it.
   ============================================================ */

var LEVELS = [
  { min: 0,    name: 'Just Arrived' },
  { min: 100,  name: 'Getting Settled' },
  { min: 300,  name: 'Finding Your People' },
  { min: 600,  name: 'Running Things' },
  { min: 1000, name: 'Community Anchor' },
  { min: 1500, name: 'Fully Loaded' },
];

var MISSIONS = [
  { id: 'm7',  num: '07',   title: 'Weak vs. Strong Prompts',         track: 'foundations',  xp: 50, badge: 'first-spark',     badgeName: 'First Spark',     badgeIcon: '🌱', url: 'mission-7.html' },
  { id: 'm1',  num: '01',   title: 'Turn a Thought into a Message',   track: 'foundations',  xp: 50, badge: 'voice-activated', badgeName: 'Voice Activated', badgeIcon: '💬', url: 'mission-1.html' },
  { id: 'm3',  num: '03',   title: 'Teach Claude Who You Are',        track: 'foundations',  xp: 50, badge: 'prompt-builder',  badgeName: 'Prompt Builder',  badgeIcon: '✏️', url: 'mission-3.html' },
  { id: 'm2',  num: '02',   title: 'Write a Love Note from Memory',   track: 'glow',         xp: 50, badge: null,              badgeName: '',                badgeIcon: '',   url: 'mission-2.html' },
  { id: 'm5',  num: '05',   title: 'Brain Dump to Doc in 60 Seconds', track: 'glow',         xp: 50, badge: 'page-turner',     badgeName: 'Page Turner',     badgeIcon: '📄', url: 'mission-5.html' },
  { id: 'm6',  num: '06',   title: 'Family Stories into a Deck',      track: 'glow',         xp: 50, badge: 'story-keeper',    badgeName: 'Story Keeper',    badgeIcon: '🎤', url: 'mission-6.html' },
  { id: 'm8',  num: '08',   title: 'Follow-Up Superpower',            track: 'glow',         xp: 50, badge: 'follow-up-queen', badgeName: 'Follow-Up Queen', badgeIcon: '🔁', url: 'mission-8.html' },
  { id: 'ms1', num: 'MS-1', title: 'The PCS Survival Kit',            track: 'milspouse',    xp: 50, badge: 'pcs-ready',       badgeName: 'PCS Ready',       badgeIcon: '📦', url: 'milspouse.html#pcs' },
  { id: 'ms2', num: 'MS-2', title: 'Career Gap Translator',           track: 'milspouse',    xp: 50, badge: 'career-unlocked', badgeName: 'Career Unlocked', badgeIcon: '💼', url: 'milspouse.html#career' },
  { id: 'ms3', num: 'MS-3', title: 'The Free Access File',            track: 'milspouse',    xp: 50, badge: 'base-explorer',   badgeName: 'Base Explorer',   badgeIcon: '🏕️', url: 'milspouse.html#parks' },
  { id: 'v1',  num: 'V-1',  title: 'Build Your Transition Brief',     track: 'next-mission', xp: 50, badge: 'self-command',    badgeName: 'Independent Operations', badgeIcon: '⭐', url: 'next-mission.html' },
  { id: 'p1',  num: 'P-1',  title: 'The Accommodation Translator',    track: 'parents',      xp: 50, badge: 'translator',      badgeName: 'Translator',      badgeIcon: '📝', url: 'parent-1.html' },
  { id: 'p2',  num: 'P-2',  title: 'The Hard Conversation Prep',      track: 'parents',      xp: 50, badge: 'in-the-room',     badgeName: 'In the Room',     badgeIcon: '💬', url: 'parent-2.html' },
];

var BADGES = {
  'first-spark':     { name: 'First Spark',     icon: '🌱', track: 'f', desc: 'Complete Mission 7' },
  'voice-activated': { name: 'Voice Activated', icon: '💬', track: 'f', desc: 'Complete Mission 1' },
  'prompt-builder':  { name: 'Prompt Builder',  icon: '✏️', track: 'f', desc: 'Complete Mission 3' },
  'page-turner':     { name: 'Page Turner',     icon: '📄', track: 'g', desc: 'Complete Mission 5' },
  'story-keeper':    { name: 'Story Keeper',    icon: '🎤', track: 'g', desc: 'Complete Mission 6' },
  'follow-up-queen': { name: 'Follow-Up Queen', icon: '🔁', track: 'g', desc: 'Complete Mission 8' },
  'pcs-ready':       { name: 'PCS Ready',       icon: '📦', track: 'm', desc: 'Complete PCS Survival Kit' },
  'career-unlocked': { name: 'Career Unlocked', icon: '💼', track: 'm', desc: 'Complete Career Gap Translator' },
  'base-explorer':   { name: 'Base Explorer',   icon: '🏕️', track: 'm', desc: 'Complete Free Access File' },
  'self-command':    { name: 'Independent Operations', icon: '⭐', track: 'n', desc: 'Complete Build Your Transition Brief' },
  'translator':      { name: 'Translator',      icon: '📝', track: 'p', desc: 'Complete The Accommodation Translator' },
  'in-the-room':     { name: 'In the Room',     icon: '💬', track: 'p', desc: 'Complete The Hard Conversation Prep' },
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

function renderXP(state) {
  var xp = state.xp || 0;
  var lv = getLevel(xp);
  var pct = levelProgress(xp);
  document.getElementById('xp-level-name').textContent = lv.name;
  document.getElementById('xp-strip-xp').textContent = xp + ' XP';
  document.getElementById('xp-strip-fill').style.width = pct + '%';
}

function renderMissions(state) {
  var completed = state.missionsCompleted || [];
  var foundationsCount = ['m7', 'm1', 'm3'].filter(function (id) { return completed.includes(id); }).length;
  var glowUnlocked = foundationsCount >= 2;

  if (glowUnlocked) {
    var gs = document.getElementById('glow-status');
    gs.textContent = 'Available';
    gs.classList.remove('locked'); gs.classList.add('available');
    document.getElementById('glow-hint').innerHTML =
      'Four missions that turn AI into a real assistant. <strong>Unlocked — pick any one.</strong>';
  }

  var grids = {
    foundations: document.getElementById('grid-foundations'),
    glow: document.getElementById('grid-glow'),
    milspouse: document.getElementById('grid-milspouse'),
    'next-mission': document.getElementById('grid-next-mission'),
    parents: document.getElementById('grid-parents'),
  };
  Object.keys(grids).forEach(function (track) { grids[track].innerHTML = ''; });

  MISSIONS.forEach(function (m) {
    var done = completed.includes(m.id);
    var isLocked = (m.track === 'glow') && !glowUnlocked;
    var card = document.createElement(isLocked ? 'div' : 'a');
    if (!isLocked) card.href = m.url;
    card.className = 'm-card' + (done ? ' done' : '') + (isLocked ? ' locked' : '');

    var statusPill = done
      ? '<span class="m-status-pill done">✓ Complete</span>'
      : isLocked
        ? '<span class="m-status-pill locked">🔒 Locked</span>'
        : '<span class="m-status-pill start">Start →</span>';

    var badgeRow = m.badge
      ? '<span class="m-badge"><span class="m-badge-icon">' + m.badgeIcon + '</span>' + m.badgeName + '</span>'
      : '<span class="m-badge" style="color:var(--ejc-light);">No badge</span>';

    card.innerHTML =
      '<div class="m-top">' +
        '<span class="m-num">Mission ' + m.num + '</span>' + statusPill +
      '</div>' +
      '<div class="m-title">' + m.title + '</div>' +
      '<div class="m-meta">' +
        '<span class="m-xp">⚡ +' + m.xp + ' XP</span>' + badgeRow +
      '</div>';

    grids[m.track].appendChild(card);
  });
}

function renderBadges(state) {
  var earned = state.badges || state.badgesEarned || [];
  document.getElementById('badge-count').textContent = earned.length;

  var tracks = {
    f: document.getElementById('badges-foundations'),
    g: document.getElementById('badges-glow'),
    m: document.getElementById('badges-milspouse'),
    n: document.getElementById('badges-next-mission'),
    p: document.getElementById('badges-parents'),
  };
  Object.keys(tracks).forEach(function (track) {
    var html = '';
    Object.keys(BADGES).forEach(function (slug) {
      var b = BADGES[slug];
      if (b.track !== track) return;
      var isEarned = earned.includes(slug);
      html += '<div class="badge-slot ' + (isEarned ? 'earned' : 'locked') + '" data-slug="' + slug + '">';
      html += '<span class="b-icon-lg">' + b.icon + '</span>';
      html += '<div class="b-name">' + b.name + '</div>';
      html += '<div class="b-hint-text">' + (isEarned ? '✓ Earned' : b.desc) + '</div>';
      html += '</div>';
    });
    tracks[track].innerHTML = html;
  });
}

(function () {
  var state = getState();
  renderXP(state);
  renderMissions(state);
  renderBadges(state);
})();
