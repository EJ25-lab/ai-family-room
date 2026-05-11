# AI Family Room — Foundational Build Master
## EdJustice Collective · Tyra L. Harrison, Chief Possibility Pilot
### Version 1.0 · May 2026

---

## WHAT THIS DOCUMENT IS

This is the single source of truth for building the AI Family Room.
It covers everything locked in the design, committee review, architecture decisions,
security choices, and build reality confirmed during Phase 1.

Every page built in this project references this document first.

---

## SITE IDENTITY

| Field | Value |
|---|---|
| **Site Name** | AI Family Room |
| **Owner** | EdJustice Collective |
| **Repo** | `ej25-lab/ai-family-room` (new, standalone repo) |
| **Hosting** | GitHub Pages — free, public repo, permanent |
| **Domain** | TBD — subdomain of `theedjusticecollective.com` OR standalone domain |
| **Primary Audience** | Families · Ages 8–80 · Military spouses as featured sub-audience |
| **Secondary Audience** | SPARK session attendees · Community referrals · EJC conference follow-up |
| **Core Mission** | AI as a communication equalizer — helping every family write, advocate, and move through life with more power and less friction |
| **Tone** | Warm · Empowering · Culturally affirming · Peer-level · Never clinical · Never hype |
| **Brand** | Poppins · Teal `#1ABCB0` · Dark `#0B1215` · Orange `#F28C38` |
| **Relationship to EJC** | EJC owns this site · Separate from Wander Luxe · Separate from GOL build |

---

## THE THREE JOBS THIS SITE DOES

Every page, section, and component must serve at least one of these three jobs.
If it doesn't — it doesn't ship.

1. **TEACHES** — AI literacy, practical tools, responsible use, from a family-centered equity frame
2. **ACTIVATES** — gets learners doing something within 60 seconds of arrival, not just reading
3. **CAPTURES** — collects community data (name, email, installation, progress) for EJC's pipeline

---

## VOICE RULES (LOCKED)

- Frame AI as amplifier, never replacement: *"You already have the voice. AI just turns up the volume."*
- The Mil-Spouse framing: *"The government gave you the benefit. AI helps you actually use it."*
- Never say "AI will change your life" — too vague, too hype
- Always name the real problem before offering the AI solution
- *"Grown woman efficiency"* language — welcome and on-brand
- No MLSC or EJC district product references anywhere on this site — wrong audience
- *"I"* register, peer-to-peer — never vendor language

---

## TECHNICAL STACK (LOCKED)

| Layer | Tool | Notes |
|---|---|---|
| Hosting | GitHub Pages (free) | Permanent, portable, zero cost · Public repo |
| Build Format | **Self-contained HTML files** | All CSS + JS inline per file · No external relative paths · Required for preview AND for portability |
| Typography | Poppins via Google Fonts CDN | Loaded in every `<head>` via `@import` or `<link>` |
| State / Progress | `localStorage` key: `afr_v1` | XP, badges, missions, level — per device, no login |
| Form intake — Primary | Tally.so (free) | Signup, completion logging, session interest · No branding on free plan |
| Form intake — Silent | Google Apps Script web app | Auto-log badge earns to Sheet · text/plain POST to bypass CORS |
| Data store | Google Sheet (5 tabs) | Community intelligence file · Owner account must have 2FA |
| AI Coach | Taskade embedded agent | Phase 4+ · Trained on Claude, NeuralWriter, Gamma docs |
| Domain | Custom (TBD) | Registered separately · Permanent regardless of PCS location |

### CRITICAL BUILD RULE
Every HTML file is **fully self-contained**:
- All CSS lives in a `<style>` block inside `<head>`
- All JS lives in `<script>` blocks at the bottom of `<body>`
- Google Fonts loaded via `<link>` from CDN
- No `href="style.css"` or `src="progress.js"` — these will NOT render in preview

When deployed to GitHub Pages, relative paths work. But every file must render
correctly as a standalone file as well. Build self-contained from the start.

---

## GOOGLE SHEET STRUCTURE

**Sheet name:** AI Family Room — Community Intelligence

