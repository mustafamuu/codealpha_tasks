# Photo Gallery — CodeAlpha Internship Task

A responsive photo gallery web app, built as part of the CodeAlpha web development internship. The repo contains two implementations of the same brief: a "Filmstrip" contact-sheet style gallery, and a "Framefolio" visual-journal style gallery.

**Live demo:** _add your GitHub Pages / hosting link here once deployed_

![status](https://img.shields.io/badge/status-complete-brightgreen) ![made with](https://img.shields.io/badge/made%20with-HTML%2FCSS%2FJS-orange)

## Overview

Both versions let visitors browse a photo collection, filter it by category, and open any photo in a full-screen lightbox — built with plain HTML, CSS, and JavaScript, no frameworks or build tools.

## Versions

### 1. Filmstrip Gallery (`gallery/`)

A vintage film contact-sheet look: sprocket-hole details, amber accent palette, 20 photos across 4 categories.

- Category filtering (Nature / Urban / People / Night) with a live frame counter
- Lightbox with Prev/Next buttons and keyboard navigation (`←` `→` `Esc`)
- Fully responsive grid, visible focus states, respects reduced-motion

Files: `gallery/index.html`, `gallery/style.css`, `gallery/script.js`

### 2. Framefolio (`framefolio.html`)

A "visual journal" look: full-bleed hero, search/sort/shuffle toolbar, 28 photos across 4 categories (Nature / Urban / Travel / Coast).

- Live search by title, location, or category
- Sort (A–Z / Z–A / featured) and shuffle
- Lightbox with Prev/Next and keyboard navigation
- Single self-contained HTML file (markup, styles, and script together)

## Tech stack

- HTML5
- CSS3 (custom properties, CSS Grid, no framework)
- Vanilla JavaScript (no dependencies)
- Google Fonts (Archivo Expanded / IBM Plex Mono / Inter for Filmstrip, Outfit / DM Mono for Framefolio)

## Project structure

```
.
├── gallery/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── framefolio.html
└── README.md
```

## Running locally

No build step required.

```bash
git clone https://github.com/mustafamuu/<repo-name>.git
cd <repo-name>
# open gallery/index.html or framefolio.html directly in a browser, or serve the folder:
python3 -m http.server 8000
```

Then visit `http://localhost:8000/gallery/` or `http://localhost:8000/framefolio.html`.

## Credits

Photos sourced from [Unsplash](https://unsplash.com).

## Author

**Mustafa Mohamed**
Software Engineering student, Faculty of Computers and Information — Sadat Academy for Management Sciences
GitHub: [@mustafamuu](https://github.com/mustafamuu)

Built for the **CodeAlpha** web development internship.