import { projectService } from 'api/services/project.service';
import {
  UpdateProjectMembersReqParamsSchema,
  UpdateProjectMembersReqBodySchema,
} from './dto';
import { NextRequest, NextResponse } from 'next/server';

import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { ErrorResponse } from 'api/errors/errorResponse';

import type { UpdateProjectMembersReqParamsDto } from './types';

export const PostUpdateProjectMembers = async (
  req: NextRequest,
  { params }: { params: Promise<UpdateProjectMembersReqParamsDto> },
) => {
  try {
    const { projectId } = UpdateProjectMembersReqParamsSchema.parse(
      await params,
    );

    const accessToken = getAccessTokenFromReq(req);
    const { userId } = await authService.verifyJwt(accessToken);

    const { membersIds } = UpdateProjectMembersReqBodySchema.parse(
      await req.json(),
    );

    await projectService.updateProjectMembers({
      projectId,
      membersIds,
      initiatorId: userId,
    });

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return ErrorResponse(error);
  }
};