| Tab | Columns |
|---|---|
| `Signups` | Timestamp · Name · Email · Installation · Source · SessionInterest |
| `MissionsCompleted` | Timestamp · Email · MissionID · MissionTitle · BadgeEarned · XPTotal |
| `BadgesEarned` | Timestamp · Email · BadgeName · Name · Installation |
| `FutureInterest` | Timestamp · Email · Installation · Interest · Name |
| `Errors` | Timestamp · Error |

**Sheet security rules:**
- Owner account: strong password + authenticator app 2FA (not SMS)
- No link-sharing enabled
- Viewers cannot download/print/copy
- Separate contact tab from progress tab (email + name in Signups; progress in MissionsCompleted)
- Calendar reminder to purge entries older than 12 months

---

## BRAND SYSTEM

### Colors
```css
--teal:       #1ABCB0   /* Primary — EJC brand teal */
--teal-dark:  #148F86   /* Hover state */
--teal-deep:  #0D6B64   /* Text on pale teal bg */
--teal-pale:  #E0F7F5   /* Pale teal background */
--dark:       #0B1215   /* Hero / CTA backgrounds */
--dark-mid:   #141E23   /* Card backgrounds on dark */
--text:       #1A2A30   /* Body text */
--mid:        #4A5C64   /* Secondary text */
--light:      #8A9BA3   /* Tertiary / placeholder */
--warm:       #E8EAEA   /* Borders on light bg */
--off:        #F9FAFB   /* Section backgrounds */
--white:      #ffffff
--orange:     #F28C38   /* Glow Up track accent */
--orange-pal: #FEF3E8
--orange-dk:  #D4721E
--purple:     #9B8AFA   /* Mil-Spouse track accent */
--purple-pal: #F0EEFF
--purple-dk:  #6D5CE6
--xp-gold:    #F5C842   /* XP / level display */
```

### Typography
```css
--font: 'Poppins', sans-serif;

/* Scale */
Hero H1:        clamp(2.4rem, 6vw, 4.2rem)  weight 900  tracking -.035em
Section H2:     clamp(1.7rem, 4vw, 2.6rem)  weight 900  tracking -.022em
Card title:     13–15px                       weight 700–800
Body:           15px                          weight 300–400  line-height 1.8
Small / label:  10–12px                       weight 600–700
Eyebrow pill:   10px                          weight 700      tracking .22em UPPERCASE
```

### Radii
```css
--r:      16px   /* Cards, sections */
--r-sm:   10px   /* Small elements */
--r-pill: 100px  /* Pills, badges, nav CTAs */
```

### Dark section pattern
Every dark section (`background: var(--dark)`) gets a radial glow:
```css
::before {
  content: '';
  position: absolute;
  top: -120px; left: 50%; transform: translateX(-50%);
  width: 900px; height: 900px; border-radius: 50%;
  background: radial-gradient(circle, rgba(26,188,176,.07) 0%, transparent 65%);
  pointer-events: none;
}
```

---

## GAMIFICATION SYSTEM

### Philosophy
Adult learners disengage from competitive ranking.
Military spouses value community over competition.
Model is **celebratory and identity-affirming** — never arcade-style.
No leaderboards. No rankings. Collective milestones only.

### The Three Tracks

| Track | Color | Missions | Always Available? | Badges |
|---|---|---|---|---|
| Foundations | Teal `#1ABCB0` | m7, m1, m3 | ✅ Yes | First Spark · Voice Activated · Prompt Builder |
| Glow Up | Orange `#F28C38` | m2, m5, m6, m8 | After 2 Foundations done | Page Turner · Story Keeper · Follow-Up Queen |
| Mil-Spouse Intel | Purple `#9B8AFA` | ms1, ms2, ms3 | ✅ Yes | PCS Ready · Career Unlocked · Base Explorer |

### All 9 Badges

