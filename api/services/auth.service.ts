import 'server-only';

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { SignJWT, jwtVerify } from 'jose';

import { redisService } from '&/redis';
import { prismaService } from '&/prisma';
import { userService } from './user.service';
import { mailService } from './mail.service';

import type { CreateUser, IJwtPayload } from '../types';
import { ApiError } from '$/errors/apiError';
import { LoginDto } from '$/routeHandlers/login/types';
import { RefreshTokensDto } from '$/routeHandlers/refreshTokens/types';
import { LogoutDto } from '$/routeHandlers/logout/types';

const secretKey = process.env.JWT_SECRET;

const key = new TextEncoder().encode(secretKey);

class AuthService {
  async auth(data: CreateUser) {
    let user = await userService.findOne(data.email);

    if (!user) {
      user = await userService.create(data);
    }

    const authCode = await this.generateAuthCode(user.id);

    await mailService.sendAuthMail({
      email: user.email,
      code: authCode,
    });
  }

  async login(data: LoginDto, agent: string) {
    const user = await userService.findOne(data.email);

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

    throw ApiError.conflict('Incorrect code', '1004');
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

    const user = await userService.findOne(token.userId);

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
    return redisService.get(userId);
  }

  private async clearAuthCode(userId: string) {
    return redisService.del(userId);
  }

  private async generateAuthCode(userId: string) {
    try {
      const code = crypto.randomInt(100000, 1000000).toString();

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
