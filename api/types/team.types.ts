import { z } from 'zod';
import {
  CreateTeamReqBodySchema,
  DeleteTeamByIdOrSlugReqParamsSchema,
  GetTeamByIdOrSlugReqParamsSchema,
  InviteUserToTeamReqBodySchema,
  InviteUserToTeamReqParamsSchema,
  RenameTeamByIdOrSlugReqBodySchema,
  RenameTeamByIdOrSlugReqParamsSchema,
  RespondToInvitationReqQuerySchema,
} from '$/dto/team.dto';

export type CreateTeamReqDto = z.infer<typeof CreateTeamReqBodySchema>;

export type RenameTeamReqDto = z.infer<
  typeof RenameTeamByIdOrSlugReqBodySchema
>;

export type GetTeamByIdOrSlugReqParams = z.infer<
  typeof GetTeamByIdOrSlugReqParamsSchema
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

export type RespondToInvitationReqQuery = z.infer<
  typeof RespondToInvitationReqQuerySchema
>;
