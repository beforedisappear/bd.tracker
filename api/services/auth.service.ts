import 'server-only';

import crypto from 'crypto';
import { add } from 'date-fns';
import { SignJWT, jwtVerify } from 'jose';

import { redisService } from '@/shared/lib/db/redis';
import { userService } from './user.service';
import { mailService } from './mail.service';
import { prismaService } from '@/shared/lib/db/postgres';

import type { CreateUser, IJwtPayload, LoginData } from '../types';

const secretKey = '3719d726-d649-419e-8aea-7607457869ef';

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

  async login(data: LoginData, agent: string) {
    const user = await userService.findOne(data.email);

    if (!user) throw new Error('Error in the authentication process');

    const code = await this.getAuthCode(user.id);

    if (code === data.code) {
      return this.generateTokens({ userId: user.id, email: user.email }, agent);
    }

    //incorrect code
    return null;
  }

  async refreshTokens(refreshToken: string, agent: string) {
    const token = await prismaService.jWT.delete({
      where: { token: refreshToken },
    });

    if (!token || new Date(token.exp) < new Date()) {
      throw new Error('Session expired');
    }

    const user = await userService.findOne(token.userId);

    if (!user) throw new Error('User not found');

    return this.generateTokens({ userId: user.id, email: user.email }, agent);
  }

  async logout(refreshToken: string) {
    const token = await prismaService.jWT.findFirst({
      where: { token: refreshToken },
    });

    if (!token) throw new Error('Token was expired');

    await prismaService.jWT.delete({
      where: { token: refreshToken },
    });

    return null;
  }

  private async generateTokens(payload: IJwtPayload, agent: string) {
    const accessToken = await this.getAccessToken(payload);

    const refreshToken = await this.getRefreshToken(payload.userId, agent);

    return { accessToken, refreshToken };
  }

  private getAccessToken(payload: IJwtPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('5 min')
      .sign(key);
  }

  private async getRefreshToken(userId: string, agent: string) {
    const jwt = await prismaService.jWT.findFirst({
      where: { userId, userAgent: agent },
    });

    const token = jwt?.token || '';

    return prismaService.jWT.upsert({
      where: { token },
      update: {
        exp: add(new Date(), { months: 1 }),
      },
      create: {
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent,
      },
    });
  }

  private async getAuthCode(userId: string) {
    return redisService.get(userId);
  }

  private async generateAuthCode(userId: string) {
    try {
      const code = crypto.randomInt(100000, 1000000).toString();

      const res = await redisService.set(userId, code, { EX: 300 });

      if (res !== 'OK')
        throw new Error('Error in the key establishment process');

      return code;
    } catch (e) {
      console.error(e);
      throw new Error('Error in the code creation process');
    }
  }
}

export const authService = new AuthService();
