import { projectService } from 'api/services/project.service';
import { NextRequest, NextResponse } from 'next/server';
import { RenameProjectReqParamsDto } from './types';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';

export const PatchProjectRename = async (
  request: NextRequest,
  { params }: { params: Promise<RenameProjectReqParamsDto> },
) => {
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
};