| Badge Slug | Name | Icon | Track | Earned By |
|---|---|---|---|---|
| `first-spark` | First Spark | 🌱 | Foundations | Complete Mission 7 (Weak vs. Strong Prompts) |
| `voice-activated` | Voice Activated | 💬 | Foundations | Complete Mission 1 (Turn a Thought into a Message) |
| `prompt-builder` | Prompt Builder | ✍️ | Foundations | Complete Mission 3 (Teach Claude Who You Are) |
| `page-turner` | Page Turner | 📄 | Glow Up | Complete Mission 5 (Brain Dump to Doc) |
| `story-keeper` | Story Keeper | 🎤 | Glow Up | Complete Mission 6 (Family Stories into a Deck) |
| `follow-up-queen` | Follow-Up Queen | 🔁 | Glow Up | Complete Mission 8 (Follow-Up Superpower) |
| `pcs-ready` | PCS Ready | 📦 | Mil-Spouse | Complete ms1 (PCS Survival Kit) |
| `career-unlocked` | Career Unlocked | 💼 | Mil-Spouse | Complete ms2 (Career Gap Translator) |
| `base-explorer` | Base Explorer | 🏕️ | Mil-Spouse | Complete ms3 (Free Access File) |

### XP System

| Event | XP |
|---|---|
| Complete any mission | +50 |
| Earn a badge | +100 |
| Complete a full track | +150 |
| **Maximum possible** | **1,800** |

### Level Names

| XP Range | Level Name |
|---|---|
| 0–99 | Just Arrived |
| 100–299 | Getting Settled |
| 300–599 | Finding Your People |
| 600–999 | Running Things |
| 1,000–1,499 | Community Anchor |
| 1,500–1,800 | Fully Loaded |

### Unlock Logic
- Foundations missions: always available — no prerequisite, no signup
- Glow Up missions: unlock after any 2 Foundations missions complete
- Mil-Spouse missions: always available — autonomy honored, no gate
- Locked missions: show preview card with soft hint — **never a hard wall**

### Mission Card States
```
available  — full color, hover lift, clickable, "Start Mission →"
complete   — teal border + teal-pale bg, checkmark, "View Again →"
locked     — 55% opacity, lock icon, hint text, pointer: not-allowed
```

### Badge Reveal Modal
- Fires when a badge is earned (markMissionComplete returns badgeEarned)
- Overlay: dark bg + teal radial glow
- Badge icon: large, animated scale-in + teal glow pulse
- Text: "Badge Unlocked" eyebrow + badge name + description
- Actions: "See My Progress →" (links progress.html) + dismiss
- Auto-dismiss after 8 seconds

---

## localStorage STATE MACHINE

### Storage Key: `afr_v1`

### State Object Shape
```javascript
{
  name: "",
  email: "",
  installation: "",
  xp: 0,
  missionsCompleted: [],   // mission IDs: "m1","m2"..."m8","ms1","ms2","ms3"
  badgesEarned: [],        // badge slugs: "first-spark", "pcs-ready", etc.
  tracksCompleted: [],     // track slugs: "foundations", "glow", "milspouse"
  joinedAt: null,          // ISO timestamp, first visit
  lastActive: null         // ISO timestamp, last action
}
```

### Core Functions (included inline in every page that needs them)
- `getState()` — read from localStorage; return default if empty or error
- `setState(obj)` — write full object + set lastActive timestamp
- `getLevel(xp)` — return level object `{min, name}` based on XP
- `levelProgress(xp)` — return 0–100 percentage for XP bar fill
- `markMissionComplete(missionId)` — add mission, add XP, check badge, check track, setState, fire Sheet POST
- `isMissionUnlocked(missionId, state)` — return boolean based on track unlock logic
- `getMissionState(missionId, state)` — return `'available' | 'complete' | 'locked'`
- `fireSheetPost(data)` — silent POST to Apps Script using `Content-Type: text/plain;charset=utf-8`
- `updateNavXP()` — update `#nav-xp` element with current XP + level name
- `showBadgeModal(badgeSlug)` — render and show badge reveal overlay
- `initCopyButtons()` — wire all `[data-copy]` buttons to clipboard
- `initMobileNav()` — wire hamburger to drawer toggle

### CORS-Safe Sheet POST Pattern
```javascript
fetch(SCRIPT_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  body: JSON.stringify({ token, honeypot: '', type, ...data }),
  keepalive: true
}).catch(() => {}); // always silent — never block UX
```

