import type { JWTPayload } from 'jose';

export interface ILoginDto {
  email: string;
  code: string;
}

export interface IJwtPayload extends JWTPayload {
  userId: string;
  email: string;
}

export interface ILogoutDto {
  refreshToken: string;
}

export interface IRefreshTokenDto {
  refreshToken: string;
}
