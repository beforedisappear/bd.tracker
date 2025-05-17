import {
  INCORRECT_VALUE_FIELD_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from '@/shared/constants';
import { z } from 'zod';

export const InviteToTeamSchema = z.object({
  inviteeEmail: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
    })
    .min(1, REQUIRED_FIELD_MESSAGE)
    .email(INCORRECT_VALUE_FIELD_MESSAGE),
  projectIds: z.record(z.string().uuid(), z.boolean()),
});
