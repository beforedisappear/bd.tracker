import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';

import { authService } from 'api/services/auth.service';
import { projectService } from 'api/services/project.service';

import { getAccessTokenFromReq, getQueryParams } from 'api/utils';

import {
  CreateProjectReqBodySchema,
  GetAllTeamProjectsReqQuerySchema,
} from './dto';

import type { CreateProjectReqDto } from './types';

export async function PostCreateProject(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const data: CreateProjectReqDto = await request.json();

    CreateProjectReqBodySchema.parse(data);

    const newTeam = await projectService.createProject({
      teamIdOrSlug: data.teamIdOrSlug,
      name: data.name,
      membersIds: data.membersIds,
      initiatorId: userId,
    });

    return NextResponse.json(newTeam, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function GetAllTeamProjects(request: NextRequest) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { teamIdOrSlug } = getQueryParams(request, ['teamIdOrSlug'], {
      strict: true,
    });

    GetAllTeamProjectsReqQuerySchema.parse({ teamIdOrSlug });

    const projects = await projectService.getAllProjects({
      teamIdOrSlug: teamIdOrSlug!,
      initiatorId: userId,
    });

    return NextResponse.json(projects, {
      status: 200,
    });
  } catch (e) {
    return ErrorResponse(e);
  }
}
