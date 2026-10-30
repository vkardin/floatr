<p align="center"><img src="docs/img/logo.svg" width="96" alt="Логотип Floatr"></p>

<h1 align="center">Floatr</h1>

<p align="center"><b>Плавающий видеоплеер, который помнит, где вы остановились.</b></p>

<p align="center">
  <a href="README.md">English</a> · <b>Русский</b> · <a href="README.uk.md">Українська</a>
</p>

<p align="center">
  <a href="https://github.com/vkardin/floatr/releases"><img src="https://img.shields.io/badge/Chrome-extension-0d9488?logo=googlechrome&logoColor=white" alt="Chrome"></a>
  <a href="https://github.com/vkardin/floatr/releases"><img src="https://img.shields.io/badge/Firefox-add--on-0d9488?logo=firefoxbrowser&logoColor=white" alt="Firefox"></a>
  <a href="https://vkardin.github.io/floatr/"><img src="https://img.shields.io/badge/Website-floatr-0d9488" alt="Сайт"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-0d9488" alt="MIT"></a>
</p>

Floatr выносит любое веб-видео в плавающее окно поверх остальных, забирает с собой субтитры сайта и запоминает точную секунду остановки для каждого видео. Отмечайте моменты заметками, выгружайте их в аккуратный Markdown для Obsidian или Notion и делитесь ссылками, которые открываются сразу на нужном таймкоде.

## Возможности

- **Умный плавающий плеер.** Document Picture-in-Picture API: в окне есть собственные кнопки Floatr и субтитры сайта. Если API нет, используется нативный Picture-in-Picture, а там, где нет и его (например, в Firefox), встроенный мини-плеер на странице, который можно перетаскивать и растягивать.
- **Субтитры не пропадают.** Сабы, которые рисует сам сайт (YouTube, Netflix, Video.js, Plyr, JW Player, Shaka и другие), дублируются в плавающее окно.
- **Память таймкодов.** Floatr сохраняет позицию каждого видео и при следующем заходе предлагает «Продолжить с 12:34?».
- **Закладки и заметки к кадру.** Из попапа, из плавающего окна или по <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.
- **Экспорт в Markdown.** Заметки одного видео или все сразу в чистый `.md` с кликабельными таймкодами.
- **Копировать ссылку с таймкодом** в один клик (YouTube, Vimeo, Twitch и обычные ссылки `#t=`).
- **Режим тени.** Ползунок прозрачности от 30% до 100% для мини-плеера поверх страницы (отдельное окно браузер всегда делает непрозрачным).
- **Быстрый контроль.** Скорость 0.25×–4× и пресеты громкости прямо в плеере и в попапе, плюс горячие клавиши.
- **Настраиваемые кнопки.** Выбирайте, какие элементы показывать в плавающем окне.
- **Интерфейс на русском, украинском и английском**; попап следует системной светлой или тёмной теме.

### Горячие клавиши

| Действие | Клавиши |
| --- | --- |
| Вынести видео / вернуть | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (на странице) |
| Быстрее / медленнее | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> / <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>,</kbd> |
| Закладка на текущий момент | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> |
| В плавающем окне | <kbd>Пробел</kbd> пуск/пауза, <kbd>←</kbd>/<kbd>→</kbd> ±5 с, <kbd>&lt;</kbd>/<kbd>&gt;</kbd> скорость |

Глобальные сочетания меняются на странице `chrome://extensions/shortcuts` (в Firefox: *Управление горячими клавишами* в меню дополнений).

## Установка

**Из магазинов:** страницы в Chrome Web Store, Firefox Add-ons и Opera Addons скоро появятся.

**Вручную из Releases:**

1. Скачайте `floatr-chrome-<версия>.zip` или `floatr-firefox-<версия>.zip` из [Releases](https://github.com/vkardin/floatr/releases).
2. Chrome, Edge, Brave, Opera: распакуйте архив, откройте `chrome://extensions`, включите *Режим разработчика*, нажмите *Загрузить распакованное* и выберите папку.
3. Firefox: откройте `about:debugging#/runtime/this-firefox`, нажмите *Загрузить временное дополнение* и выберите zip.

**Из исходников:**

```bash
git clone https://github.com/vkardin/floatr.git
cd floatr
python3 tools/build.py        # dist/floatr-chrome-1.0.0.zip, dist/floatr-firefox-1.0.0.zip
```

Для разработки загрузите папку `extension/` напрямую через *Загрузить распакованное*.

### Как проверить локально

1. Загрузите `extension/` как распакованное расширение и откройте страницу с видео (например, YouTube).
2. Наведите курсор на видео и нажмите кнопку Floatr в правом верхнем углу или <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>. Включите субтитры и убедитесь, что они видны в плавающем окне.
3. Посмотрите немного, перезагрузите страницу и нажмите «Продолжить».
4. Добавьте пару закладок с заметками в попапе и нажмите «Экспорт всего».

## Приватность

Floatr работает полностью в браузере. Настройки и закладки хранятся в синхронизируемом хранилище браузера, позиции просмотра в локальном. Никаких серверов, аналитики и трекеров. Подробнее: [политика конфиденциальности](https://vkardin.github.io/floatr/privacy.html).

## Обратная связь и поддержка

Нашли ошибку или есть идея? Создайте [issue](https://github.com/vkardin/floatr/issues/new/choose). Если Floatr экономит вам время, можно [поддержать проект](https://vkardin.github.io/floatr/#donate).

## Репозиторий

```
extension/        исходники расширения (manifest.json, content/, background/, popup/, shared/, _locales/, icons/)
docs/             сайт для GitHub Pages
store/            тексты для магазинов и спецификация графики
tools/build.py    сборка архивов для Chrome и Firefox
.github/          шаблоны issues и workflow релизов
```

## Лицензия

[MIT](LICENSE) © vkardin