---

## APPS SCRIPT SECURITY PATTERN

**Deploy settings:** Execute as: Me · Who has access: Anyone
**Validation order in doPost():**
1. Parse JSON from `e.postData.contents`
2. Validate token matches shared secret
3. Reject if honeypot field is non-empty
4. Validate all fields (name ≤60 chars, email regex, missionId in known list)
5. Rate limit: max 10 submissions per hashed email per day via PropertiesService
6. Route by `data.type` to correct Sheet tab
7. Return fixed `{ok:true}` — never echo user input
8. Wrap in try/catch — log errors to Errors tab, never return details to client

**Shared token:** Set in `config.js` as `window.AFR_CONFIG.token`
(visible in source — this is harm reduction, not real auth)

---

## PAGE INVENTORY — 16 PAGES + 3 SHARED FILES

### Shared Files
```
style.css       — Full brand + gamification CSS (for GitHub Pages deploy)
progress.js     — Full state machine (for GitHub Pages deploy)
config.js       — Apps Script URL + token (placeholder until Sheet wired)
```
Note: These shared files are used in GitHub Pages deployment.
During build/preview in Claude, all CSS + JS is inlined per-page.

### The 16 Pages

| # | File | Title | Phase | Status |
|---|---|---|---|---|
| 1 | `index.html` | Landing / Home | 1 | ✅ Built |
| 2 | `start.html` | Start Here — The 60-Second Win | 1 | 🔲 Next |
| 3 | `tools.html` | The Tools | 2 | 🔲 |
| 4 | `missions.html` | Mission Map | 2 | 🔲 |
| 5 | `mission-1.html` | Mission 1: Turn a Thought into a Message | 2 | 🔲 |
| 6 | `mission-2.html` | Mission 2: Write a Love Note from Memory | 2 | 🔲 |
| 7 | `mission-3.html` | Mission 3: Teach Claude Who You Are | 2 | 🔲 |
| 8 | `mission-4.html` | Mission 4: Design Your First Job for Claude | 4 | 🔲 |
| 9 | `mission-5.html` | Mission 5: Brain Dump to Doc in 60 Seconds | 4 | 🔲 |
| 10 | `mission-6.html` | Mission 6: Family Stories into a Deck | 4 | 🔲 |
| 11 | `mission-7.html` | Mission 7: Weak vs. Strong Prompts | 2 | 🔲 |
| 12 | `mission-8.html` | Mission 8: Master the Follow-Up Superpower | 4 | 🔲 |
| 13 | `milspouse.html` | Mil-Spouse Intelligence File (7 lanes) | 4 | 🔲 |
| 14 | `safety.html` | Help & Safety | 4 | 🔲 |
| 15 | `progress.html` | My Progress — Badge Cabinet | 3 | 🔲 |
| 16 | `join.html` | Join the Community | 3 | 🔲 |

---

## PHASE BUILD PLAN

### Phase 1 — Foundation ✅ IN PROGRESS
Goal: Homepage renders correctly. Brand system established. State machine confirmed.

| File | Status | Notes |
|---|---|---|
| `index.html` | ✅ Built | Fully self-contained · All sections complete |
| `style.css` | ✅ Built | External file for GitHub Pages deploy |
| `progress.js` | ✅ Built | External file for GitHub Pages deploy |
| `config.js` | ✅ Built | Placeholder URL · Apps Script code in comments |
| `start.html` | 🔲 Next | Self-contained · 60-second win · Concept explainer · Rules |

### Phase 2 — Core Learning Pages
Goal: Learner can go from home → start → tools → missions → complete 3 missions.

| File | Notes |
|---|---|
| `tools.html` | NeuralWriter · Claude (not ChatGPT) · Gamma · Privacy notes · Pro-tip |
| `missions.html` | State-aware mission map · All 3 tracks visible · XP bar at top |
| `mission-1.html` | Foundations Track · NeuralWriter · Badge: Voice Activated |
| `mission-7.html` | Foundations Track · Claude · Badge: First Spark · (reordered — foundational) |
| `mission-3.html` | Foundations Track · Claude · Badge: Prompt Builder |

