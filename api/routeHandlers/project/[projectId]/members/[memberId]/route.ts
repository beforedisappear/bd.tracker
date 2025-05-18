import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { projectService } from 'api/services/project.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { RemoveProjectMemberReqParamsSchema } from './dto';

import type { RemoveProjectMemberReqParamsDto } from './types';

export const DeleteProjectMember = async (
  request: NextRequest,
  { params }: { params: Promise<RemoveProjectMemberReqParamsDto> },
) => {
  try {
    const accessToken = getAccessTokenFromReq(request);
    const { userId } = await authService.verifyJwt(accessToken);

    const { projectId, memberId } = await params;

    RemoveProjectMemberReqParamsSchema.parse({
      projectId,
      memberId,
    });

    await projectService.removeProjectMember({
      projectId,
      memberId,
      initiatorId: userId,
    });

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return ErrorResponse(error);
  }
};
