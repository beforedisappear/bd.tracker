# DB

Для корректной работы необходимо сгенерировать Prisma Client и применить существующие миграции к БД.

```bash
# generate prisma client
$ bun db:pg:generate

# apply migrations
$ bun db:pg:migrate:dev "init"
```
