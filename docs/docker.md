## Docker

Локально приложение можно поднять 2 способами.

### Без использования Docker для Next.js (local mode)

В данном случае поднимаются только необходимые компоненты для работы приложения (PostgreSQL и Redis). Для этого спользуется `docker-compose-local.yml` файл.

Для корректной работы необходимо указать соответсвующие env-переменные (помечены комментарием с "@local" меткой).

Далее воспользоваться следующими командами:

```bash
# build Docker images
$ bun docker:build:local

# start Docker containers
$ bun docker:up:local

# stop and remove Docker containers
$ bun docker:down:local
```

Запуск приложения осуществляется с помощью команд указанных в [README.md](../README.md).

Приложение будет доступно на `localhost:3000`.

### С использованием Docker для Next.js и доп. конфигурации (Production-style)

В данном случае поднимаются все компоненты системы.

Перед запуском приложения необходимо создать `docker-compose.override.yml` в `config/docker`. Он используется для переопределения `docker-compose.yml`, он не отслеживается git поэтому в него можно безопасно вносить правки и поддерживать в актуальном состоянии основной конфиг.

Внутри `docker-compose.override.yml` указать свой конфиг на основе примера из `docker-compose.override.example.yml`

Для корректной работы необходимо указать соответсвующие env-переменные (помечены без комментария с "dev" меткой).

Далее воспользоваться следующими командами:

```bash
# build Docker images
$ bun docker:build:override

# start Docker containers
$ bun docker:up:override

# stop and remove Docker containers
$ bun docker:down:override
```

Приложение будет доступно спуcтя несколько секунд на `localhost`.
