import { Prisma } from '@prisma/client';

type UserFields = Prisma.UserGetPayload<true>;

type User = Exclude<UserFields, 'createdAt' | 'updatedAt' | 'id'>;

export type CreateUserDto = { email: string };

export type UpdateUserDto = Exclude<User, 'email'>;