### Phase 3 — Gamification Layer
Goal: Badge earn flow works end-to-end. Data flows to Google Sheet.

| File | Notes |
|---|---|
| `progress.html` | Badge cabinet · XP bar · Mission list · Email recovery |
| `join.html` | Tally embed · Google Sheet connection · Privacy notice |
| Config update | `config.js` updated with real Apps Script URL + token |

### Phase 4 — Full Content
Goal: All 9 missions live. Mil-Spouse section live. Safety page live.

| File | Notes |
|---|---|
| `mission-2.html` | Glow Up Track · Claude · Love note |
| `mission-4.html` | Glow Up Track · Claude · Custom job design |
| `mission-5.html` | Glow Up Track · Gamma · Badge: Page Turner |
| `mission-6.html` | Glow Up Track · Gamma · Badge: Story Keeper |
| `mission-8.html` | Glow Up Track · Claude · Badge: Follow-Up Queen |
| `milspouse.html` | 7 lanes · All with ready-to-copy prompts · 3 Mil-Spouse badges |
| `safety.html` | AI hallucinations · Guardrails · OPSEC · Privacy · Pro tips |

### Phase 5 — Hardening + Launch
Goal: Site is secure, tested, and ready for SPARK event and public sharing.

| Task | Notes |
|---|---|
| Honeypot fields | Added to all Tally forms |
| HTTPS enforce | Confirmed in GitHub Pages repo settings |
| Mobile pass | All 16 pages tested at 375px, 640px, 860px |
| Cross-device recovery | Email → Sheet lookup tested on progress.html |
| Taskade AI Coach | Agent trained and embedded on `/coach` or floating widget |
| Community stat | Live count wired from Sheet (or updated manually monthly) |
| SPARK integration | Session-specific Tally form with event routing |

---

## PAGE STRUCTURE — EVERY PAGE FOLLOWS THIS SHELL

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[PAGE TITLE] — AI Family Room</title>
  <meta name="description" content="[PAGE DESCRIPTION]">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    /* FULL CSS INLINE — see Brand System above */
    /* Copy the complete CSS block from index.html for each new page */
    /* Then add any page-specific styles at the bottom */
  </style>
</head>
<body>

  <!-- NAV — identical on every page, active link class varies -->
  <!-- HERO — dark bg, eyebrow, h1, sub, CTAs -->
  <!-- CONTENT SECTIONS — page-specific -->
  <!-- CTA SECTION — dark bg closing band -->
  <!-- FOOTER — identical on every page -->

  <script>
    /* FULL STATE MACHINE INLINE */
    /* Copy the complete JS block from index.html */
    /* Then add any page-specific JS at the bottom */
    /* Page-specific init: AFR.initMissionCompleteBtn('m1') */
  </script>
