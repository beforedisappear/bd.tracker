import { PrismaClient } from '../generated/client/index.js';

const prisma = new PrismaClient();

type Args = { name: string; projectId: string; tenantId: string };

export const createBoard = async (args: Args) => {
  const board = await prisma.board.create({
    data: { ...args },
  });

  return board;
};
