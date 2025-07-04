# BD.tracker

BD.tracker – Fullstack приложение, с упором на Frontend составляющую. Backend часть инкапсулирована в /api, тогда как Frontend реализован внутри /src с использованием методологии Feature Sliced Design.

Приложение представляет из себя таск трекер и было разработано с целью демонстрации лучших (по-моему мнению) практик написания и организации кода. Также в проекте тестируются новые для меня решения и оттачиваются навыки по их пременению.

Для лучшего понимания структуры и специфики проекта сначала рекомендуется ознакомиться с [документацией](./docs/). Также ссылки указаны ниже.

## App Stack

🍎 [Next.js 15](./docs/nextjs.md) - 🌈 React 19 - 🌊 [Tailwind CSS]('./docs/tailwind.md') - 🍞 shadcn/ui - 🐻 zustand - 📝 react-hook-form - 🎲 dnd-kit - 🍕 jest - 🍋 Cypress - 🥯 Prisma (PostgreSQL) - 💯 Redis - ✉️ nodemailer - 💬 socket.io? - ...

## App Features

📦 [FSD](./docs/fsd.md) - 🍌 [JWT](./docs/auth.md) - 🥕 Storybook UI Doc - ⭐️ [Full Test coverage](./docs/testing.md) - 🕊️ Swagger API doc - 🌴 [Device type view](./docs/device.md) - 🔫 WS chat? - 💧 PWA? - ...

## Running the app

📢📢📢 В корне проекта необходимо создать `.env` файл на основе примера (`.env.example`).

⚠️⚠️⚠️ Прежде, чем запустить приложение следует прочитать [инструкцию по настройке Docker'a](./docs/docker.md) и [инструкцию по настройке баз данных](./docs/db.md)

```bash
# development with webpack
$ bun dev

# development with turbopack
$ bun dev:turbo

# start app with production mode
$ bun prod

# production build
$ bun build

# production start
$ bun start
```