</body>
</html>
```

---

## MISSION PAGE TEMPLATE

Every mission page (mission-1 through mission-8, ms1–ms3) follows this structure:

### Section 1: Mission Header (dark bg)
- Track indicator pill (color-coded)
- Mission number + title
- "What you'll produce" — one concrete sentence
- XP badge: `+50 XP` · Badge name if applicable
- Tool used

### Section 2: You Already Know How to Do This (light bg)
- Bridge from something they already do → what this mission teaches
- Adult learning principle: Prior Experience honored before new content

### Section 3: The Mission (white/off-white bg)
- Step-by-step instructions (3–5 steps max)
- Ready-to-copy prompt card with clipboard button (`data-copy` attribute)
- "Open [Tool] →" link (opens in new tab)
- Optional: scratch textarea for pasting/saving their output

### Section 4: What Just Happened (dark bg)
- Concept explanation AFTER the experience — not before
- Why this prompt structure worked
- One "Level Up" tip for next time

### Section 5: Mission Complete (teal bg)
- Complete button → `markMissionComplete(missionId)`
- On complete: badge modal fires if badge earned
- Tally form appears (name, email, installation, "what will you use this for?")
- "Next Mission" recommendation

---

## MIL-SPOUSE INTELLIGENCE FILE — 7 LANES

Each lane follows: problem statement → AI use cases → ready-to-copy Claude prompt → badge note (if applicable)

| # | Lane Name | Emoji | Badge |
|---|---|---|---|
| 1 | The Free Access File | 🏕️ | Base Explorer |
| 2 | The PCS Survival Kit | 📦 | PCS Ready |
| 3 | The Career Gap Translator | 💼 | Career Unlocked |
| 4 | The TRICARE Translator | 🏥 | — |
| 5 | The Rental Rights File | 🏠 | — |
| 6 | The Solo Parent Command Center | 🧠 | — |
| 7 | The New City Intelligence Briefing | 🌍 | — |

**Section opening framing:**
- Eyebrow: `MIL-SPOUSE INTELLIGENCE FILE`
- H1: *"The government gave you the benefit. AI helps you actually use it."*
- Sub: *"You figured out how to move your whole life every 18 months. Here's the research assistant you never had."*

---

## TOOLS (LOCKED CONTENT)

### NeuralWriter
- Position: *"Your writing warm-up"*
- Use: Prompt Generator to turn rough thoughts into high-level instructions
- Link: `neuralwriter.com/prompt-tool`
- Free: 10,000 character limit · No account needed for basic tools
- Paid: Advanced features from $19/mo
- Privacy note: No account needed for basic tools

### Claude ← REPLACES ChatGPT EVERYWHERE
- Position: *"The AI that thinks out loud with you"*
- Key differentiator: Shows reasoning — user stays in control
- Link: `claude.ai`
- Free: Accessible without account for short conversations
- Paid: Pro from $20/mo (higher limits, more features)
- Privacy note: *"Free conversations not used to train the model by default"*
- Why Claude over ChatGPT: More conversational, explains reasoning, less intimidating for first-timers, better for a family audience that values trust

### Gamma
- Position: *"Instant docs, decks and pages"*
- Use: One prompt → complete visual document/deck in seconds
- Link: `gamma.app`
- Free: 400 starter credits
- Paid: Plus $8–$10/mo (unlimited + no Gamma badge)
- ⚠️ Typo fixed everywhere: `$83$10/month` → `$8–$10/month`
- Privacy note: Sign in with Google recommended

### Pro Tip (shown on tools page + homepage)
> For Claude and Gamma, use "Continue with Google" to sign in.
> Fastest, most secure. Gmail account? You're already halfway there.

---

## SECURITY CHECKLIST (BUILT IN — NOT RETROFITTED)

| # | Item | Applied When |
|---|---|---|
| 1 | HTTPS enforce | GitHub Pages settings — Day 1 |
| 2 | Custom domain verified in GitHub account | Domain setup |
| 3 | Honeypot field on every Tally form | Phase 3 |
| 4 | Minimum-time-on-page check | Phase 3 |
| 5 | Apps Script shared token | config.js + doPost() |
| 6 | Apps Script field validation | doPost() |
| 7 | Apps Script rate limiting | PropertiesService in doPost() |
| 8 | No sensitive data in localStorage | Every page — design rule |
| 9 | CSP meta tag | Every page head |
| 10 | Privacy notice | Footer every page + join.html |
| 11 | Google Sheet 2FA | Account setup |
| 12 | Google Sheet no link-sharing | Sheet settings |
| 13 | OPSEC guidance page | safety.html |
| 14 | No unit/rank/deployment date fields in any form | Form design rule |
| 15 | Data retention: purge entries > 12 months | Calendar reminder |

---

## ADULT LEARNING PRINCIPLES APPLIED (KNOWLES)

| Principle | Application in This Site |
|---|---|
| Need to Know | Every mission opens with "What this unlocks for you in 7 days" |
| Self-Concept (autonomy) | Non-linear mission map · Soft locks only · Skip options |
| Prior Experience | "You already do this" framing · Bridge from existing skill |
| Readiness | Use case categories match real current life (PCS, career, kids) |
| Problem-Centered | Every mission = one real artifact produced |
| Internal Motivation | Badge names tied to identity, not arcade levels |

### Gamification Research Note (2026)
Research on women learners specifically warns that competitive leaderboards
reduce motivation in collaborative contexts. This site uses collective progress
displays ("312 families earned a badge this month") not individual rankings.

---

## OPSEC / PRIVACY RULES FOR THIS AUDIENCE

### Safe to Collect
- First name
- Personal email (not .mil)
- General installation name (e.g. "MacDill AFB", "Fort Liberty")
- Badge/mission progress
- Session interest (yes/no)

### Never Collect
- Rank or unit
- Deployment status or dates
- Exact home address or on-base housing
- Squadron/battalion designators
- Children's school names or schedules
- Anything that could identify a service member's routine or location

---

## NAVIGATION (IDENTICAL ON EVERY PAGE)

```
[AI mark] AI Family Room / by EdJustice Collective
[links] Start Here · The Tools · Missions · Mil-Spouse · Stay Safe
[XP pill] ⚡ [XP] · [Level Name]   ← hidden until first mission complete
[CTA] Join the Community →
[mobile] hamburger → drawer
```

Active link gets `color: var(--teal)` via `.active` class.

---

## FOOTER (IDENTICAL ON EVERY PAGE)

```
AI Family Room / by EdJustice Collective
Build Systems. Promote Justice.

