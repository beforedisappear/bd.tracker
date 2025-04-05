import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUsers = async () => {
  const user1 = await prisma.user.create({
    data: { email: `${Math.random()}@gmail.com` },
  });

  return { user1 };
};
