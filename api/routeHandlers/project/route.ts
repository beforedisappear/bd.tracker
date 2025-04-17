import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';

import { authService } from '$/services/auth.service';
import { projectService } from '$/services/project.service';

import { getAccessTokenFromReq } from '$/utils';

import { CreateProjectReqBodySchema } from './dto';

import type { CreateProjectReqDto } from './types';

export async function PostCreateProject(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const data: CreateProjectReqDto = await request.json();

    CreateProjectReqBodySchema.parse(data);

    const newTeam = await projectService.createProject({
      teamId: data.teamId,
      name: data.name,
      memberIds: data.memberIds,
      creatorId: userId,
    });

    return NextResponse.json(newTeam, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
