import 'server-only';

import { Prisma } from '@prisma/client';

import { prismaService } from '&/prisma';

import type { CreateUser, UpdateUser } from '../types';
import type { PrismaClient } from '&/prisma/generated/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

type TX = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

class UserService {
  private getUserName(email: string) {
    return email.replace(/@.*$/, '');
  }

  create(user: CreateUser) {
    return prismaService.user.create({
      data: { ...user, name: this.getUserName(user.email) },
    });
  }

  async createWithTx(tx: TX, user: CreateUser) {
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

  findOne(idOrEmail: string) {
    return prismaService.user.findFirst({
      where: {
        OR: [{ id: idOrEmail }, { email: idOrEmail }],
      },
    });
  }
}

export const userService = new UserService();
