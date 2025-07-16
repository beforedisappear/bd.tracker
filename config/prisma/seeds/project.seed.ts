import { PrismaClient } from '../generated/client/index.js';

const prisma = new PrismaClient();

type Args = { name: string; teamId: string; membersIds?: string[] };

export const createProject = async (args: Args) => {
  const membersIds = args.membersIds || [];

  const project = await prisma.project.create({
    data: {
      name: args.name,
      teamId: args.teamId,
      members: { connect: [...membersIds.map(id => ({ id }))] },
    },
  });

  return project;
};
