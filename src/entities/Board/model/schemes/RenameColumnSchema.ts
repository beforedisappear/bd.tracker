import { z } from 'zod';

export const RenameColumnSchema = z.object({
  name: z
    .string()
    .min(1, 'Название колонки не может быть пустым')
    .max(25, 'Название колонки не может быть таким длинным'),
});
