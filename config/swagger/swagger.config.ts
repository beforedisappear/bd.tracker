import { z } from 'zod';

import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';

import { PostAuthDoc } from '$/routeHandlers/auth/doc';
import { PostLoginDoc } from '$/routeHandlers/login/doc';
import { PostRefreshTokensDoc } from '$/routeHandlers/refreshTokens/doc';
import { PostLogoutDoc } from '$/routeHandlers/logout/doc';
import { GetProfileDoc, UpdateProfileDoc } from '$/routeHandlers/profile/doc';
import { PostCreateTeamDoc, GetTeamListDoc } from '$/routeHandlers/team/doc';
import { PatchTeamRenameByIdOrSlugDoc } from '$/routeHandlers/team/[idOrSlug]/rename/doc';
import {
  DeleteTeamByIdOrSlugDoc,
  GetTeamByIdOrSlugDoc,
} from '$/routeHandlers/team/[idOrSlug]/doc';
import { PostInviteUserToTeamDoc } from '$/routeHandlers/team/[idOrSlug]/invitation/send/doc';
import { PostAcceptInvitationToTeamDoc } from '$/routeHandlers/team/accept-invitation/doc';
import { GetCheckInvitationExistsDoc } from '$/routeHandlers/team/[idOrSlug]/invitation/check/doc';
import { GetTeamMembersDoc } from '$/routeHandlers/team/[idOrSlug]/members/doc';
import {
  GetTeamMemberByIdDoc,
  RemoveTeamMemberByIdDoc,
} from '$/routeHandlers/team/[idOrSlug]/members/[memberId]/doc';
import {
  DeleteRemoveTeamAdminDoc,
  PatchSetTeamAdminDoc,
} from '$/routeHandlers/team/[idOrSlug]/members/[memberId]/admin/doc';
import {
  PostCreateProjectDoc,
  GetAllTeamProjectsDoc,
} from '$/routeHandlers/project/doc';
import {
  DeleteProjectDoc,
  GetProjectByIdDoc,
} from '$/routeHandlers/project/[projectId]/doc';
import { PatchProjectRenameDoc } from '$/routeHandlers/project/[projectId]/rename/doc';
import {
  GetProjectMembersDoc,
  PostAddProjectMemberDoc,
} from '$/routeHandlers/project/[projectId]/members/doc';
import { DeleteProjectMemberDoc } from '$/routeHandlers/project/[projectId]/members/[memberId]/doc';
import {
  GetProjectBoardsDoc,
  PostCreateBoardDoc,
} from '$/routeHandlers/board/doc';
import { PostAcceptChangeEmailDoc } from '$/routeHandlers/profile/email/accept-change-request/doc';
import { PostSendChangeEmailDoc } from '$/routeHandlers/profile/email/send-change-request/doc';

extendZodWithOpenApi(z);

const openAPIRegistry = new OpenAPIRegistry();

export const bearerAuth = openAPIRegistry.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
);

// auth
openAPIRegistry.registerPath(PostAuthDoc);
openAPIRegistry.registerPath(PostLoginDoc);
openAPIRegistry.registerPath(PostRefreshTokensDoc);
openAPIRegistry.registerPath(PostLogoutDoc);

//profile
openAPIRegistry.registerPath(GetProfileDoc(bearerAuth.name));
openAPIRegistry.registerPath(UpdateProfileDoc(bearerAuth.name));
openAPIRegistry.registerPath(PostAcceptChangeEmailDoc);
openAPIRegistry.registerPath(PostSendChangeEmailDoc(bearerAuth.name));
//team main
openAPIRegistry.registerPath(PostCreateTeamDoc(bearerAuth.name));
openAPIRegistry.registerPath(GetTeamListDoc(bearerAuth.name));
openAPIRegistry.registerPath(GetTeamByIdOrSlugDoc(bearerAuth.name));
openAPIRegistry.registerPath(DeleteTeamByIdOrSlugDoc(bearerAuth.name));
openAPIRegistry.registerPath(PatchTeamRenameByIdOrSlugDoc(bearerAuth.name));
//team member
openAPIRegistry.registerPath(GetTeamMembersDoc(bearerAuth.name));
openAPIRegistry.registerPath(GetTeamMemberByIdDoc(bearerAuth.name));
openAPIRegistry.registerPath(RemoveTeamMemberByIdDoc(bearerAuth.name));
//team admin
openAPIRegistry.registerPath(PatchSetTeamAdminDoc(bearerAuth.name));
openAPIRegistry.registerPath(DeleteRemoveTeamAdminDoc(bearerAuth.name));
//team invitation
openAPIRegistry.registerPath(GetCheckInvitationExistsDoc(bearerAuth.name));
openAPIRegistry.registerPath(PostInviteUserToTeamDoc(bearerAuth.name));
openAPIRegistry.registerPath(PostAcceptInvitationToTeamDoc(bearerAuth.name));
//project main
openAPIRegistry.registerPath(PostCreateProjectDoc(bearerAuth.name));
openAPIRegistry.registerPath(GetAllTeamProjectsDoc(bearerAuth.name));
openAPIRegistry.registerPath(DeleteProjectDoc(bearerAuth.name));
openAPIRegistry.registerPath(PatchProjectRenameDoc(bearerAuth.name));
openAPIRegistry.registerPath(GetProjectByIdDoc(bearerAuth.name));
//project members
openAPIRegistry.registerPath(GetProjectMembersDoc(bearerAuth.name));
openAPIRegistry.registerPath(PostAddProjectMemberDoc(bearerAuth.name));
openAPIRegistry.registerPath(DeleteProjectMemberDoc(bearerAuth.name));
//board main
openAPIRegistry.registerPath(PostCreateBoardDoc(bearerAuth.name));
openAPIRegistry.registerPath(GetProjectBoardsDoc(bearerAuth.name));

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(openAPIRegistry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '0.0.1',
      title: 'BD.tracker API',
      description: 'Doc of api based on Next.js Route Handlers & Prisma ORM',
    },
    servers: [{ url: process.env.NEXT_PUBLIC_API_URL! }],
  });
}

export const openApiSpec = getOpenApiDocumentation();
