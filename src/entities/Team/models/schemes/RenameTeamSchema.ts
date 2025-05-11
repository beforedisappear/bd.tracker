import { z } from 'zod';

export const RenameTeamSchema = z.object({
  name: z.string().min(1, 'Название команды не может быть пустым'),
});
