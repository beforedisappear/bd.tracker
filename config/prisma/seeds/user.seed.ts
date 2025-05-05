import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUsers = async () => {
  const user1 = await prisma.user.create({
    data: { email: `${Math.random()}@gmail.com` },
  });

  const testUser = await prisma.user.create({
    data: { email: process.env.TEST_USER_EMAIL },
  });

  return { user1, testUser };
};
