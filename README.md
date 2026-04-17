# Chip’n Away at Heart Disease — HCI Mockup (2026)

Interactive web mockups for Dr. Spangler’s HCI 2026 team project.

## What’s in this repo
- **Static site pages** built with HTML/CSS + lightweight JavaScript.
- **Shared header/footer injection** via `home/javaScript.js`.
- **Wellness page (“Whistle‑Stop Wellness”)** with interactive micro‑interventions and local persistence.

## Quick start (run locally)
From the `home/` folder:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173/index.html`.

## Key pages
- **Home**: `home/index.html`
- **Wellness**: `home/wellness.html`

## Wellness: Whistle‑Stop Wellness features
The Wellness page is designed to feel like a small product experience (not just content):

- **Playcards (MOVE / FUEL / CALM)**: choose a 2‑minute “timeout” and get steps + “Why it matters”.
- **2‑minute timer**: start/pause/reset with a progress bar.
- **Bank a chip**: increments a weekly counter stored in `localStorage`.
- **Copy steps**: copies the current play to clipboard (fallbacks to prompt if clipboard isn’t available).
- **Resources**: expandable, credible links + quick action pills.
- **Micro‑Playbook Builder**: generates a tiny plan from a focus + minutes slider, auto‑selects a chip, and can be saved locally.
- **Weekly Chipboard**: weekly goal + progress ring + reflection note + shareable weekly summary.
- **Celebration**: tasteful animation when the weekly goal is hit (once per week per goal).

### Persistence (localStorage)
This mockup intentionally “remembers” small interactions on the same device:
- Weekly chip count: `chipnaway_wellness_week`
- Playbook: `chipnaway_playbook_v1`
- Chipboard goal/note/checklist: `chipnaway_chipboard_*`

To reset the experience, clear site data for `localhost` in your browser.

## Code map (where to change things)
- **Wellness UI**: `home/wellness.html`
- **Wellness styles**: `home/stylewellness.css`
- **Interactivity / shared templates**: `home/javaScript.js`

## Conventions
- Keep pages **static and dependency‑light** (no build step required).
- Prefer **small, modular JS functions** with defensive checks (features self‑exit on pages where elements don’t exist).
- Don’t commit OS files (see `.gitignore` for `.DS_Store`).
