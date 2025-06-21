import { PrismaClient } from '@prisma/client';
import { createUsers } from './user.seed';
import { createTeam } from './team.seed';

const prisma = new PrismaClient();

//TODO: finish seed
async function main() {
  const { user1, testUser } = await createUsers();

  await createTeam({ ownerId: user1.id });
  await createTeam({ ownerId: testUser.id });
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
