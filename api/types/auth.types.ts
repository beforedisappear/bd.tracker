import type { JWTPayload } from 'jose';

export interface IJwtPayload extends JWTPayload {
  userId: string;
  email: string;
}
