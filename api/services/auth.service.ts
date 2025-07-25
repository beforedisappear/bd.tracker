import 'server-only';

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { SignJWT, jwtVerify } from 'jose';

import { getRedisService } from 'config/redis';
import { prismaService } from 'config/prisma';
import { userService } from './user.service';
import { mailService } from './mail.service';

import { ApiError, CodeError } from 'api/errors/apiError';
import { LoginDto } from 'api/routeHandlers/login/types';
import { RefreshTokensDto } from 'api/routeHandlers/refreshTokens/types';
import { LogoutDto } from 'api/routeHandlers/logout/types';
import type { IJwtPayload } from '../types';
import type { User } from 'config/prisma/generated/client';

const secretKey = process.env.JWT_SECRET;

const key = new TextEncoder().encode(secretKey);

class AuthService {
  async auth(data: { email: string }) {
    let user: User | null = null;

    user = await userService.findOne({ idOrEmail: data.email });

    if (!user) {
      user = await userService.create(data);
    }

    const authCode = await this.generateAuthCode(user.id, user.email);

    await mailService.sendAuthMail({
      email: user.email,
      code: authCode,
    });
  }

  async login(data: LoginDto, agent: string) {
    const user = await userService.findOne({ idOrEmail: data.email });

    if (!user) throw ApiError.notFound('User not found');

    const code = await this.getAuthCode(user.id);

    if (code === data.code) {
      const newTokens = await this.generateTokens(
        { userId: user.id, email: user.email },
        agent,
      );

      await this.clearAuthCode(user.id);

      return newTokens;
    }

    throw ApiError.conflict(
      'Incorrect code',
      CodeError.INCORRECT_OR_INVALID_CODE,
    );
  }

  async refreshTokens(data: RefreshTokensDto, agent: string) {
    let token;

    try {
      token = await prismaService.jWT.delete({
        where: { token: data.refreshToken },
      });
    } catch {
      throw ApiError.notFound('Token not found');
    }

    if (!token) throw ApiError.conflict('Token not provided');
    else if (new Date(token.exp) < new Date()) {
      throw ApiError.unauthorized('Session expired');
    }

    const user = await userService.findOne({ idOrEmail: token.userId });

    if (!user) throw ApiError.notFound('User not found');

    return this.generateTokens({ userId: user.id, email: user.email }, agent);
  }

  async verifyJwt(token: string) {
    const accessToken = token.replace('Bearer ', '');

    try {
      const { payload } = await jwtVerify(accessToken, key);
      return payload as IJwtPayload;
    } catch {
      throw ApiError.unauthorized('Invalid or expired token');
    }
  }

  async logout(data: LogoutDto) {
    const token = await prismaService.jWT.findFirst({
      where: { token: data.refreshToken },
    });

    if (!token) throw ApiError.unauthorized('Token was expired');

    await prismaService.jWT.delete({
      where: { token: data.refreshToken },
    });

    return null;
  }

  private async generateTokens(payload: IJwtPayload, agent: string) {
    const accessToken = await this.getAccessToken(payload);

    const refreshToken = await this.getRefreshToken(payload.userId, agent);

    return {
      accessToken,
      refreshToken: refreshToken.token,
      exp: refreshToken.exp,
    };
  }

  private getAccessToken(payload: IJwtPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(process.env.JWT_EXPIRE as string)
      .sign(key);
  }

  private async getRefreshToken(userId: string, agent: string) {
    const jwt = await prismaService.jWT.findFirst({
      where: { userId, userAgent: agent },
    });

    const token = jwt?.token || ' ';

    return prismaService.jWT.upsert({
      where: { token: token },
      update: {
        token: uuidv4(),
        exp: add(new Date(), { months: 1 }),
      },
      create: {
        token: uuidv4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent,
      },
    });
  }

  private async getAuthCode(userId: string) {
    const redisService = await getRedisService();

    return redisService.get(userId);
  }

  private async clearAuthCode(userId: string) {
    const redisService = await getRedisService();

    return redisService.del(userId);
  }

  private async generateAuthCode(userId: string, email: string) {
    try {
      let code = crypto.randomInt(100000, 1000000).toString();
      const testCode = process.env.TEST_USER_AUTH_CODE;

      if (email === process.env.TEST_USER_EMAIL && testCode) {
        code = testCode;
      }

      const redisService = await getRedisService();

      const res = await redisService.set(userId, code, { EX: 300 });

      if (res !== 'OK')
        throw ApiError.internal('Error in the key establishment process');

      return code;
    } catch (e) {
      console.error(e);
      throw ApiError.internal('Error in the code creation process');
    }
  }
}

export const authService = new AuthService();
