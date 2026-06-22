/* ============================================================
   AI FAMILY ROOM — The Art of the Ask (start.html tool)
   Logic preserved verbatim from the original page; only the
   surrounding markup was reskinned. Binds to these IDs:
   #the-ask #rough-input #char-count #build-btn #loading-bar
   #loading-msg #error-box #result-panel #before-text #after-text
   #keys-bd-list #take-to-claude #copy-result-btn #try-again-btn
   and .chip[data-fill]. Loaded at end of body so nodes exist.
   ============================================================ */

// ── SMOOTH SCROLL for hero CTA ──────────────────────────────
(function () {
  var trigger = document.querySelector('a[href="#the-ask"]');
  if (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('the-ask').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();

// ── ART OF THE ASK STATE ─────────────────────────────────────
let currentPrompt = '';
let isLoading     = false;

const roughInput   = document.getElementById('rough-input');
const charCount    = document.getElementById('char-count');
const buildBtn     = document.getElementById('build-btn');
const loadingBar   = document.getElementById('loading-bar');
const loadingMsg   = document.getElementById('loading-msg');
const errorBox     = document.getElementById('error-box');
const resultPanel  = document.getElementById('result-panel');
const beforeText   = document.getElementById('before-text');
const afterText    = document.getElementById('after-text');
const keysBdList   = document.getElementById('keys-bd-list');
const takeToClaude = document.getElementById('take-to-claude');
const copyBtn      = document.getElementById('copy-result-btn');
const tryAgainBtn  = document.getElementById('try-again-btn');

const loadingMessages = [
  'Reading your thought...',
  'Spotting the goal...',
  'Adding context and tone...',
  'Polishing your prompt...',
  'Almost there...',
];

let loadingInterval = null;

function startLoadingCycle() {
  let i = 0;
  loadingMsg.textContent = loadingMessages[0];
  loadingInterval = setInterval(() => {
    i = (i + 1) % loadingMessages.length;
    loadingMsg.textContent = loadingMessages[i];
  }, 1800);
}

function stopLoadingCycle() {
  if (loadingInterval) { clearInterval(loadingInterval); loadingInterval = null; }
}

// ── INPUT HANDLING ───────────────────────────────────────────
roughInput.addEventListener('input', function () {
  const len = this.value.length;
  charCount.textContent = `${len} / 300`;
  buildBtn.disabled = len < 5 || isLoading;
  if (resultPanel.classList.contains('show')) {
    resultPanel.classList.remove('show');
    errorBox.classList.remove('show');
  }
});

roughInput.addEventListener('keydown', function (e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') buildPrompt();
});

// ── CHIP SELECTION ───────────────────────────────────────────
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', function () {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    roughInput.value = this.dataset.fill;
    roughInput.dispatchEvent(new Event('input'));
    roughInput.focus();
  });
});

// ── RULE-BASED PROMPT POLISHER ───────────────────────────────
function rulePolishPrompt(rough) {
  var isMilitary = /\b(pcs|tricare|deployment|fort\s|base\b|spouse|deploy|jblm|military|active\s+duty|frg|ets|veteran|tdy|orders)\b/i.test(rough);
  var isSchool   = /\b(teacher|principal|iep|504|school|classroom|kid|child|son|daughter|grade\b|homework|tutor)\b/i.test(rough);
  var isWork     = /\b(boss|manager|coworker|colleague|interview|resume|cover\s+letter|promotion|raise|meeting)\b/i.test(rough);
  var isHealth   = /\b(doctor|nurse|appointment|insurance|symptom|prescription|specialist|referral|diagnos)\b/i.test(rough);
  var isFinance  = /\b(landlord|rent|bill|loan|credit|bank|payment|negotiate|budget|invoice|refund)\b/i.test(rough);

  var core = rough
    .replace(/^(i\s+)?(need\s+to|want\s+to|would\s+like\s+to|have\s+to|am\s+trying\s+to)\s+/i, '')
    .replace(/^(can\s+you|could\s+you|please|help\s+me)\s+/i, '')
    .replace(/^(i\s+need|i\s+want|i\s+have\s+a)\s+/i, '');
  core = core.charAt(0).toLowerCase() + core.slice(1);

  var context, tone, specificWhy, contextWhy, toneWhy;
  specificWhy = 'Named the actual task in plain language — no vague verbs like "help with."';
  contextWhy  = 'Added who you are and what matters, so Claude has something real to work with.';
  toneWhy     = 'Asked for a specific feel — warm, practical, your voice — so the output doesn\'t come back generic.';

  if (isMilitary) {
    context = ' I\'m a military spouse and the timing is tight — every move has a checklist.';
    tone    = ' Keep it warm and practical, the way you\'d brief a friend.';
    contextWhy = 'Added the military context — Claude now knows the timing pressure and the stakes.';
  } else if (isSchool) {
    context = ' I\'m a parent partnering with my child\'s school — I want to be heard without being labeled a problem.';
    tone    = ' Keep it warm, specific, and partnership-oriented. Avoid jargon.';
    contextWhy = 'Named you as a parent in partnership mode — Claude won\'t default to combative or pleading.';
  } else if (isWork) {
    context = ' I want to come across as clear and grounded, not pushy or apologetic.';
    tone    = ' Keep it brief, kind, and confident. Under 80 words.';
    contextWhy = 'Said how you want to come across — Claude needs that to pick the right register.';
  } else if (isHealth) {
    context = ' I want to advocate for myself / my family without sounding combative.';
    tone    = ' Keep it clear, calm, and specific about what I need.';
    contextWhy = 'Added the advocacy framing — Claude will write firm but not aggressive.';
  } else if (isFinance) {
    context = ' I want to ask for what I need without burning the relationship.';
    tone    = ' Keep it warm, factual, and grounded. Numbers should be specific.';
    contextWhy = 'Added the relationship-aware framing — Claude won\'t over-soften or over-escalate.';
  } else {
    context = ' Here\'s what matters: this should feel like me, not a robot.';
    tone    = ' Keep it warm, under 80 words, and ready to send.';
  }

  var polished = 'Help me ' + core + '.' + context + tone;

  return {
    polished_prompt: polished,
    keys: { specific: specificWhy, context: contextWhy, tone: toneWhy }
  };
}

