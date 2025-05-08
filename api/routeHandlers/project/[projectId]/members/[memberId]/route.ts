import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { projectService } from '$/services/project.service';
import { getAccessTokenFromReq } from '$/utils/getAccessTokenFromReq';
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
