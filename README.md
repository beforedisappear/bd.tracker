# BD.tracker

BD.tracker - Fullstack приложение, с упором на Frontend составляющую. Backend часть инкапсулирована в /api, тогда как Frontend реализован внутри /src с использованием методологии Feature Sliced Design.

## App Stack

🍎 Next.js 15 - 🌈 React 19 - 🌊 Tailwind CSS - 🍞 shadcn/ui - 🐻 zustand - 📝 - react-hook-form - 🎲 dnd-kit - 🍕 jest - ❓Cypress - 🥯 Prisma (PostgreSQL) - 💯 Redis - ✉️ nodemailer - 💬 socket.io? - ...

## App Features

📦 [FSD](./docs/fsd.md) - 🍌 Light & Dark mode - 🥕 Storybook UI Doc - ⭐️ [Full Test coverage](./docs/testing.md) - 🕊️ Swagger API doc - 🌴 [Device type view](./docs/device.md) - 🔫 WS chat? - 💧 PWA? - ...

## Running the app

📢📢📢 В корнец проекта необходимо создать `.env` файл на основе примера.

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
