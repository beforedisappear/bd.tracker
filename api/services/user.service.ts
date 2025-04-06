import 'server-only';

import { prismaService } from '&/prisma';

import type { CreateUserDto, UpdateUserDto } from '../types';

class UserService {
  create(user: CreateUserDto) {
    return prismaService.user.create({
      data: { ...user, name: user.email.replace(/@.*$/, '') },
    });
  }

  //TODO: смена мыла
  update(id: string, user: UpdateUserDto) {
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
