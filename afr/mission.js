/* ============================================================
   AI FAMILY ROOM — generic mission completion engine
   One tested engine for every mission page. Behavior matches
   the original per-page inline scripts exactly: writes
   localStorage 'afr_v1', awards mission XP + first-time badge
   XP + track-completion bonus, calls AFR.updateNavXP() and
   AFR.fireSheetPost() (the Sheets/notification automation),
   reveals the Tally embed, badge modal, and share card.

   Each page defines window.AFR_MISSION before this loads:
     window.AFR_MISSION = {
       id: 'm7', title: 'Weak vs. Strong Prompts',
       badge: 'first-spark', badgeName: 'First Spark',
       xp: 50, badgeXp: 100,
       trackBonus: { track:'foundations', missions:['m7','m1','m3'], xp:150 }
     };
   trackBonus may be null. badge may be null (no badge mission).
   Required DOM ids (unchanged from original): complete-btn,
   tally-wrap, badge-overlay, badge-dismiss, share-section.
   ============================================================ */
(function () {
  var M = window.AFR_MISSION;
  if (!M || !M.id) return;

  var completeBtn  = document.getElementById('complete-btn');
  var tallyWrap    = document.getElementById('tally-wrap');
  var overlay      = document.getElementById('badge-overlay');
  var dismiss      = document.getElementById('badge-dismiss');
  var shareSection = document.getElementById('share-section');
  if (!completeBtn) return;

  function read() { try { return JSON.parse(localStorage.getItem('afr_v1') || '{}'); } catch (e) { return {}; } }

  // Already complete? reflect it.
  (function () {
    var s = read();
    if ((s.missionsCompleted || []).indexOf(M.id) > -1) {
      completeBtn.innerHTML = '✅ Mission Complete';
      completeBtn.classList.add('done');
      if (shareSection) shareSection.classList.add('show');
    }
  })();

  completeBtn.addEventListener('click', function () {
    if (this.classList.contains('done')) return;
    try {
      var s = read();
      s.missionsCompleted = s.missionsCompleted || [];
      s.badges = s.badges || [];
      s.tracks = s.tracks || [];
      s.xp = (s.xp || 0) + (M.xp || 50);

      if (s.missionsCompleted.indexOf(M.id) === -1) s.missionsCompleted.push(M.id);

      var badgeEarned = false;
      if (M.badge && s.badges.indexOf(M.badge) === -1) {
        s.badges.push(M.badge);
        s.xp += (M.badgeXp || 100);
        badgeEarned = true;
      }

      if (M.trackBonus && M.trackBonus.missions.every(function (id) {
        return s.missionsCompleted.indexOf(id) > -1;
      })) {
        if (s.tracks.indexOf(M.trackBonus.track) === -1) {
          s.tracks.push(M.trackBonus.track);
          s.xp += (M.trackBonus.xp || 150);
        }
      }

      s.lastActive = new Date().toISOString();
      if (!s.joinedAt) s.joinedAt = new Date().toISOString();
      localStorage.setItem('afr_v1', JSON.stringify(s));

      if (window.AFR && window.AFR.updateNavXP) window.AFR.updateNavXP();
      if (window.AFR && window.AFR.fireSheetPost) window.AFR.fireSheetPost({
        type: 'mission_complete',
        missionId: M.id,
        missionTitle: M.title || '',
        badgeEarned: badgeEarned ? (M.badgeName || M.badge) : '',
        xpTotal: s.xp,
        name: s.name || '', email: s.email || '', installation: s.installation || ''
      });

      this.innerHTML = '✅ Mission Complete';
      this.classList.add('done');
      if (tallyWrap) tallyWrap.classList.add('show');
      if (shareSection) shareSection.classList.add('show');
      setTimeout(function () {
        if (shareSection) shareSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 900);

      if (badgeEarned && overlay) setTimeout(function () { overlay.classList.add('show'); }, 500);

      // lazy-load Tally embed runtime
      if (!document.querySelector('script[src*="tally.so"]')) {
        var t = document.createElement('script');
        t.src = 'https://tally.so/widgets/embed.js';
        t.async = true;
        document.head.appendChild(t);
      }
    } catch (e) { console.warn(e); }
  });

  // generic copy buttons (static .copy-btn[data-copy] on mission pages)
  document.querySelectorAll('.copy-btn[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var txt = this.getAttribute('data-copy');
      if (!txt) return;
      var self = this, orig = this.innerHTML;
      function done() { self.innerHTML = '✓ Copied'; self.classList.add('copied'); setTimeout(function () { self.innerHTML = orig; self.classList.remove('copied'); }, 1800); }
      if (navigator.clipboard) { navigator.clipboard.writeText(txt).then(done).catch(done); } else { done(); }
    });
  });

  if (dismiss && overlay) dismiss.addEventListener('click', function () { overlay.classList.remove('show'); });
  if (overlay) {
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.classList.remove('show'); });
    setTimeout(function () { overlay.classList.remove('show'); }, 10000);
  }
})();
