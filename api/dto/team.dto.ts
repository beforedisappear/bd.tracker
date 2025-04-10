import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const GetTeamByIdOrSlugReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const GetTeamByIdOrSlugResSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  ownerId: z.string(),
});

export const GetTeamMembersReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const GetTeamMembersResSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  email: z.string().email(),
});

export const CreateTeamReqBodySchema = z.object({
  name: z.string(),
});

export const CreateTeamResSchema = z.object({
  name: z.string(),
});

export const RenameTeamByIdOrSlugReqBodySchema = z.object({
  name: z.string(),
});

export const RenameTeamByIdOrSlugReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const RenameTeamResSchema = z.object({
  name: z.string(),
});

export const TeamListResSchema = z.array(
  z.object({
    name: z.string(),
    id: z.string().uuid(),
    slug: z.string(),
    createdAt: z.string(),
    ownerId: z.string().uuid(),
  }),
);

export const DeleteTeamByIdOrSlugReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const DeleteTeamByIdOrSlugResSchema = z.object({
  idOrSlug: z.string(),
});

export const InviteUserToTeamReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const InviteUserToTeamReqBodySchema = z.object({
  inviteeEmail: z.string().email(),
});

export const InviteUserToTeamResSchema = z.object({
  invitationId: z.string().uuid(),
});

export const AcceptInvitationToTeamReqQuerySchema = z.object({
  invitationId: z.string().uuid(),
  token: z.string(),
});

export const CheckInvitationExistsReqParamsSchema = z.object({
  idOrSlug: z.string().uuid(),
});

export const CheckInvitationExistsReqBodySchema = z.object({
  idOrSlug: z.string().uuid(),
  inviteeEmail: z.string().email(),
});

export const CheckInvitationExistsResSchema = z.object({
  exists: z.boolean(),
});

export const DeleteMemberFromTeamReqParamsSchema = z.object({
  idOrSlug: z.string().uuid(),
});

export const DeleteMemberFromTeamReqBodySchema = z.object({
  memberId: z.string().uuid(),
});
