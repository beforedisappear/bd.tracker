import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const GetTeamByIdOrTeamNameDataReqQuerySchema = z.object({
  teamIdOrSlug: z.string(),
});

export const GetTeamByIdOrTeamNameDataResSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  ownerId: z.string(),
});

export const CreateTeamDataReqSchema = z.object({
  name: z.string(),
});

export const CreateTeamDataResSchema = z.object({
  name: z.string(),
});

export const RenameTeamDataReqSchema = z.object({
  name: z.string(),
});

export const RenameTeamDataReqQuerySchema = z.object({
  id: z.string(),
});

export const RenameTeamDataResSchema = z.object({
  name: z.string(),
});

export const TeamListDataResSchema = z.array(
  z.object({
    name: z.string(),
    id: z.string().uuid(),
    slug: z.string(),
    createdAt: z.string(),
    ownerId: z.string().uuid(),
  }),
);

export const DeleteTeamDataReqSchema = z.object({
  id: z.string(),
});

export const DeleteTeamDataResSchema = z.object({
  id: z.string(),
});
