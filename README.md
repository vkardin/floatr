<p align="center"><img src="docs/img/logo.svg" width="96" alt="Video Drift"></p>

<h1 align="center">Video Drift</h1>

<p align="center"><b>A floating video player that remembers where you stopped</b><br>
English · <a href="README.ru.md">Русский</a> · <a href="README.uk.md">Українська</a></p>

<p align="center">
<a href="../../releases"><img alt="Chrome" src="https://img.shields.io/github/v/release/vkardin/videodrift?label=Chrome&logo=googlechrome&logoColor=white"></a>
<a href="../../releases"><img alt="Firefox" src="https://img.shields.io/github/v/release/vkardin/videodrift?label=Firefox&logo=firefoxbrowser&logoColor=white"></a>
<a href="https://vkardin.github.io/videodrift/"><img alt="Website" src="https://img.shields.io/badge/site-vkardin.github.io%2Fvideo--drift-222"></a>
<a href="LICENSE"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-blue"></a>
</p>

Video Drift pops any web video into a floating window that stays on top while you work. The site's subtitles go with it, the exact second you stopped is remembered for every video, and your notes to the frame export to a tidy Markdown file. Works on YouTube, Twitch, online courses and any other site with HTML5 video. Free, no account needed.

## Install

- **Chrome, Edge, Brave, Opera:** Chrome Web Store listing is on the way; meanwhile use the zip below
- **Firefox:** Firefox Add-ons listing is on the way; meanwhile use the zip below
- **Manual install:** zip files for Chrome and Firefox on the [Releases](../../releases) page. Chrome: unzip, open `chrome://extensions`, turn on Developer mode, click *Load unpacked*. Firefox: `about:debugging` → *Load Temporary Add-on*

## Features

- Floating window with its own controls (Document Picture-in-Picture), native PiP as a fallback, or a mini player over the page
- Subtitles drawn by the site (YouTube, Netflix, Video.js, Plyr, JW Player and more) stay with the video
- Remembers the playback position of every video and offers *Continue from 12:34?*
- Bookmarks with notes to the frame; export one video or everything to Markdown for Obsidian or Notion
- Copy a link that opens the video at the current second
- Seek bar, speed 0.25×–4×, volume presets and hotkeys right in the player
- Shadow mode: opacity 30–100% for the mini player over the page
- Choose which buttons the player shows; English, Русский, Українська; light and dark popup

### Hotkeys

| Action | Keys |
|---|---|
| Float the video / bring it back | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on the page |
| Faster / slower | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> / <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>,</kbd> |
| Bookmark the current moment | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> |
| In the floating window | <kbd>Space</kbd>, <kbd>←</kbd>/<kbd>→</kbd> ±5 s, <kbd>&lt;</kbd>/<kbd>&gt;</kbd> speed |

## Privacy

Video Drift collects no data and sends nothing anywhere: everything runs on your device. [Privacy policy](https://vkardin.github.io/videodrift/privacy.html).

## Feedback and support

- Ideas and bug reports: [feedback page](https://vkardin.github.io/videodrift/support.html) or [GitHub Issues](../../issues/new/choose)
- Support the project with crypto: [https://vkardin.github.io/videodrift/#donate](https://vkardin.github.io/videodrift/#donate)

## Repository

| Folder | What is inside |
|---|---|
| [`extension/`](extension) | Extension source (load via `chrome://extensions` → Developer mode → Load unpacked) |
| [`docs/`](docs) | Website, served by GitHub Pages |
| [`store/`](store) | Store listing texts and graphics specification |
| [`tools/`](tools) | `build.py` packs the Chrome and Firefox zips |

## More from the author

- [Video Glow](https://vkardin.github.io/video-glow/): ambient light in the colours of the picture around any video in your browser.
- [Leveler](https://vkardin.github.io/leveler/): evens out the loudness of any video: quiet dialogue louder, explosions softer.
- [Snapt](https://vkardin.github.io/snapt/): a fast, open-source screenshot tool for Windows, macOS and Linux.

## License

[MIT](LICENSE) © vkardin
