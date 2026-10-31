<p align="center"><img src="docs/img/logo.svg" width="96" alt="Aloft logo"></p>

<h1 align="center">Aloft</h1>

<p align="center"><b>The floating video player that remembers where you stopped.</b></p>

<p align="center">
  <b>English</b> · <a href="README.ru.md">Русский</a> · <a href="README.uk.md">Українська</a>
</p>

<p align="center">
  <a href="https://github.com/vkardin/floatr/releases"><img src="https://img.shields.io/badge/Chrome-extension-0d9488?logo=googlechrome&logoColor=white" alt="Chrome"></a>
  <a href="https://github.com/vkardin/floatr/releases"><img src="https://img.shields.io/badge/Firefox-add--on-0d9488?logo=firefoxbrowser&logoColor=white" alt="Firefox"></a>
  <a href="https://vkardin.github.io/floatr/"><img src="https://img.shields.io/badge/Website-aloft-0d9488" alt="Website"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-0d9488" alt="MIT"></a>
</p>

Aloft pops any web video out into a floating window that stays on top while you work, keeps the site's subtitles with it, and remembers the exact second you stopped on every video. Mark moments with notes, export them to a tidy Markdown file for Obsidian or Notion, and share links that open right at the timecode.

## Features

- **Smart floating player.** Uses the Document Picture-in-Picture API so the window carries Aloft's own controls and the site's subtitles. Falls back to native Picture-in-Picture, and to an in-page mini player (draggable, resizable) where neither is available, for example in Firefox.
- **Subtitles stay with the video.** Captions rendered by the site (YouTube, Netflix, Video.js, Plyr, JW Player, Shaka and others) are mirrored into the floating window.
- **Timecode memory.** Aloft saves the playback position of every video and offers *Continue from 12:34?* the next time you open it.
- **Bookmarks and frame notes.** Save a moment with an optional note from the popup, from the floating window or with <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.
- **Markdown export.** Export the notes of one video or of everything into a clean `.md` file with clickable timecodes.
- **Copy link with timecode** in one click (YouTube, Vimeo, Twitch and generic `#t=` links).
- **Shadow mode.** An opacity slider from 30% to 100% for the mini player over the page (a separate window is always opaque in browsers).
- **Quick control.** Playback speed 0.25×–4× and volume presets right in the player and the popup, plus hotkeys.
- **Customisable buttons.** Choose which controls the floating window shows.
- **English, Russian and Ukrainian** interface; the popup follows the system light or dark theme.

### Hotkeys

| Action | Keys |
| --- | --- |
| Float the video / bring it back | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (on the page) |
| Faster / slower | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> / <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>,</kbd> |
| Bookmark current moment | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> |
| Inside the floating window | <kbd>Space</kbd> play/pause, <kbd>←</kbd>/<kbd>→</kbd> ±5 s, <kbd>&lt;</kbd>/<kbd>&gt;</kbd> speed |

Global shortcuts can be changed at `chrome://extensions/shortcuts` (Firefox: *Manage Extension Shortcuts* in the add-ons menu).

## Install

**From the stores:** Chrome Web Store, Firefox Add-ons and Opera Addons listings are on the way.

**Manual install from Releases:**

1. Download `aloft-chrome-<version>.zip` or `aloft-firefox-<version>.zip` from [Releases](https://github.com/vkardin/floatr/releases).
2. Chrome, Edge, Brave, Opera: unzip the archive, open `chrome://extensions`, turn on *Developer mode*, click *Load unpacked* and pick the unzipped folder.
3. Firefox: open `about:debugging#/runtime/this-firefox`, click *Load Temporary Add-on* and pick the zip (or `manifest.json` inside it).

**From source:**

```bash
git clone https://github.com/vkardin/floatr.git
cd aloft
python3 tools/build.py        # dist/aloft-chrome-1.0.0.zip, dist/aloft-firefox-1.0.0.zip
```

For development, load the `extension/` folder directly with *Load unpacked*.

### Testing locally

1. Load `extension/` as an unpacked extension and open any page with a video (YouTube works well).
2. Hover the video and click the Aloft button in its top right corner, or press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>. Turn on subtitles and check that they show in the floating window.
3. Watch for a while, reload the page and accept *Continue from…*.
4. Add a couple of bookmarks with notes in the popup and click *Export all*.

## Privacy

Aloft works entirely in your browser. Settings and bookmarks are kept in browser sync storage, playback positions in local storage. There are no servers, no analytics and no trackers. Details: [privacy policy](https://vkardin.github.io/floatr/privacy.html).

## Feedback and support

Found a bug or have an idea? Open an [issue](https://github.com/vkardin/floatr/issues/new/choose). If Aloft saves you time, you can [support the project](https://vkardin.github.io/floatr/#donate).

## Repository

```
extension/        extension source (manifest.json, content/, background/, popup/, shared/, _locales/, icons/)
docs/             website for GitHub Pages
store/            store listings and graphics specification
tools/build.py    builds release archives for Chrome and Firefox
.github/          issue templates and the release workflow
```

## License

[MIT](LICENSE) © vkardin
