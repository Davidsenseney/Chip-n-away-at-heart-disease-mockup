# Wellness Page Revision

Fork of [Chip-n-away-at-heart-disease-mockup](https://github.com/Davidsenseney/Chip-n-away-at-heart-disease-mockup) focused on **revising the Wellness page** to match the overall site design and fix dozens of small UI/UX issues.

## What this fork does

- Aligns `home/wellness.html` with the rest of the Chip-n-Away mockup
- Cleans up layout, styling, and interaction polish on the Wellness page
- Preserves and refines **Whistle‑Stop Wellness** — the interactive wellness experience (playcards, timer, chipboard, playbook builder, and more)

## Run locally

From the `home/` folder:

```bash
python3 -m http.server 5173
```

Open `http://localhost:5173/wellness.html`.

## Key files

- `home/wellness.html` — page structure and content
- `home/stylewellness.css` — Wellness-specific styles
- `home/javaScript.js` — interactivity (timer, chips, playbook, chipboard, etc.)

## Wellness features (Whistle‑Stop Wellness)

- **Playcards (MOVE / FUEL / CALM)**: 2‑minute timeouts with steps and “Why it matters”
- **Timer**: start/pause/reset with progress bar
- **Bank a chip**: weekly counter via `localStorage`
- **Micro‑Playbook Builder** and **Weekly Chipboard**: plan, track, and reflect on weekly goals

To reset stored data, clear site data for `localhost` in your browser.
