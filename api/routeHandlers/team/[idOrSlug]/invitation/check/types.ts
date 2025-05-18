import { z } from 'zod';
import {
  CheckInvitationExistsReqQuerySchema,
  CheckInvitationExistsReqParamsSchema,
  CheckInvitationExistsResSchema,
} from './dto';

export type CheckInvitationExistsReqParams = z.infer<
  typeof CheckInvitationExistsReqParamsSchema
>;

export type CheckInvitationExistsReqDto = z.infer<
  typeof CheckInvitationExistsReqQuerySchema
>;

export type CheckInvitationExistsResDto = z.infer<
  typeof CheckInvitationExistsResSchema
>;
