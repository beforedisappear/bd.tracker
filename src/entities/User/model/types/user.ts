import { z } from 'zod';

import { UserFormSchema } from '../schemes/UserFormSchema';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type UserFormValues = z.infer<typeof UserFormSchema>;

export type GetUserDtoRes = User;

export type UpdateUserDtoReq = UserFormValues;

export type PostChangeEmailDtoReq = {
  email: string;
};

export type PostChangeEmailDtoRes = unknown;
