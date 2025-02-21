import { z } from 'zod';
import type { JWTPayload } from 'jose';
import type {
  AuthDataReqSchema,
  LoginDataReqSchema,
  LoginDataResSchema,
  LogoutDataReqSchema,
  RefreshTokensReqSchema,
} from '$/dto/auth.dto';

export interface IJwtPayload extends JWTPayload {
  userId: string;
  email: string;
}

export type AuthDto = z.infer<typeof AuthDataReqSchema>;

export type LoginDto = z.infer<typeof LoginDataReqSchema>;

export type LoginResponse = z.infer<typeof LoginDataResSchema>;

export type LogoutDto = z.infer<typeof LogoutDataReqSchema>;

export type RefreshTokenDto = z.infer<typeof RefreshTokensReqSchema>;
