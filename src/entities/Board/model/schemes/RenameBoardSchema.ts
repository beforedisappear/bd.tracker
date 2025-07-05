import { z } from 'zod';

export const RenameBoardSchema = z.object({
  name: z
    .string()
    .min(1, 'Название доски не может быть пустым')
    .max(20, 'Название доски не может быть таким длинным'),
});
