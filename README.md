# BD.tracker

BD.tracker – Fullstack приложение, с упором на Frontend составляющую. Backend часть инкапсулирована в `/api`, тогда как Frontend реализован внутри `/src` с использованием методологии Feature Sliced Design.

Приложение представляет из себя таск трекер и было разработано с целью демонстрации лучших (по-моему мнению) практик написания и организации кода при создании Frontend-приложения. Также в проекте тестируются новые для меня решения и оттачиваются навыки по их применению.

Серверная часть проекта по большей части носит вспомогательный характер и была разработана для демонстрации Frontend-функциональности.

Для лучшего понимания структуры и специфики проекта сначала рекомендуется ознакомиться с [документацией](./docs/). Также ссылки указаны ниже.

[Демонстрация работы](./docs/demo.md)

## App Stack

🍎 [Next.js 15](./docs/nextjs.md) - 🌈 React 19 - 🌊 [Tailwind CSS]('./docs/tailwind.md') - 🍞 shadcn/ui - ☀️ [Tanstack Query](./docs/tanstackquery.md) - 🐻 zustand - 📝 react-hook-form - 🎲 dnd-kit - 🍕 jest - 🍋 Cypress - 🥯 Prisma (PostgreSQL) - 💯 Redis - ✉️ nodemailer - 💬 WebSocket

## App Features

📦 [FSD](./docs/fsd.md) - 🍌 [JWT Auth](./docs/auth.md) - 🥕 Storybook UI Doc - ⭐️ [Test coverage](./docs/testing.md) - 🕊️ Swagger API doc - 🌴 [Device type view](./docs/device.md) - 🔫 [RealTime Update](./docs/realtime.md)

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
