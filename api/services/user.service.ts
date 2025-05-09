import 'server-only';
import { v4 as uuidv4 } from 'uuid';

import { ApiError, CodeError } from '$/errors/apiError';

import { prismaService } from '&/prisma';
import { mailService } from './mail.service';

import type { Prisma } from '&/prisma/generated/client';

class UserService {
  create(user: { email: string }) {
    return prismaService.user.create({
      data: { ...user, name: this.getUserName(user.email) },
    });
  }

  async createWithTx(tx: Prisma.TransactionClient, user: { email: string }) {
    return tx.user.create({
      data: { ...user, name: this.getUserName(user.email) },
    });
  }

  update(args: { id: string; newName: string }) {
    const { id, newName } = args;

    return prismaService.user.update({
      where: { id },
      data: { name: newName },
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

  async sendChangeEmailRequest(args: { userId: string; newEmail: string }) {
    const { userId, newEmail } = args;

    const existingUser = await prismaService.user.findFirst({
      where: { email: newEmail },
    });

    if (existingUser)
      throw ApiError.conflict(
        'Email is already taken',
        CodeError.EMAIL_ALREADY_TAKEN,
      );

    const existingRequest = await prismaService.userEmailChange.findFirst({
      where: { userId, newEmail },
    });

    const token = uuidv4();
    const expSeconds = Number(process.env.TEAM_INVITATION_EXPIRATION);
    const expiresAt = new Date(Date.now() + expSeconds);
    let requestId: string;

    if (existingRequest) {
      const request = await prismaService.$transaction(async tx => {
        const [deletedRequest, createdRequest] = await Promise.all([
          tx.userEmailChange.delete({
            where: { id: existingRequest.id },
          }),
          tx.userEmailChange.create({
            data: {
              userId,
              newEmail,
              token,
              expiresAt,
            },
          }),
        ]);

        return { deletedRequest, createdRequest };
      });

      requestId = request.createdRequest.id;
    } else {
      const request = await prismaService.userEmailChange.create({
        data: {
          userId,
          newEmail,
          token,
          expiresAt,
        },
      });

      requestId = request.id;
    }

    await mailService.sendChangeEmailMail({ newEmail, token, requestId });

    return null;
  }

  async acceptChangeEmailRequest(args: { token: string; requestId: string }) {
    const { token, requestId } = args;

    const request = await prismaService.userEmailChange.findFirst({
      where: { id: requestId },
    });

    if (!request) throw ApiError.notFound('Request not found');

    if (request.token !== token) throw ApiError.badRequest('Invalid token');

    await prismaService.$transaction(async tx => {
      await Promise.all([
        tx.user.update({
          where: { id: request.userId },
          data: { email: request.newEmail },
        }),
        tx.userEmailChange.delete({
          where: { id: request.id },
        }),
      ]);
    });

    return null;
  }

  private getUserName(email: string) {
    return email.replace(/@.*$/, '');
  }
}

export const userService = new UserService();
