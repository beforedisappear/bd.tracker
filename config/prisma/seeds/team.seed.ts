import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Args = { ownerId: string; userIds?: string[] };

export const createTeam = async (args: Args) => {
  const team1 = await prisma.team.create({
    data: { name: 'Company', ownerId: args.ownerId },
  });

  console.log('TEAM_CREATED', team1);

  return { team1 };
};
