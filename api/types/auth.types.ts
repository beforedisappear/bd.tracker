import type { JWTPayload } from 'jose';

export type LoginData = {
  email: string;
  code: string;
};

export interface IJwtPayload extends JWTPayload {
  userId: string;
  email: string;
}

// export
