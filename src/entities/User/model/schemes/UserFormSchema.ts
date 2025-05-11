import { z } from 'zod';

import { REQUIRED_FIELD_MESSAGE } from '@/shared/constants/form.constants';

export const UserFormSchema = z.object({
  name: z.string().min(1, { message: REQUIRED_FIELD_MESSAGE }),
});
