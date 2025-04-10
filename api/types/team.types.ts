import { z } from 'zod';
import {
  GetTeamByIdOrSlugReqParamsSchema,
  GetTeamMembersReqParamsSchema,
  CreateTeamReqBodySchema,
  DeleteTeamByIdOrSlugReqParamsSchema,
  InviteUserToTeamReqBodySchema,
  InviteUserToTeamReqParamsSchema,
  RenameTeamByIdOrSlugReqBodySchema,
  RenameTeamByIdOrSlugReqParamsSchema,
  AcceptInvitationToTeamReqQuerySchema,
  CheckInvitationExistsResSchema,
  CheckInvitationExistsReqParamsSchema,
  CheckInvitationExistsReqBodySchema,
  DeleteMemberFromTeamReqBodySchema,
  DeleteMemberFromTeamReqParamsSchema,
} from '$/dto/team.dto';

export type GetTeamByIdOrSlugReqParams = z.infer<
  typeof GetTeamByIdOrSlugReqParamsSchema
>;

export type GetTeamMembersReqParams = z.infer<
  typeof GetTeamMembersReqParamsSchema
>;

export type CreateTeamReqDto = z.infer<typeof CreateTeamReqBodySchema>;

export type RenameTeamReqDto = z.infer<
  typeof RenameTeamByIdOrSlugReqBodySchema
>;

export type DeleteTeamReqParams = z.infer<
  typeof DeleteTeamByIdOrSlugReqParamsSchema
>;

export type RenameTeamByIdOrSlugReqParams = z.infer<
  typeof RenameTeamByIdOrSlugReqParamsSchema
>;

export type InviteUserToTeamReqDto = z.infer<
  typeof InviteUserToTeamReqBodySchema
>;

export type InviteUserToTeamReqParams = z.infer<
  typeof InviteUserToTeamReqParamsSchema
>;

export type AcceptInvitationToTeamReqQuery = z.infer<
  typeof AcceptInvitationToTeamReqQuerySchema
>;

export type CheckInvitationExistsReqParams = z.infer<
  typeof CheckInvitationExistsReqParamsSchema
>;

export type CheckInvitationExistsReqDto = z.infer<
  typeof CheckInvitationExistsReqBodySchema
>;

export type CheckInvitationExistsResDto = z.infer<
  typeof CheckInvitationExistsResSchema
>;

export type DeleteMemberFromTeamReqParams = z.infer<
  typeof DeleteMemberFromTeamReqParamsSchema
>;

export type DeleteMemberFromTeamReqBodyDto = z.infer<
  typeof DeleteMemberFromTeamReqBodySchema
>;
