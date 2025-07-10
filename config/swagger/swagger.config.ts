import { z } from 'zod';

import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';

import { registerPathWithBearer } from './swagger.utils';

import { PostAuthDoc } from 'api/routeHandlers/auth/doc';
import { PostLoginDoc } from 'api/routeHandlers/login/doc';
import { PostRefreshTokensDoc } from 'api/routeHandlers/refreshTokens/doc';
import { PostLogoutDoc } from 'api/routeHandlers/logout/doc';
import { GetProfileDoc, UpdateProfileDoc } from 'api/routeHandlers/profile/doc';
import { PostCreateTeamDoc, GetTeamListDoc } from 'api/routeHandlers/team/doc';
import { PatchTeamRenameByIdOrSlugDoc } from 'api/routeHandlers/team/[idOrSlug]/rename/doc';
import {
  DeleteTeamByIdOrSlugDoc,
  GetTeamByIdOrSlugDoc,
} from 'api/routeHandlers/team/[idOrSlug]/doc';
import { PostInviteUserToTeamDoc } from 'api/routeHandlers/team/[idOrSlug]/invitation/send/doc';
import { PostAcceptInvitationToTeamDoc } from 'api/routeHandlers/team/accept-invitation/doc';
import { GetCheckInvitationExistsDoc } from 'api/routeHandlers/team/[idOrSlug]/invitation/check/doc';
import { GetTeamMembersDoc } from 'api/routeHandlers/team/[idOrSlug]/members/doc';
import {
  GetTeamMemberByIdDoc,
  RemoveTeamMemberByIdDoc,
} from 'api/routeHandlers/team/[idOrSlug]/members/[memberId]/doc';
import {
  DeleteRemoveTeamAdminDoc,
  PatchSetTeamAdminDoc,
} from 'api/routeHandlers/team/[idOrSlug]/members/[memberId]/admin/doc';
import {
  PostCreateProjectDoc,
  GetAllTeamProjectsDoc,
} from 'api/routeHandlers/project/doc';
import {
  DeleteProjectDoc,
  // GetProjectByIdDoc,
} from 'api/routeHandlers/project/[projectId]/doc';
import { PatchProjectRenameDoc } from 'api/routeHandlers/project/[projectId]/rename/doc';
import {
  GetProjectMembersDoc,
  PostAddProjectMemberDoc,
} from 'api/routeHandlers/project/[projectId]/members/doc';
import { DeleteProjectMemberDoc } from 'api/routeHandlers/project/[projectId]/members/[memberId]/doc';
import {
  GetProjectBoardsDoc,
  PostCreateBoardDoc,
} from 'api/routeHandlers/board/doc';
import { PostAcceptChangeEmailDoc } from 'api/routeHandlers/profile/email/accept-change-request/doc';
import { PostSendChangeEmailDoc } from 'api/routeHandlers/profile/email/send-change-request/doc';
import { GetHaveAccessToTeamDoc } from 'api/routeHandlers/team/[idOrSlug]/access/doc';
import {
  GetBoardByIdDoc,
  DeleteBoardByIdDoc,
} from 'api/routeHandlers/board/[boardId]/doc';
import { PatchRenameBoardDoc } from 'api/routeHandlers/board/[boardId]/rename/doc';
import { PostCreateColumnDoc } from 'api/routeHandlers/column/doc';
import { DeleteColumnByIdDoc } from 'api/routeHandlers/column/[columnId]/doc';
import { PatchRenameColumnDoc } from 'api/routeHandlers/column/[columnId]/rename/doc';
import { PatchMoveColumnDoc } from 'api/routeHandlers/column/[columnId]/move/doc';
import { PostUpdateProjectMembersDoc } from 'api/routeHandlers/project/[projectId]/members/update/doc';
import { PostCreateTaskDoc } from 'api/routeHandlers/task/doc';
import {
  GetTaskByIdDoc,
  DeleteTaskByIdDoc,
} from 'api/routeHandlers/task/[taskId]/doc';
import { PatchMoveTaskDoc } from 'api/routeHandlers/task/[taskId]/move/doc';
import { PatchUpdateTaskDoc } from 'api/routeHandlers/task/[taskId]/update/doc';
import {
  GetBoardStickersDoc,
  PostCreateStickerDoc,
} from 'api/routeHandlers/board/[boardId]/sticker/doc';
import {
  DeleteStickerDoc,
  PatchUpdateStickerDoc,
} from 'api/routeHandlers/board/[boardId]/sticker/[stickerId]/doc';

// setup open api for zod
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

const register = registerPathWithBearer.bind(
  null,
  openAPIRegistry,
  bearerAuth.name,
);

// auth
openAPIRegistry.registerPath(PostAuthDoc);
openAPIRegistry.registerPath(PostLoginDoc);
openAPIRegistry.registerPath(PostRefreshTokensDoc);
openAPIRegistry.registerPath(PostLogoutDoc);

//profile
openAPIRegistry.registerPath(PostAcceptChangeEmailDoc);
register(GetProfileDoc);
register(UpdateProfileDoc);
register(PostSendChangeEmailDoc);

//team main
register(PostCreateTeamDoc);
register(GetTeamListDoc);
register(GetTeamByIdOrSlugDoc);
register(DeleteTeamByIdOrSlugDoc);
register(PatchTeamRenameByIdOrSlugDoc);
register(GetHaveAccessToTeamDoc);

//team member
register(GetTeamMembersDoc);
register(GetTeamMemberByIdDoc);
register(RemoveTeamMemberByIdDoc);

//team admin
register(PatchSetTeamAdminDoc);
register(DeleteRemoveTeamAdminDoc);

//team invitation
register(GetCheckInvitationExistsDoc);
register(PostInviteUserToTeamDoc);
register(PostAcceptInvitationToTeamDoc);

//project main
register(PostCreateProjectDoc);
register(GetAllTeamProjectsDoc);
register(DeleteProjectDoc);
register(PatchProjectRenameDoc);

//project members
register(GetProjectMembersDoc);
register(PostAddProjectMemberDoc);
register(DeleteProjectMemberDoc);
register(PostUpdateProjectMembersDoc);

//board main
register(PostCreateBoardDoc);
register(GetProjectBoardsDoc);
register(GetBoardByIdDoc);
register(DeleteBoardByIdDoc);
register(PatchRenameBoardDoc);

//board strickers
register(GetBoardStickersDoc);
register(PostCreateStickerDoc);
register(PatchUpdateStickerDoc);
register(DeleteStickerDoc);

//column main
register(PostCreateColumnDoc);
register(DeleteColumnByIdDoc);
register(PatchRenameColumnDoc);
register(PatchMoveColumnDoc);

//task main
register(PostCreateTaskDoc);
register(GetTaskByIdDoc);
register(DeleteTaskByIdDoc);
register(PatchMoveTaskDoc);
register(PatchUpdateTaskDoc);

// doc setup
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
