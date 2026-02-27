# Nisshin — Retro Pop Art Single Page Website

A long-scrolling, single-page website featuring a 1970s/80s retro pop-art aesthetic with "rubber hose" animation style characters.

## Sections

1. **Sticky Header** — Logo + pill-shaped nav buttons
2. **Hero ("NISSHIN")** — Layered 3D title with checkerboard floor, clouds, sparkles, and three characters
3. **List & Character** — Repeated "NISSHIN" text + duo illustration with meta descriptions
4. **"GOOD NEWS"** — Massive dark text with sun-in-flames character and orange checkerboard floor
5. **"FUNNY TIME" Browser** — Retro browser window with dancing sun character
6. **Browser Grid Gallery** — 2x3 grid of mini browser windows showcasing all characters
7. **"SUMMER VIBE" Banner** — Large white text with black shadow on checkerboard background
8. **"ENJOY LIFE"** — Multi-colored individual letters with hand character and pink floor
9. **"MULTILINGUAL"** — Typography showcase with filled and outlined text, orbital decorations
10. **"THANK YOU" Footer** — Closing section with characters and checkerboard background

## Quick Start

```powershell
cd public
python -m http.server 8080
# Open http://localhost:8080
```

Or simply open `index.html` directly in a browser.

## Tech Stack

- **HTML5** semantic markup
- **CSS3** with Flexbox, Grid, CSS custom properties, perspective transforms
- **Google Fonts**: Titan One, Peralta, Rubik Mono One, Lilita One
- **SVG** character illustrations (rubber hose cartoon style)

## File Structure

```
public/
  index.html          — Main HTML page (10 sections)
  styles.css          — Complete stylesheet (~1060 lines)
  assets/
    logo.svg          — Header logo
    daisy.svg         — Daisy flower character
    duo.svg           — Globe + Sun duo with flag
    duo_small.svg     — Smaller duo variant
    hand.svg          — Gloved hand with cigarette
    sun.svg           — Dancing sun character
    sun_flame.svg     — Sun reading newspaper in flames
    sun_wind.svg      — Sun being blown by wind
    cash_hand.svg     — Hand holding fan of cash
```

## Features

- Fully responsive (desktop, tablet, mobile breakpoints)
- Smooth hover animations on characters and buttons
- Floating cloud and twinkling star animations
- Perspective 3D checkerboard floor effects
- Retro browser window UI components
- Custom scrollbar styling
- CSS-only decorative patterns (no images for backgrounds)
