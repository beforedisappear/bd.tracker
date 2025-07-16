import { PrismaClient } from '../generated/client/index.js';

const prisma = new PrismaClient();

export const createUser = async (email: string) => {
  console.log('USER', email);
  const user = await prisma.user.create({
    data: { email: email, name: `User ${email.split('@')[0]}` },
  });

  return user;
};
