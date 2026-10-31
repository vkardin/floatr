<p align="center"><img src="docs/img/logo.svg" width="96" alt="Логотип Vidrift"></p>

<h1 align="center">Vidrift</h1>

<p align="center"><b>Плаваючий відеоплеєр, який пам'ятає, де ви зупинилися.</b></p>

<p align="center">
  <a href="README.md">English</a> · <a href="README.ru.md">Русский</a> · <b>Українська</b>
</p>

<p align="center">
  <a href="https://github.com/vkardin/vidrift/releases"><img src="https://img.shields.io/badge/Chrome-extension-0d9488?logo=googlechrome&logoColor=white" alt="Chrome"></a>
  <a href="https://github.com/vkardin/vidrift/releases"><img src="https://img.shields.io/badge/Firefox-add--on-0d9488?logo=firefoxbrowser&logoColor=white" alt="Firefox"></a>
  <a href="https://vkardin.github.io/vidrift/"><img src="https://img.shields.io/badge/Website-vidrift-0d9488" alt="Сайт"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-0d9488" alt="MIT"></a>
</p>

Vidrift виносить будь-яке веб-відео у плаваюче вікно поверх інших, забирає з собою субтитри сайту та запам'ятовує точну секунду зупинки для кожного відео. Позначайте моменти нотатками, вивантажуйте їх в охайний Markdown для Obsidian чи Notion і діліться посиланнями, що відкриваються одразу на потрібному таймкоді.

## Можливості

- **Розумний плаваючий плеєр.** Document Picture-in-Picture API: у вікні є власні кнопки Vidrift і субтитри сайту. Якщо API немає, використовується нативний Picture-in-Picture, а там, де немає і його (наприклад, у Firefox), вбудований міні-плеєр на сторінці, який можна перетягувати й розтягувати.
- **Субтитри не зникають.** Саби, які малює сам сайт (YouTube, Netflix, Video.js, Plyr, JW Player, Shaka та інші), дублюються у плаваюче вікно.
- **Пам'ять таймкодів.** Vidrift зберігає позицію кожного відео й під час наступного відкриття пропонує «Продовжити з 12:34?».
- **Закладки та нотатки до кадру.** З попапу, з плаваючого вікна або за <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.
- **Експорт у Markdown.** Нотатки одного відео або всі одразу в чистий `.md` з клікабельними таймкодами.
- **Копіювати посилання з таймкодом** в один клік (YouTube, Vimeo, Twitch і звичайні посилання `#t=`).
- **Режим тіні.** Повзунок прозорості від 30% до 100% для міні-плеєра поверх сторінки (окреме вікно браузер завжди робить непрозорим).
- **Швидкий контроль.** Швидкість 0.25×–4× і пресети гучності просто в плеєрі та в попапі, а також гарячі клавіші.
- **Кнопки, що налаштовуються.** Обирайте, які елементи показувати у плаваючому вікні.
- **Інтерфейс українською, російською та англійською**; попап слідує системній світлій або темній темі.

### Гарячі клавіші

| Дія | Клавіші |
| --- | --- |
| Винести відео / повернути | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (на сторінці) |
| Швидше / повільніше | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> / <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>,</kbd> |
| Закладка на поточний момент | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> |
| У плаваючому вікні | <kbd>Пробіл</kbd> пуск/пауза, <kbd>←</kbd>/<kbd>→</kbd> ±5 с, <kbd>&lt;</kbd>/<kbd>&gt;</kbd> швидкість |

Глобальні сполучення змінюються на сторінці `chrome://extensions/shortcuts` (у Firefox: *Керування клавішами* в меню додатків).

## Встановлення

**З магазинів:** сторінки в Chrome Web Store, Firefox Add-ons та Opera Addons незабаром з'являться.

**Вручну з Releases:**

1. Завантажте `vidrift-chrome-<версія>.zip` або `vidrift-firefox-<версія>.zip` з [Releases](https://github.com/vkardin/vidrift/releases).
2. Chrome, Edge, Brave, Opera: розпакуйте архів, відкрийте `chrome://extensions`, увімкніть *Режим розробника*, натисніть *Завантажити розпаковане* та оберіть теку.
3. Firefox: відкрийте `about:debugging#/runtime/this-firefox`, натисніть *Завантажити тимчасовий додаток* і оберіть zip.

**З вихідного коду:**

```bash
git clone https://github.com/vkardin/vidrift.git
cd vidrift
python3 tools/build.py        # dist/vidrift-chrome-1.0.0.zip, dist/vidrift-firefox-1.0.0.zip
```

Для розробки завантажте теку `extension/` напряму через *Завантажити розпаковане*.

### Як перевірити локально

1. Завантажте `extension/` як розпаковане розширення й відкрийте сторінку з відео (наприклад, YouTube).
2. Наведіть курсор на відео й натисніть кнопку Vidrift у правому верхньому куті або <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>. Увімкніть субтитри й переконайтеся, що вони видні у плаваючому вікні.
3. Подивіться трохи, перезавантажте сторінку й натисніть «Продовжити».
4. Додайте кілька закладок з нотатками в попапі й натисніть «Експорт усього».

## Приватність

Vidrift працює повністю в браузері. Налаштування та закладки зберігаються в синхронізованому сховищі браузера, позиції перегляду в локальному. Жодних серверів, аналітики й трекерів. Докладніше: [політика конфіденційності](https://vkardin.github.io/vidrift/privacy.html).

## Зворотний зв'язок і підтримка

Знайшли помилку чи маєте ідею? Створіть [issue](https://github.com/vkardin/vidrift/issues/new/choose). Якщо Vidrift заощаджує вам час, можна [підтримати проєкт](https://vkardin.github.io/vidrift/#donate).

## Репозиторій

```
extension/        вихідний код розширення (manifest.json, content/, background/, popup/, shared/, _locales/, icons/)
docs/             сайт для GitHub Pages
store/            тексти для магазинів і специфікація графіки
tools/build.py    збирання архівів для Chrome і Firefox
.github/          шаблони issues і workflow релізів
```

## Ліцензія

[MIT](LICENSE) © vkardin
