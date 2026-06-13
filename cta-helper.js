/* ============================================================
   AI Family Room — CTA Helper
   Adds sign-in microcopy after every external tool CTA
   (Claude, Gamma) and a return-path closer on pages that
   send users to an external tool.
   Edit the strings below to change microcopy site-wide.
   ============================================================ */
(function () {
  'use strict';

  var MICROCOPY = {
    'claude.ai/new': "Claude opens in a new tab. If you're not signed in yet, tap “Continue with Google.” Paste the prompt and hit Enter. Stay in this same Claude chat for any follow-up prompts on this page.",
    'gamma.app/create': "Gamma opens in a new tab. Choose “Paste in text,” paste everything Claude gave you, pick a theme, then hit Generate. You'll be asked to sign in if you haven't yet — the free plan is enough to finish this mission."
  };

  var CLOSER_HTML =
    '<strong>When you’re happy with what you built, switch back to this tab</strong> ' +
    'and mark this mission complete. Your progress saves on this device. ' +
    'If you get lost, your last mission is always one click away from <a href="progress.html" style="color:#1ABCB0;font-weight:600;text-decoration:underline">My Progress</a>.';

  var NOTE_STYLE =
    'display:block;font-size:13px;color:#2A2520;opacity:.78;' +
    'margin-top:10px;font-style:italic;max-width:560px;line-height:1.55;';

  var CLOSER_STYLE =
    'margin:32px auto;max-width:680px;padding:18px 22px;' +
    'background:rgba(26,188,176,.08);border-left:3px solid #1ABCB0;' +
    'border-radius:10px;font-size:14.5px;color:#2A2520;line-height:1.6;' +
    'font-family:\'Poppins\',sans-serif;';

  function injectMicrocopy() {
    Object.keys(MICROCOPY).forEach(function (key) {
      var selector = 'a[href*="' + key + '"]';
      var links = document.querySelectorAll(selector);
      links.forEach(function (a) {
        if (a.dataset.ctaNoted === '1') return;
        // Don't add a note if one already exists right after
        if (a.nextElementSibling && a.nextElementSibling.classList && a.nextElementSibling.classList.contains('cta-note')) return;
        var note = document.createElement('small');
        note.className = 'cta-note';
        note.setAttribute('style', NOTE_STYLE);
        note.textContent = MICROCOPY[key];
        a.parentNode.insertBefore(note, a.nextSibling);
        a.dataset.ctaNoted = '1';
      });
    });
  }

  function injectReturnCloser() {
    // Only add a closer if the page sends users to an external tool
    var hasExternalCTA = document.querySelector(
      'a[href*="claude.ai/new"], a[href*="gamma.app/create"]'
    );
    if (!hasExternalCTA) return;
    if (document.querySelector('.return-closer')) return;

    var closer = document.createElement('div');
    closer.className = 'return-closer';
    closer.setAttribute('role', 'note');
    closer.setAttribute('style', CLOSER_STYLE);
    closer.innerHTML = CLOSER_HTML;

    // Try to place before the footer; fall back to end of body
    var footer = document.querySelector('footer, .site-footer, .afr-footer');
    if (footer) {
      footer.parentNode.insertBefore(closer, footer);
    } else {
      document.body.appendChild(closer);
    }
  }

  function run() {
    try {
      injectMicrocopy();
      injectReturnCloser();
    } catch (e) {
      // Silent fail — never block the page
      if (window.console && console.warn) console.warn('cta-helper:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