// ── BUILD BUTTON ─────────────────────────────────────────────
buildBtn.addEventListener('click', buildPrompt);

async function buildPrompt() {
  const rough = roughInput.value.trim();
  if (!rough || rough.length < 5 || isLoading) return;

  isLoading = true;
  buildBtn.disabled = true;
  buildBtn.textContent = 'Building your prompt...';
  resultPanel.classList.remove('show');
  errorBox.classList.remove('show');
  loadingBar.classList.add('show');
  startLoadingCycle();

  try {
    await new Promise(function (resolve) { setTimeout(resolve, 900); });
    var parsed = rulePolishPrompt(rough);
    currentPrompt = parsed.polished_prompt;
    renderResult(rough, parsed);
  } catch (err) {
    console.error('Art of the Ask error:', err);
    errorBox.classList.add('show');
  } finally {
    isLoading = false;
    buildBtn.disabled = roughInput.value.trim().length < 5;
    buildBtn.innerHTML = '✨ Build My Prompt →';
    loadingBar.classList.remove('show');
    stopLoadingCycle();
  }
}

// ── RENDER RESULT ────────────────────────────────────────────
function renderResult(rough, parsed) {
  beforeText.textContent = rough;
  afterText.textContent  = parsed.polished_prompt;

  keysBdList.innerHTML = '';
  [
    { badge: 'Specific', text: parsed.keys.specific },
    { badge: 'Context',  text: parsed.keys.context  },
    { badge: 'Tone',     text: parsed.keys.tone     },
  ].forEach(k => {
    const el = document.createElement('div');
    el.className = 'key-item';
    el.innerHTML = `<span class="key-badge">${k.badge}</span><span class="key-explain">${k.text}</span>`;
    keysBdList.appendChild(el);
  });

  takeToClaude.href = `https://claude.ai/new?q=${encodeURIComponent(parsed.polished_prompt)}`;
  resultPanel.classList.add('show');

  setTimeout(() => {
    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ── COPY BUTTON ──────────────────────────────────────────────
copyBtn.addEventListener('click', function () {
  if (!currentPrompt) return;
  const btn = this;
  const originalHTML = btn.innerHTML;
  const doCopy = () => {
    btn.innerHTML = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.classList.remove('copied');
    }, 2200);
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(currentPrompt).then(doCopy).catch(() => fallbackCopy(doCopy));
  } else {
    fallbackCopy(doCopy);
  }
});

function fallbackCopy(callback) {
  const ta = document.createElement('textarea');
  ta.value = currentPrompt;
  ta.style.cssText = 'position:fixed;opacity:0;top:-999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
  callback();
}

// ── TRY AGAIN ────────────────────────────────────────────────
tryAgainBtn.addEventListener('click', function () {
  resultPanel.classList.remove('show');
  errorBox.classList.remove('show');
  currentPrompt = '';
  roughInput.value = '';
  roughInput.dispatchEvent(new Event('input'));
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  roughInput.focus();
  document.querySelector('.input-block').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
