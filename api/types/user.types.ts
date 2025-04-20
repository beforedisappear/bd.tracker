import { Prisma } from '&/prisma/generated/client';

type UserFields = Prisma.UserGetPayload<true>;

type User = Exclude<UserFields, 'createdAt' | 'updatedAt' | 'id'>;

export type CreateUser = { email: string };

export type UpdateUser = Exclude<User, 'email'>;
