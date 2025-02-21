import { z } from 'zod';

export const AuthFormFirstStepSchema = z.object({
  email: z
    .string({
      required_error: 'Данное поле обязательно!',
    })
    .min(1, 'Неверный формат!')
    .email(),
});

export const AuthFormSecondStepSchema = z.object({
  code: z
    .string({
      required_error: 'Данное поле обязательно!',
    })
    .length(6, 'Некорректный формат!'),
});

type AuthFormFirstStepValues = z.infer<typeof AuthFormFirstStepSchema>;
type AuthFormSecondStepValues = z.infer<typeof AuthFormSecondStepSchema>;

export type AuthFormValues = AuthFormFirstStepValues | AuthFormSecondStepValues;
