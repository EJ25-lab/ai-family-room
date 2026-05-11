/* ============================================================
   AI FAMILY ROOM — progress.js
   EdJustice Collective
   localStorage state machine — badges, XP, missions, levels
   ============================================================ */

(function () {
  'use strict';

  // ---- CONSTANTS -----------------------------------------------

  const STORAGE_KEY = 'afr_progress_v1';

  const MISSIONS = {
    m1: { title: 'Turn a Thought into a Message',     track: 'foundations', xp: 50, badge: 'voice-activated',  tool: 'NeuralWriter' },
    m2: { title: 'Write a Love Note from Memory',     track: 'glow',        xp: 50, badge: null,              tool: 'Claude'       },
    m3: { title: 'Teach Claude Who You Are',          track: 'foundations', xp: 50, badge: 'prompt-builder',   tool: 'Claude'       },
    m4: { title: "Design Your First Job for Claude",  track: 'glow',        xp: 50, badge: null,              tool: 'Claude'       },
    m5: { title: 'Brain Dump to Doc in 60 Seconds',   track: 'glow',        xp: 50, badge: 'page-turner',      tool: 'Gamma'        },
    m6: { title: 'Family Stories into a Deck',        track: 'glow',        xp: 50, badge: 'story-keeper',     tool: 'Gamma'        },
    m7: { title: 'Weak vs. Strong Prompts',           track: 'foundations', xp: 50, badge: 'first-spark',      tool: 'Claude'       },
    m8: { title: 'Master the Follow-Up Superpower',   track: 'glow',        xp: 50, badge: 'follow-up-queen',  tool: 'Claude'       },
    ms1:{ title: 'PCS Survival Kit',                  track: 'milspouse',   xp: 50, badge: 'pcs-ready',        tool: 'Claude'       },
    ms2:{ title: 'Career Gap Translator',             track: 'milspouse',   xp: 50, badge: 'career-unlocked',  tool: 'Claude'       },
    ms3:{ title: 'Free Access File',                  track: 'milspouse',   xp: 50, badge: 'base-explorer',    tool: 'Claude'       },
  };

  const BADGES = {
    'first-spark':     { name: 'First Spark',       icon: '🌱', track: 'foundations', mission: 'm7',  desc: 'You sent your first strong prompt. That\'s where everything begins.' },
    'voice-activated': { name: 'Voice Activated',   icon: '💬', track: 'foundations', mission: 'm1',  desc: 'You turned a thought into a message that actually works.' },
    'prompt-builder':  { name: 'Prompt Builder',    icon: '✍️', track: 'foundations', mission: 'm3',  desc: 'You taught an AI who you are. Now it works for you, not a stranger.' },
    'page-turner':     { name: 'Page Turner',        icon: '📄', track: 'glow',        mission: 'm5',  desc: 'Brain dump to finished document. In under 60 seconds.' },
    'story-keeper':    { name: 'Story Keeper',       icon: '🎤', track: 'glow',        mission: 'm6',  desc: 'You preserved something that matters. AI helped you make it beautiful.' },
    'follow-up-queen': { name: 'Follow-Up Queen',   icon: '🔁', track: 'glow',        mission: 'm8',  desc: 'You know the secret: the second prompt is where the real magic happens.' },
    'pcs-ready':       { name: 'PCS Ready',          icon: '📦', track: 'milspouse',   mission: 'ms1', desc: 'Orders came. You had a plan. That\'s not luck — that\'s a system.' },
    'career-unlocked': { name: 'Career Unlocked',   icon: '💼', track: 'milspouse',   mission: 'ms2', desc: 'Every move was a skill. AI just helped you prove it.' },
    'base-explorer':   { name: 'Base Explorer',      icon: '🏕️', track: 'milspouse',   mission: 'ms3', desc: 'You found the free stuff. Now go use it with your family.' },
  };

  const TRACKS = {
    foundations: { name: 'Foundations',      missions: ['m7','m1','m3'],     bonusXp: 150 },
    glow:        { name: 'Glow Up',           missions: ['m2','m5','m6','m8'], bonusXp: 150 },
    milspouse:   { name: 'Mil-Spouse Intel',  missions: ['ms1','ms2','ms3'],   bonusXp: 150 },
  };

  const LEVELS = [
    { min: 0,    max: 99,   name: 'Just Arrived' },
    { min: 100,  max: 299,  name: 'Getting Settled' },
    { min: 300,  max: 599,  name: 'Finding Your People' },
    { min: 600,  max: 999,  name: 'Running Things' },
    { min: 1000, max: 1499, name: 'Community Anchor' },
    { min: 1500, max: 1800, name: 'Fully Loaded' },
  ];

  // ---- DEFAULT STATE -------------------------------------------

  function defaultState() {
    return {
      name: '',
      email: '',
      installation: '',
      xp: 0,
      missionsCompleted: [],
      badgesEarned: [],
      tracksCompleted: [],
      joinedAt: null,
      lastActive: null,
    };
  }

  // ---- STORAGE -------------------------------------------------

  function getState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Object.assign(defaultState(), JSON.parse(raw)) : defaultState();
    } catch (e) {
      return defaultState();
    }
  }

  function setState(state) {
    try {
      state.lastActive = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('AFR: localStorage write failed', e);
    }
  }

  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
  }

  // ---- LEVEL ---------------------------------------------------

  function getLevel(xp) {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].min) return LEVELS[i];
    }
    return LEVELS[0];
  }

  function getNextLevel(xp) {
    const current = getLevel(xp);
    const idx = LEVELS.indexOf(current);
    return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
  }

  function xpToNextLevel(xp) {
    const next = getNextLevel(xp);
    return next ? next.min - xp : 0;
  }

  function levelProgress(xp) {
    const current = getLevel(xp);
    const next = getNextLevel(xp);
    if (!next) return 100;
    const range = next.min - current.min;
    const earned = xp - current.min;
    return Math.min(100, Math.round((earned / range) * 100));
  }

  // ---- UNLOCK LOGIC -------------------------------------------

  function isMissionUnlocked(missionId, state) {
    const mission = MISSIONS[missionId];
    if (!mission) return false;

    // Foundations + milspouse always unlocked
    if (mission.track === 'foundations') return true;
    if (mission.track === 'milspouse') return true;

    // Glow Up: requires 2 foundations missions completed
    if (mission.track === 'glow') {
      const foundationsCompleted = state.missionsCompleted.filter(id =>
        MISSIONS[id] && MISSIONS[id].track === 'foundations'
      ).length;
      return foundationsCompleted >= 2;
    }

    return false;
  }

  function getMissionState(missionId, state) {
    if (state.missionsCompleted.includes(missionId)) return 'complete';
    if (isMissionUnlocked(missionId, state)) return 'available';
    return 'locked';
  }

  // ---- COMPLETE MISSION ----------------------------------------

  function markMissionComplete(missionId, userInfo) {
    const state = getState();
    const mission = MISSIONS[missionId];

    if (!mission) return { success: false, error: 'Unknown mission' };
    if (state.missionsCompleted.includes(missionId)) {
      return { success: true, alreadyDone: true };
    }

    // Add mission
    state.missionsCompleted.push(missionId);
    state.xp += mission.xp;

    // Set first-visit timestamp
    if (!state.joinedAt) {
      state.joinedAt = new Date().toISOString();
    }

    // Merge user info if provided
    if (userInfo) {
      if (userInfo.name) state.name = userInfo.name;
      if (userInfo.email) state.email = userInfo.email;
      if (userInfo.installation) state.installation = userInfo.installation;
    }

    // Check badge
    let badgeEarned = null;
    if (mission.badge && !state.badgesEarned.includes(mission.badge)) {
      state.badgesEarned.push(mission.badge);
      state.xp += 100; // badge bonus
      badgeEarned = BADGES[mission.badge];
    }

    // Check track completion
    let trackCompleted = null;
    const track = TRACKS[mission.track];
    if (track) {
      const allDone = track.missions.every(id => state.missionsCompleted.includes(id));
      if (allDone && !state.tracksCompleted.includes(mission.track)) {
        state.tracksCompleted.push(mission.track);
        state.xp += track.bonusXp;
        trackCompleted = mission.track;
      }
    }

    setState(state);

    // Fire to Google Sheet (silent, no blocking)
    fireSheetPost({
      type: 'mission_complete',
      missionId,
      missionTitle: mission.title,
      badgeEarned: badgeEarned ? badgeEarned.name : '',
      xpTotal: state.xp,
      name: state.name,
      email: state.email,
      installation: state.installation,
    });

    return {
      success: true,
      xpGained: mission.xp + (badgeEarned ? 100 : 0) + (trackCompleted ? track.bonusXp : 0),
      badgeEarned,
      trackCompleted,
      newXp: state.xp,
      newLevel: getLevel(state.xp),
    };
  }

  // ---- SHEET POST (silent) ------------------------------------

  function fireSheetPost(data) {
    // config.js sets window.AFR_CONFIG.scriptUrl and window.AFR_CONFIG.token
    const cfg = window.AFR_CONFIG || {};
    if (!cfg.scriptUrl) return;

    const payload = Object.assign({}, data, {
      token: cfg.token || '',
      honeypot: '', // validated server-side — must be empty
      ts: new Date().toISOString(),
    });

    try {
      fetch(cfg.scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {}); // silent — never block UX on sheet write
    } catch (e) {
      // silent
    }
  }

  // ---- RENDER HELPERS -----------------------------------------

  function renderXPBar(containerEl) {
    if (!containerEl) return;
    const state = getState();
    const level = getLevel(state.xp);
    const progress = levelProgress(state.xp);
    const toNext = xpToNextLevel(state.xp);

    containerEl.innerHTML = `
      <div class="xp-bar-section">
        <div class="xp-bar-row">
          <span class="xp-level-name">⚡ ${level.name}</span>
          <span class="xp-count">${state.xp} XP</span>
        </div>
        <div class="xp-track">
          <div class="xp-fill" style="width:${progress}%"></div>
        </div>
        ${toNext > 0
          ? `<span class="xp-next">${toNext} XP to ${getNextLevel(state.xp).name}</span>`
          : `<span class="xp-next">Maximum level reached 🎉</span>`
        }
      </div>
    `;
  }

  function renderBadgeCabinet(containerEl) {
    if (!containerEl) return;
    const state = getState();

    const trackOrder = ['foundations','glow','milspouse'];
    const trackLabels = {
      foundations: 'Foundations',
      glow:        'Glow Up',
      milspouse:   'Mil-Spouse Intel',
    };
    const trackColors = {
      foundations: 'track-label-foundations',
      glow:        'track-label-glow',
      milspouse:   'track-label-milspouse',
    };

    let html = '';

    trackOrder.forEach(track => {
      const trackBadges = Object.entries(BADGES).filter(([,b]) => b.track === track);
      html += `
        <div style="grid-column:1/-1; text-align:center; padding: 8px 0 4px;">
          <span class="badge-track-label ${trackColors[track]}">${trackLabels[track]}</span>
        </div>
      `;
      trackBadges.forEach(([slug, badge]) => {
        const earned = state.badgesEarned.includes(slug);
        const missionData = MISSIONS[badge.mission];
        const unlocked = isMissionUnlocked(badge.mission, state);
        const hint = earned
          ? badge.desc
          : unlocked
            ? `Complete: ${missionData ? missionData.title : 'a mission'}`
            : 'Unlock this track first';

        html += `
          <div class="badge-slot ${earned ? 'earned' : 'locked'}" title="${hint}">
            <div class="badge-icon">${badge.icon}</div>
            <span class="badge-name">${badge.name}</span>
            <span class="badge-hint">${hint}</span>
          </div>
        `;
      });
    });

    containerEl.innerHTML = html;
  }

  function renderMissionCard(missionId, containerEl, opts) {
    if (!containerEl) return;
    const state = getState();
    const mission = MISSIONS[missionId];
    if (!mission) return;

    const mStatus = getMissionState(missionId, state);
    const badge = mission.badge ? BADGES[mission.badge] : null;
    const num = missionId.replace('ms','S').replace('m','');

    const statusLabels = {
      available: '🔓 Available',
      complete:  '✅ Complete',
      locked:    '🔒 Locked',
    };

    const statusClasses = {
      available: 'status-available',
      complete:  'status-complete',
      locked:    'status-locked',
    };

    const actionBtn = mStatus === 'complete'
      ? `<a href="${opts?.url || '#'}" class="btn-teal-outline" style="font-size:12px;padding:9px 18px;">View Again →</a>`
      : mStatus === 'available'
        ? `<a href="${opts?.url || '#'}" class="btn-primary" style="font-size:12px;padding:9px 18px;">Start Mission →</a>`
        : `<span style="font-size:11px;color:var(--light);">Complete 2 Foundations missions first</span>`;

    containerEl.innerHTML = `
      <div class="mission-card track-${mission.track} ${mStatus}">
        <div class="mission-status ${statusClasses[mStatus]}">${statusLabels[mStatus]}</div>
        <div class="mission-num">Mission ${num}</div>
        <div class="mission-title">${mission.title}</div>
        <div class="mission-desc">${opts?.desc || ''}</div>
        <div class="mission-meta">
          <span class="mission-tool">🛠 ${mission.tool}</span>
          <span class="mission-xp">+${mission.xp} XP</span>
          ${badge ? `<span class="mission-badge-tag">🏅 ${badge.name}</span>` : ''}
        </div>
        ${actionBtn}
      </div>
    `;
  }

  function updateNavXP() {
    const el = document.getElementById('nav-xp-display');
    if (!el) return;
    const state = getState();
    const level = getLevel(state.xp);
    el.innerHTML = `⚡ <span class="xp-val">${state.xp}</span> · ${level.name}`;
    el.style.display = 'inline-flex';
  }

  // ---- BADGE REVEAL MODAL --------------------------------------

  function showBadgeModal(badgeSlug, onDismiss) {
    const badge = BADGES[badgeSlug];
    if (!badge) return;

    // Remove existing modal
    const existing = document.getElementById('afr-badge-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'badge-modal-overlay';
    overlay.id = 'afr-badge-modal';

    overlay.innerHTML = `
      <div class="badge-modal">
        <div class="badge-modal-glow"></div>
        <span class="badge-modal-icon">${badge.icon}</span>
        <span class="badge-modal-label">Badge Unlocked</span>
        <div class="badge-modal-name">${badge.name}</div>
        <p class="badge-modal-desc">${badge.desc}</p>
        <div class="badge-modal-actions">
          <a href="progress.html" class="btn-primary" style="font-size:13px;">See My Progress →</a>
          <button class="badge-modal-dismiss" id="afr-modal-dismiss">Not right now</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Trigger show state after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('show'));
    });

    const dismiss = () => {
      overlay.classList.remove('show');
      setTimeout(() => overlay.remove(), 300);
      if (onDismiss) onDismiss();
    };

    document.getElementById('afr-modal-dismiss').addEventListener('click', dismiss);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) dismiss();
    });

    // Auto-dismiss after 8 seconds if no action
    setTimeout(dismiss, 8000);
  }

  // ---- COPY TO CLIPBOARD ---------------------------------------

  function initCopyButtons() {
    document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
      btn.addEventListener('click', function () {
        const text = this.getAttribute('data-copy');
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          const original = this.textContent;
          this.textContent = '✓ Copied!';
          this.classList.add('copied');
          setTimeout(() => {
            this.textContent = original;
            this.classList.remove('copied');
          }, 2000);
        }).catch(() => {
          // Fallback for older browsers
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
          this.textContent = '✓ Copied!';
          this.classList.add('copied');
          setTimeout(() => { this.textContent = 'Copy this prompt →'; this.classList.remove('copied'); }, 2000);
        });
      });
    });
  }

  // ---- MOBILE NAV ----------------------------------------------

  function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const drawer = document.getElementById('nav-drawer');
    if (!hamburger || !drawer) return;

    hamburger.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });
  }

  // ---- MISSION COMPLETE BUTTON ---------------------------------

  function initMissionCompleteBtn(missionId) {
    const btn = document.getElementById('mission-complete-btn');
    if (!btn) return;

    // Check if already done
    const state = getState();
    if (state.missionsCompleted.includes(missionId)) {
      btn.textContent = '✓ Mission Complete';
      btn.classList.add('done');
    }

    btn.addEventListener('click', function () {
      if (this.classList.contains('done')) return;

      const result = markMissionComplete(missionId);

      this.textContent = '✓ Mission Complete';
      this.classList.add('done');

      // Update nav XP
      updateNavXP();

      // Show Tally form section
      const tallySection = document.getElementById('tally-section');
      if (tallySection) {
        tallySection.style.display = 'block';
        tallySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Show badge modal if badge earned
      if (result.badgeEarned) {
        setTimeout(() => {
          showBadgeModal(result.badgeEarned.name
            ? Object.keys(BADGES).find(k => BADGES[k].name === result.badgeEarned.name)
            : null
          );
        }, 600);
      }
    });
  }

  // ---- PROGRESS PAGE RECOVERY ----------------------------------

  function initProgressRecovery() {
    const form = document.getElementById('recovery-form');
    const emailInput = document.getElementById('recovery-email');
    if (!form || !emailInput) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) return;

      // In a full implementation this would query the Sheet via Apps Script
      // For now: remind user their progress is device-based
      const msg = document.getElementById('recovery-msg');
      if (msg) {
        msg.textContent = 'Progress is saved to this device. To recover on a new device, use the same browser and look for your badges here. Full cross-device sync coming soon.';
        msg.style.display = 'block';
      }
    });
  }

  // ---- INIT ----------------------------------------------------

  function init() {
    updateNavXP();
    initCopyButtons();
    initMobileNav();

    // Render XP bar if present
    const xpBarEl = document.getElementById('xp-bar');
    if (xpBarEl) renderXPBar(xpBarEl);

    // Render badge cabinet if present
    const cabinetEl = document.getElementById('badge-cabinet');
    if (cabinetEl) renderBadgeCabinet(cabinetEl);

    // Init progress recovery if present
    initProgressRecovery();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ---- PUBLIC API ----------------------------------------------

  window.AFR = {
    getState,
    setState,
    clearState,
    getLevel,
    levelProgress,
    xpToNextLevel,
    getMissionState,
    isMissionUnlocked,
    markMissionComplete,
    showBadgeModal,
    renderXPBar,
    renderBadgeCabinet,
    renderMissionCard,
    updateNavXP,
    initMissionCompleteBtn,
    MISSIONS,
    BADGES,
    TRACKS,
    LEVELS,
  };

})();
