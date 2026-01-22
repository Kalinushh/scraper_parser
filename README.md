# Scraper

Node.js сервис, который парсит товары напрямую из HTML-разметки страниц по CSS-селекторам (Cheerio).  
Без headless-браузеров и без клиентского JS-рендеринга.

## Что делает
- Делает HTTP-запросы к страницам (Axios)
- Парсит HTML (Cheerio) и извлекает данные из товарных карточек по CSS-селекторам
- Поддерживает пагинацию через query-параметр `pageParam` (по умолчанию `PAGEN_1`) и `maxPages`
- Возвращает результат в JSON и дополнительно сохраняет в файл `result.json`

## Стек

### Backend

Запуск: `scraper.js` (порт `3000`) node .\scraper.js

- Node.js (CommonJS)
- Express
- Axios
- Cheerio
- fs (запись результата в `result.json`)

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- ESLint / Prettier

Запуск:  (порт `5173`) 
cd frontend
npm run dev

## API

### `GET /api/parse`

#### Обязательные параметры
- `url` — базовый URL страницы каталога
- `product` — CSS-селектор элемента карточки товара (контейнер)

#### Опциональные параметры
- `title` — CSS-селектор внутри карточки
- `price` — CSS-селектор внутри карточки
- `image` — CSS-селектор внутри карточки
- `id` — CSS-селектор внутри карточки
- `maxPages` — количество страниц для обхода (по умолчанию `1`)
- `pageParam` — имя GET-параметра пагинации (по умолчанию `PAGEN_1`)

#### Пример запроса
http://localhost:3000/api/parse?url=https://i-ray.ru/iphone&pageParam=PAGEN_1&maxPages=5&product=.b-card.category_product&title=a[data-itemname]&price=meta[itemprop=%22price%22]&image=img.b-card-main-image&id=a[data-itemid]

#### Ответ
Массив объектов (поля зависят от того, какие селекторы переданы):
[
  {
    "title": "Название",
    "price": "9990",
    "image": "https://...",
    "id": "123"
  }
]

## Как работает пагинация

Для каждой страницы формируется URL:

- если в `url` уже есть `?`, добавляется `&`
- иначе добавляется `?`

Дальше подставляется:

`<pageParam>=<page>`

Пример:

`...?PAGEN_1=2`

## Важно

- Парсинг идёт из HTML. Если сайт подгружает товары только через JS на клиенте, данных в HTML может не быть.
