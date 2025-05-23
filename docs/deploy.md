### С использованием Docker для Next.js и основной конфигурации (prod mode)

В данном случае поднимаются все компоненты системы. Используется только `docker-compose.yml` файл.

Для корректной работы необходимо указать соответсвующие env-переменные (помечены без комментария с "dev" меткой).

Далее воспользоваться следующими командами:

```bash
# build Docker images
$ bun docker:build

# start Docker containers
$ bun docker:up

# stop and remove Docker containers
$ bun docker:down
```

После следует зайти в Docker контейнер `bd_postgres_container` и прописать следующе команду `db:pg:migrate:prod`
