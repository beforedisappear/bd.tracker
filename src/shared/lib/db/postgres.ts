import 'server-only';

import { PrismaClient } from '@prisma/client';

export const prismaService = new PrismaClient();
