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
  GetTeamMemberByIdReqParamsSchema,
  GetTeamMemberByIdResSchema,
  RemoveTeamMemberByIdReqParamsSchema,
  SetTeamAdminReqParamsSchema,
  RemoveTeamAdminReqParamsSchema,
} from '$/dto/team.dto';

export type GetTeamByIdOrSlugReqParams = z.infer<
  typeof GetTeamByIdOrSlugReqParamsSchema
>;

export type GetTeamMembersReqParams = z.infer<
  typeof GetTeamMembersReqParamsSchema
>;

export type GetTeamMemberByIdReqParams = z.infer<
  typeof GetTeamMemberByIdReqParamsSchema
>;

export type GetTeamMemberByIdResDto = z.infer<
  typeof GetTeamMemberByIdResSchema
>;

export type RemoveTeamMemberByIdReqParams = z.infer<
  typeof RemoveTeamMemberByIdReqParamsSchema
>;

export type SetTeamAdminReqParams = z.infer<typeof SetTeamAdminReqParamsSchema>;

export type RemoveTeamAdminReqParams = z.infer<
  typeof RemoveTeamAdminReqParamsSchema
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
