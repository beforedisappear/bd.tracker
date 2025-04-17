import { z } from 'zod';
import {
  CheckInvitationExistsReqBodySchema,
  CheckInvitationExistsReqParamsSchema,
  CheckInvitationExistsResSchema,
} from './dto';

export type CheckInvitationExistsReqParams = z.infer<
  typeof CheckInvitationExistsReqParamsSchema
>;

export type CheckInvitationExistsReqDto = z.infer<
  typeof CheckInvitationExistsReqBodySchema
>;

export type CheckInvitationExistsResDto = z.infer<
  typeof CheckInvitationExistsResSchema
>;
