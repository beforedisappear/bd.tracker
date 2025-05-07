import { NextRequest, NextResponse } from 'next/server';
import { GetProjectMembersReqParamsDto } from './types';
import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { projectService } from '$/services/project.service';
import { getAccessTokenFromReq } from '$/utils/getAccessTokenFromReq';
import { getQueryParams } from '$/utils/getQueryParams';

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
