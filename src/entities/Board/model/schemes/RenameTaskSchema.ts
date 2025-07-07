import { z } from 'zod';

export const RenameTaskSchema = z.object({
  name: z
    .string()
    .min(1, 'Название задачи не может быть пустым')
    .max(30, 'Название задачи не может быть таким длинным'),
});
