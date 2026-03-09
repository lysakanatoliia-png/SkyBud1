# SKYBUD Forms

Система форм интервью клиентов компании SKYBUD. Деплоится на GitHub Pages.

## Структура
- `index.html` — главная страница с каталогом форм
- `client-call-interview-form.html` — Форма интервью клиента
- `engineering-call-interview-form.html` — Engineering Call Interview Form
- `css/styles.css` — основные стили
- `css/print.css` — стили для печати и PDF
- `js/main.js` — логика главной страницы
- `js/form-client.js` — логика формы 1
- `js/form-engineering.js` — логика формы 2

## Деплой на GitHub Pages
1. Залить все файлы в репозиторий.
2. Открыть **Settings → Pages**.
3. Выбрать **Source: Deploy from a branch**, branch `main` / root.
4. Сайт доступен по адресу: `https://[username].github.io/[repo-name]/`.

## Генерация PDF
Используется нативный `window.print()`. В браузере выбрать «Сохранить как PDF». Название файла задаётся автоматически через `document.title`.

## Автосохранение
Данные форм сохраняются в `localStorage` браузера. При повторном открытии показывается уведомление о восстановлении предыдущего сеанса.
## Размещение файлов в репозитории
Все файлы проекта размещены в корне репозитория в требуемой структуре (`index.html`, две HTML-формы, папки `css/` и `js/`, `README.md`) и готовы к публикации на GitHub Pages.

