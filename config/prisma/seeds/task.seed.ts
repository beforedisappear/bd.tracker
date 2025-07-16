import { PrismaClient } from '../generated/client/index.js';

const prisma = new PrismaClient();

type Args = {
  title: string;
  authorId: string;
  tenantId: string;
  projectId: string;
  columnId: string;
  description?: string;
  stickerIds?: string[];
  assigneeIds?: string[];
};

export const createTask = async (args: Args) => {
  const { stickerIds, assigneeIds, ...rest } = args;

  const task = await prisma.task.create({
    data: {
      ...rest,
      stickers: { connect: stickerIds?.map(id => ({ id })) || [] },
      assignees: { connect: assigneeIds?.map(id => ({ id })) || [] },
    },
  });

  return task;
};
