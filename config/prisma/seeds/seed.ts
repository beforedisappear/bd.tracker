import { createUser } from './user.seed.ts';
import { createTeam } from './team.seed.ts';
import { createProject } from './project.seed.ts';
import { createBoard } from './board.seed.ts';
import { createColumn } from './column.seed.ts';
import { createTask } from './task.seed.ts';
import { createSticker } from './sticker.seed.ts';
import { Color, PrismaClient } from '../generated/client/index.js';
import { v4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const [testUser, user2, user3] = await Promise.all([
    createUser(process.env.TEST_USER_EMAIL!),
    createUser(`${v4()}@test.com`),
    createUser(`${v4()}@test.com`),
  ]);

  const team = await createTeam({
    name: 'BD Team',
    ownerId: testUser.id,
    membersIds: [user2.id, user3.id],
  });

  const project = await createProject({
    name: 'BD Project',
    membersIds: [testUser.id, user2.id, user3.id],
    teamId: team.id,
  });

  const boardArgs = {
    tenantId: team.id,
    projectId: project.id,
  };

  const [board1] = await Promise.all([
    createBoard({ name: 'B2B', ...boardArgs }),
    createBoard({ name: 'B2C', ...boardArgs }),
  ]);

  const stickerArgs = {
    tenantId: team.id,
    projectId: project.id,
    boardId: board1.id,
  };

  const [frontendSticker, backendSticker, designSticker, testingSticker] =
    await Promise.all([
      createSticker({ name: 'Frontend', color: Color.INDIGO, ...stickerArgs }),
      createSticker({ name: 'Backend', color: Color.GREEN, ...stickerArgs }),
      createSticker({ name: 'Design', color: Color.YELLOW, ...stickerArgs }),
      createSticker({ name: 'Testing', color: Color.RED, ...stickerArgs }),
    ]);

  const columnArgs = {
    boardId: board1.id,
    projectId: project.id,
    tenantId: team.id,
  };

  const [toDoColumn, inProgressColumn, doneColumn] = await Promise.all([
    createColumn({ name: 'To Do', ...columnArgs, order: 0 }),
    createColumn({ name: 'In Progress', ...columnArgs, order: 1000000 }),
    createColumn({ name: 'Done', ...columnArgs, order: 2000000 }),
  ]);

  const taskArgs = {
    tenantId: team.id,
    projectId: project.id,
    authorId: testUser.id,
  };

  await Promise.all([
    createTask({
      title: 'Разработка лендинга',
      columnId: toDoColumn.id,
      assigneeIds: [user2.id],
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      stickerIds: [frontendSticker.id, designSticker.id],
      order: 0,
      ...taskArgs,
    }),
    createTask({
      title: 'Тестирование UX-флоу',
      columnId: toDoColumn.id,
      stickerIds: [testingSticker.id],
      order: 1000000,
      ...taskArgs,
    }),
    createTask({
      title: 'Интеграция онлайн-оплаты',
      columnId: toDoColumn.id,
      order: 2000000,
      ...taskArgs,
    }),
    createTask({
      title: 'Добавление отзывов клиентов',
      columnId: toDoColumn.id,
      order: 3000000,
      ...taskArgs,
    }),
    createTask({
      title: 'Настройка событий (Yandex Metrica)',
      columnId: toDoColumn.id,
      order: 4000000,
      ...taskArgs,
    }),
    createTask({
      title: 'Разработка программы лояльности',
      columnId: toDoColumn.id,
      order: 5000000,
      ...taskArgs,
    }),
    createTask({
      title: 'Создание email-рассылки',
      columnId: toDoColumn.id,
      stickerIds: [backendSticker.id],
      order: 6000000,
      ...taskArgs,
    }),
    createTask({
      title: 'Добавление отзывов клиентов',
      columnId: toDoColumn.id,
      assigneeIds: [testUser.id],
      stickerIds: [designSticker.id],
      order: 7000000,
      ...taskArgs,
    }),
    createTask({
      title: 'Оптимизация времени загрузки',
      columnId: inProgressColumn.id,
      stickerIds: [frontendSticker.id],
      order: 0,
      ...taskArgs,
    }),
    createTask({
      title: 'Реализация корзины и оформления заказа',
      columnId: inProgressColumn.id,
      assigneeIds: [user3.id],
      stickerIds: [frontendSticker.id, backendSticker.id],
      order: 1000000,
      ...taskArgs,
    }),
    createTask({
      title: 'Дизайн прототипов',
      columnId: doneColumn.id,
      assigneeIds: [testUser.id],
      stickerIds: [designSticker.id],
      order: 0,
      ...taskArgs,
    }),
  ]);

  console.log('SEED_COMPLETED');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
