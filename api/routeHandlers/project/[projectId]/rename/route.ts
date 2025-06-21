import { projectService } from 'api/services/project.service';
import { NextRequest, NextResponse } from 'next/server';
import { RenameProjectReqParamsDto } from './types';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { ErrorResponse } from 'api/errors/errorResponse';

export const PatchProjectRename = async (
  request: NextRequest,
  { params }: { params: Promise<RenameProjectReqParamsDto> },
) => {
  try {
    const { projectId } = await params;
    const { name } = await request.json();

    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const project = await projectService.renameProject({
      id: projectId,
      initiatorId: userId,
      name,
    });

    return NextResponse.json(
      {
        id: project.id,
      },
      { status: 200 },
    );
  } catch (error) {
    return ErrorResponse(error);
  }
};
