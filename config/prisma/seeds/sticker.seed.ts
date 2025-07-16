import { Color, PrismaClient } from '../generated/client/index.js';

const prisma = new PrismaClient();

type Args = {
  name: string;
  tenantId: string;
  projectId: string;
  boardId: string;
  color: Color;
};

export const createSticker = async (args: Args) => {
  const sticker = await prisma.sticker.create({
    data: { ...args },
  });

  return sticker;
};
