import { PrismaClient } from '@prisma/client';
import { createUsers } from './user.seed';
import { createTeam } from './team.seed';

const prisma = new PrismaClient();

async function main() {
  const { user1 } = await createUsers();

  await createTeam({ ownerId: user1.id });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
