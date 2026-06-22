# EdJustice Collective — Design System

**EdJustice Collective (EJC)** is a K–12 leadership infrastructure studio. Tagline: **Build Systems. Promote Justice.** EJC produces briefs, one-pagers, board packets, course materials, and landing pages for principals, assistant principals, superintendents, and district leaders.

This design system encodes EJC's **"clean and light"** house standard: light/white and off-white fields, **teal** as the single brand accent, large readable **left-aligned** Poppins type, and dark reserved only for a thin footer bar — never a full-width dark header band. Every document scans in 15 seconds and rewards a deep read.

- Websites: **theedjusticecollective.com** · **aifamilyroom.com**
- Contact in document footers: `chief@tieredjusticenow.com`
- Signatory: Tyra L. Harrison · Chief Possibility Pilot

## Source materials
This system was built from assets the client provided (stored in `uploads/` for reference; the reader is not assumed to have access):

- `uploads/EJC_Design_System.html` — the canonical brand reference (the "clean & light standard"). Defines colors, type, header pattern, callout/panel, finding card, bullets, footer. **This is the source of truth.**
- `uploads/EJC_OASD_Mailer_v1.pdf` — a real 5-page board packet ("Oshkosh Area School District read-ahead"). Source for voice, document structure, and section patterns.
- Logos: `Color logo - no background.svg`, `Black logo - no background.svg`, `White logo - no background.svg`, `Color logo with background.svg`, `187027564_padded_logo.png` — copied into `assets/`.
- App/mark icons: `iPhone.png`, `Android.png`, `browser.png` (favicon) — copied into `assets/`.

---

## Content fundamentals — how EJC writes

**Tone.** Plain language a smart non-educator understands on first read. Confident, precise, warm without being soft. It reads like analysis, not encouragement — but it is generous and respectful throughout.

**Voice & framing (non-negotiable).** EJC is **asset-based**. Always name the *systems gap*, never a person's deficit. Traps are system failures, not individual ones. Example from the packet: *"This is not a governance failure. This is a board that needed a five-indicator visibility tool and did not have one."* Never frame a leader as deficient.

**Person.** Speaks directly to the reader as **"you"** ("This packet was prepared specifically for you"). EJC refers to itself as "EJC" or "we." Outcome-forward, active voice.

**Casing.**
- **Eyebrows / labels / footer:** UPPERCASE with wide letter-spacing (teal).
- **Titles & headlines:** sentence case, never ALL CAPS for headlines that carry meaning (e.g. *"The board heard the community before it acted."*).
- **Section headings:** short UPPERCASE labels (e.g. *"WHAT YOUR BOARD HAS DONE WELL"*).

**Headlines** are full sentences with a subject and a verb — they state a finding, not a topic. *"The board approved a revised plan by a 4–3 vote — not unanimous, not rubber-stamped."*

**Rhythm.** Bold lead-in + plain explanation is the standard list item. One idea per bullet, 1–2 lines each. The teal **insight line** (prefixed `✦`) closes a finding by naming what it means in systems language.

**Emoji.** Used *only* as a single scan-marker anchoring a section in non-sensitive contexts (📋 📅 🏛 📍 appear in the packet). Sensitive/serious documents stay clean — no emoji. Never decorative, never more than one per heading. The default brand section marker is a **teal rounded square**, not an emoji.

**Avoid:** deficit framing about leaders, heavy jargon, dense walls of text, centered/justified copy, spin.

---

## Visual foundations

**Backgrounds.** Light only — white (`#FFFFFF`) for document pages, off-white (`#F9FAFB`) for the app/canvas behind them. No full-bleed photography, no gradients, no textures or repeating patterns. Warmth comes from **teal-pale** (`#E0F7F5`) callout fields and off-white — never from black. Dark (`#0B1215`) appears **only** as the thin footer bar and at most one small card per document.

**Color.** Teal (`#1ABCB0`) is the whole brand. `--teal-dark` for hover/pressed, `--teal-deep` for insight lines and section headings on light, `--teal-pale` for callout panels. Orange (`#F28C38`) = caution, Green (`#34C78A`) = proof — used sparingly. Text `#1A2A30`, secondary `#4A5C64`, tertiary/meta `#8A9BA3`.

