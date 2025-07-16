import { PrismaClient } from '../generated/client/index.js';

const prisma = new PrismaClient();

type Args = {
  name: string;
  boardId: string;
  projectId: string;
  tenantId: string;
  order: number;
};

export const createColumn = async (args: Args) => {
  const column = await prisma.column.create({
    data: { ...args },
  });

  return column;
};
