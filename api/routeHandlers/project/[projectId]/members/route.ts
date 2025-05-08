import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { projectService } from '$/services/project.service';
import { getAccessTokenFromReq } from '$/utils/getAccessTokenFromReq';
import { getQueryParams } from '$/utils/getQueryParams';

import type {
  GetProjectMembersReqParamsDto,
  PostAddProjectMemberReqParamsDto,
} from './types';
import {
  PostAddProjectMemberReqBodySchema,
  PostAddProjectMemberReqParamsSchema,
} from './dto';

export const GetProjectMembers = async (
  request: NextRequest,
  { params }: { params: Promise<GetProjectMembersReqParamsDto> },
) => {
  try {
    const { projectId } = await params;

    const accessToken = getAccessTokenFromReq(request);

    const { keyword } = getQueryParams(request, ['keyword']);

    const { userId } = await authService.verifyJwt(accessToken);

    const projectMembers = await projectService.getProjectMembers({
      projectId,
      initiatorId: userId,
      keyword,
    });

    return NextResponse.json(projectMembers, { status: 200 });
  } catch (error) {
    return ErrorResponse(error);
  }
};

export const PostAddProjectMember = async (
  request: NextRequest,
  { params }: { params: Promise<PostAddProjectMemberReqParamsDto> },
) => {
  try {
    const { projectId } = PostAddProjectMemberReqParamsSchema.parse(
      await params,
    );

    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { teamId, memberId } = await request.json();

    PostAddProjectMemberReqBodySchema.parse({
      teamId,
      memberId,
    });

    await projectService.addProjectMember({
      projectId,
      userId: memberId,
      initiatorId: userId,
    });

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return ErrorResponse(error);
  }
};
