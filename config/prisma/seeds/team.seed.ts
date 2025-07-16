import slugify from 'slugify';
import { PrismaClient } from '../generated/client/index.js';

const prisma = new PrismaClient();

type Args = { ownerId: string; name: string; membersIds?: string[] };

export const createTeam = async (args: Args) => {
  const team = await prisma.team.create({
    data: {
      name: args.name,
      ownerId: args.ownerId,
      slug: slugify(args.name, { lower: true }),
      members: { connect: args.membersIds?.map(id => ({ id })) || [] },
    },
  });

  return team;
};
