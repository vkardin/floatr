# Vidrift — store graphics specification

Accent colour: `#2dd4bf` on dark `#11141c`, secondary `#0d9488`. Logo source: `docs/img/logo.svg`.

## Icons

| File | Size | Where |
| --- | --- | --- |
| `extension/icons/icon128.png` | 128×128 | Chrome Web Store, Opera, Firefox listing icon |
| `extension/icons/icon48.png` | 48×48 | Extensions page |
| `extension/icons/icon32.png`, `icon16.png` | 32×32, 16×16 | Toolbar |

The 128 px store icon should have 16 px transparent padding (96×96 artwork) per Chrome Web Store guidelines.

## Screenshots (1280×800, PNG, no transparency)

Save as `store/screenshots/<lang>/01-float.png` and so on, for `en`, `ru`, `uk`.

1. **01-float** — a YouTube lecture in the floating window over a notes app, subtitles on, control bar visible. Caption: "Float any video, subtitles included".
2. **02-resume** — a video page with the "Continue from 12:34?" prompt. Caption: "Continue right where you stopped".
3. **03-bookmarks** — the popup with three bookmarks with notes. Caption: "Bookmarks and notes to the frame".
4. **04-markdown** — the exported `.md` file open in Obsidian next to the video. Caption: "Export to Markdown for Obsidian and Notion".
5. **05-shadow** — the page mini player at 50% opacity over an article, speed 1.5× shown. Caption: "Shadow mode, speed and volume at hand".

Use the browser interface in the matching language, the system dark theme, and 125% zoom for readability.

## Promo images

| Asset | Size | Content |
| --- | --- | --- |
| Small promo tile (Chrome) | 440×280 | Logo, "Vidrift", tagline "Video that floats and remembers" |
| Marquee (Chrome) | 1400×560 | Floating window mockup on the right, logo and tagline on the left |
| Opera promo | 300×188 | Same as the small tile |

Keep text large (at least 28 px at 440×280), avoid screenshots inside small tiles.