[About text]

Learn:          Connect:
Start Here      Mil-Spouse Intel
The Tools       My Progress
All Missions    Join the Community
Help & Safety   EdJustice Collective ↗

© 2026 EdJustice Collective · Build Systems. Promote Justice.
We collect only what you choose to share. We never sell your data.
Email chief@tieredjusticenow.com to delete your info at any time.
```

---

## SUCCESS METRICS

| Metric | Target | When to Assess |
|---|---|---|
| Mission completion rate | >40% of starters finish | After 50 visits |
| Badge earn rate | >60% of mission starters earn ≥1 badge | After 50 visits |
| Join form completions | >25% of visitors | After 100 visits |
| Mil-Spouse section visits | >30% of all visitors | After 100 visits |
| Future session interest captures | Track by installation | Ongoing |

---

## WHAT IS NOT IN THIS BUILD

| Item | Status |
|---|---|
| Taskade AI Coach embed | Deferred — Phase 4+ · Needs agent trained first |
| Live community stat counter | Deferred — Phase 5 · Hardcoded until Sheet is live |
| Session sign-up integration | Post-SPARK · Tally form with event-specific routing |
| AI Glow-Up Guide PDF update | Separate asset · Refresh after site is live |
| MLSC or EJC district product references | NOT on this site — wrong audience |
| User accounts / cross-device sync | Phase 5+ via email-based Sheet lookup |
| Netlify/Cloudflare migration | Only if GitHub Pages policy changes |

---

## BUILD STATUS TRACKER

Last updated: May 2026

```
Phase 1 — Foundation
  [✅] index.html          — Homepage complete · Self-contained
  [✅] style.css            — External CSS · GitHub Pages deploy
  [✅] progress.js          — External JS · GitHub Pages deploy
  [✅] config.js            — Placeholder · Apps Script code in comments
  [🔲] start.html           — Next to build

Phase 2 — Core Learning
  [🔲] tools.html
  [🔲] missions.html
  [🔲] mission-1.html
  [🔲] mission-7.html
  [🔲] mission-3.html

Phase 3 — Gamification Layer
  [🔲] progress.html
  [🔲] join.html
  [🔲] Apps Script deployed

Phase 4 — Full Content
  [🔲] mission-2.html
  [🔲] mission-4.html
  [🔲] mission-5.html
  [🔲] mission-6.html
  [🔲] mission-8.html
  [🔲] milspouse.html
  [🔲] safety.html

Phase 5 — Hardening + Launch
  [🔲] Security checklist complete
  [🔲] Mobile pass all pages
  [🔲] SPARK event integration
  [🔲] Live
```

---

*AI Family Room Foundational Build Master · v1.0 · EdJustice Collective · May 2026*
*"You already have the voice. AI just turns up the volume."*
