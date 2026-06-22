# AI Family Room — rebuilt site (EdJustice Collective brand)

This folder is the complete, ready-to-publish site. Everything in here is what
goes live; nothing else is needed.

## What's inside
- 18 pages: index, about, start, tools, missions, progress, mission-1/2/3/5/6/7/8,
  parents, parent-1/2, milspouse, next-mission, safety, what-could-go-wrong,
  share-kit, join
- `afr/` — shared styles + scripts (site.css, mission.css, mission.js,
  missions-map.js, progress-page.js, art-of-the-ask.js, and the homepage's
  app.jsx / sections.jsx / tweaks-panel.jsx)
- `assets/` — EJC logos
- `_ds/` — the EdJustice Collective design-system bundle (the HOMEPAGE loads this;
  keep it)
- `config.js`, `progress.js`, `cta-helper.js` — gamification engine (unchanged)
- `CNAME` — keeps the custom domain aifamilyroom.com

## Push it live (replaces the old site in EJ25-lab/ai-family-room)

```bash
# from a fresh clone of your repo
git clone https://github.com/EJ25-lab/ai-family-room.git
cd ai-family-room

# remove the old site files (keep .git). Then copy everything from this dist/ in.
# (drag the contents of dist/ into the repo folder, overwriting)

git add -A
git commit -m "Rebuild site in EdJustice Collective brand"
git push origin main
```

GitHub Pages will redeploy automatically. The custom domain stays put because
`CNAME` is included.

## Notes
- The old `style.css` (62k monolith) and `img/` folder are no longer used — you can
  delete them once the new files are in.
- mission-7's Tally embed keeps the `YOUR_TALLY_FORM_ID` placeholder — drop in your
  real form ID before or after pushing.
- `skill-card.html` from the old repo was not rebuilt (it isn't linked in the nav).
  It can stay as-is or be removed.
