import {
  DeleteProjectReqParamsSchema,
  GetProjectByIdReqParamsSchema,
} from './dto';

import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '$/errors/errorResponse';
import { projectService } from '$/services/project.service';
import { authService } from '$/services/auth.service';
import { getAccessTokenFromReq } from '$/utils';
import type {
  DeleteProjectReqParamsDto,
  GetProjectByIdReqParamsDto,
} from './types';

export async function DeleteProject(
  request: NextRequest,
  { params }: { params: Promise<DeleteProjectReqParamsDto> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { projectId } = await params;

    DeleteProjectReqParamsSchema.parse({ projectId });

    const deletedProject = await projectService.deleteProject({
      id: projectId,
      initiatorId: userId,
    });

    return NextResponse.json(deletedProject, { status: 200 });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function GetProjectById(
  request: NextRequest,
  { params }: { params: Promise<GetProjectByIdReqParamsDto> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { projectId } = await params;

    GetProjectByIdReqParamsSchema.parse({ projectId });

    const project = await projectService.getProjectById({
      id: projectId,
      initiatorId: userId,
    });

    return NextResponse.json(project, { status: 200 });
  } catch (e) {
    return ErrorResponse(e);
  }
}