**Type.** Poppins (300/400/600/700/800/900). Body 15–16px, lead 18px, line-height ~1.7. **Everything left-aligned — justification is banned.** Type scales **up**, never down: if content doesn't fit, the document gets longer, not the type smaller. Eyebrows are 11px uppercase, `.16em` tracking, teal. Display/hero titles 800–900 weight with slight negative tracking.

**Spacing & layout.** 4px base scale. Generous gaps between sections. **No section with 3+ unbroken prose paragraphs; no paragraph over ~5 lines without a break.** Document pages are ~860px wide with `48px 58px 64px` padding. Header is a flex row: eyebrow/title left, logo mark top-right.

**Borders & rules.** Hairlines are `#E8EAEA`. The signature device is the **teal rule**: 2.5px under a document header, 1.5px under each section heading. Cards use a 1px warm border, never a colored left-border-only accent.

**Corner radii.** Section marker / chips `5px`; cards & swatches `10px`; large surfaces `14px`; buttons & tags pill (`999px`).

**Cards.** White, 1px `#E8EAEA` border, `10px` radius, restrained shadow. Anatomy: teal uppercase eyebrow → dark sentence headline → gray body → hairline → **teal-deep insight line** below it. Boxes are rare and self-sizing — most emphasis is a teal panel or a teal insight line.

**Shadows.** Restrained. Page float `0 2px 24px rgba(0,0,0,.08)`; card `0 1px 3px rgba(11,18,21,.06)`; raised/hover `0 6px 20px rgba(11,18,21,.10)`. No glows, no neon.

**Motion.** Minimal and functional. `cubic-bezier(0.4,0,0.2,1)`, 120–200ms. Hover = darken teal (`--teal` → `--teal-dark`) or a small lift; press = slightly deeper teal. No bounces, no infinite decorative loops.

**Imagery vibe.** This is a documents-first brand. There is essentially no photography; the visual interest is typographic and the teal accent system. When imagery is needed, keep it cool and restrained.

---

## Iconography

EJC has **no custom icon font or icon set** in the provided materials. The brand mark itself — three people + a gavel inside a rounded "screen/board" — is the primary glyph (`assets/mark-teal.png`, `assets/app-icon.png`).

- **Section markers** are a **teal rounded square** (drawn in CSS, not an icon), one per heading.
- **Emoji** are used sparingly as section scan-markers in non-sensitive docs only (📋 📅 🏛 📍 ✦). `✦` (a Unicode star) prefixes every insight line.
- For UI affordances that genuinely need icons (chevrons, external-link, menu, arrows), use **[Lucide](https://lucide.dev)** via CDN — a thin, 2px-stroke, rounded line set that matches the brand's light feel. **This is a substitution** (no icon set was provided); see Caveats.

Always copy/link real icons — never hand-draw bespoke SVG iconography.

---

## Index — what's in this system

**Foundations / tokens**
- `styles.css` — global entry point (link this one file). `@import`s only.
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/fonts.css` · `tokens/base.css`

**Assets** (`assets/`)
- `logo-color.svg`, `logo-black.svg`, `logo-white.svg`, `logo-color-bg.svg`, `logo-square.png` — logo lockups
- `mark-teal.png`, `app-icon.png`, `favicon.png` — standalone mark / app icons

**Components** (`components/`) — React primitives (see each `*.prompt.md`)
- `core/` — `Button`, `Eyebrow`, `Badge`, `SectionHeading`, `Callout`, `BulletList`, `FindingCard`, `DocHeader`, `DocFooter`

**UI kits** (`ui_kits/`)
- `board_packet/` — a multi-section EJC board-packet document (the core deliverable)
- `website/` — the theedjusticecollective.com marketing landing page

**Specimen cards** (`cards/`) — Design System tab swatches/specimens.

**Other**
- `SKILL.md` — Agent-Skills-compatible entry point.

---

## Caveats / substitutions
- **Fonts:** Poppins is the real brand typeface and is loaded from Google Fonts (`tokens/fonts.css`). No local binaries are bundled, so the compiler reports 0 `@font-face` files — this is expected; the webfont still loads everywhere via the CDN `@import`.
- **Icons:** No EJC icon set was provided. Lucide (CDN) is used as the closest match where UI icons are needed. Swap in an official set if one exists.
