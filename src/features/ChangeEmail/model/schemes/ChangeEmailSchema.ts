import { INCORRECT_VALUE_FIELD_MESSAGE } from '@/shared/constants/form.constants';
import { z } from 'zod';

export const ChangeEmailSchema = z.object({
  email: z.string().email({ message: INCORRECT_VALUE_FIELD_MESSAGE }),
});
