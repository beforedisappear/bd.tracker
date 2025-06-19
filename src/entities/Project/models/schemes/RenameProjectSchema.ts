import { z } from 'zod';

export const RenameProjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Название проекта не может быть пустым')
    .max(25, 'Название проекта не может быть таким длинным'),
});
