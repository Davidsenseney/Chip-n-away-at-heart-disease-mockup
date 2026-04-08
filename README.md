# Chip-n-away-at-heart-disease-mockup
This is the repository for the webpages accociated with Dr. Spangler's HCI 2026 team
leave notes here

## Feature - Whistle-Stop Wellness (Contributor: Reema Bhaskar)
- **What it is**: An isolated, clickable wellness micro-action feature added to `home/index.html` that lets users select a quick "chip" (MOVE, FUEL, CALM) and instantly see steps and a short rationale.
- **Key interactions**:
  - Select a playcard to update the "Your play" panel (steps + why it matters)
  - "Whistle Shuffle" to randomly choose a play
  - "Bank this chip" to increment a local-only weekly chip count (stored in browser `localStorage`)
  - "Copy steps" to copy the selected play to the clipboard
- **Navbar support**: Adds a "Wellness" nav link plus a "Chips" pill in the navbar that shows the current weekly chip count and scrolls to the wellness section on click.
