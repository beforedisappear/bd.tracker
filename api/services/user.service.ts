import 'server-only';

import { prismaService } from '@/shared/lib/db/postgres';

import type { UpdateUser, CreateUser } from '../types';

class UserService {
  create(user: CreateUser) {
    return prismaService.user.create({
      data: user,
    });
  }

  //email
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
