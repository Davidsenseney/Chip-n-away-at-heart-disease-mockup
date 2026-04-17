# Wellness — Whistle‑Stop Wellness (Individual Contribution: Reema Bhaskar)

This README documents the **Wellness** portion of the mockup: **Whistle‑Stop Wellness** and the interactive features added to `home/wellness.html`.

## Run the Wellness page locally
From the `home/` folder:

```bash
python3 -m http.server 5173
```

Open `http://localhost:5173/wellness.html`.

## Feature overview
Whistle‑Stop Wellness is designed to feel like a small product experience (not just static content):

- **Playcards (MOVE / FUEL / CALM)**: choose a 2‑minute “timeout” and get steps + “Why it matters”.
- **2‑minute timer**: start/pause/reset with a progress bar.
- **Bank a chip**: increments a weekly counter stored in `localStorage`.
- **Copy steps**: copies the current play to clipboard (fallbacks to prompt if clipboard isn’t available).
- **Resources**: expandable, credible links + quick action pills.
- **Micro‑Playbook Builder**: generates a tiny plan from a focus + minutes slider, auto‑selects a chip, and can be saved locally.
- **Weekly Chipboard**: weekly goal + progress ring + reflection note + shareable weekly summary.
- **Celebration**: tasteful animation when the weekly goal is hit (once per week per goal).

## Persistence (localStorage)
This mockup intentionally “remembers” small interactions on the same device:
- Weekly chip count: `chipnaway_wellness_week`
- Playbook: `chipnaway_playbook_v1`
- Chipboard goal/note/checklist: `chipnaway_chipboard_*`

To reset the experience, clear site data for `localhost` in your browser.

## Files touched (Wellness)
- **UI / layout**: `home/wellness.html`
- **Styles**: `home/stylewellness.css`
- **Interactivity**: `home/javaScript.js`
