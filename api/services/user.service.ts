import 'server-only';

import { prismaService } from '&/prisma';

import type { CreateUser, UpdateUser } from '../types';
import type { Prisma } from '&/prisma/generated/client';

class UserService {
  private getUserName(email: string) {
    return email.replace(/@.*$/, '');
  }

  create(user: CreateUser) {
    return prismaService.user.create({
      data: { ...user, name: this.getUserName(user.email) },
    });
  }

  async createWithTx(tx: Prisma.TransactionClient, user: CreateUser) {
    return tx.user.create({
      data: { ...user, name: this.getUserName(user.email) },
    });
  }

  //TODO: смена мыла
  update(id: string, user: UpdateUser) {
    return prismaService.user.update({
      where: { id },
      data: user,
    });
  }

  findOne(args: { idOrEmail: string }) {
    const { idOrEmail } = args;

    return prismaService.user.findFirst({
      where: {
        OR: [{ id: idOrEmail }, { email: idOrEmail }],
      },
    });
  }

  async userExists(args: { ids: string[]; teamId?: string }) {
    const { ids, teamId } = args;

    const existingUsers = await prismaService.user.findMany({
      where: {
        id: { in: ids },
        ...(teamId ? { teams: { some: { id: teamId } } } : {}),
      },
      select: { id: true },
    });

    return existingUsers.length === ids.length;
  }
}

export const userService = new UserService();
