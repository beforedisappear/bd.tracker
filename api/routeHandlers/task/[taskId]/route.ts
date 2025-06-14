import { NextRequest, NextResponse } from 'next/server';

import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';

import {
  DeleteTaskByIdReqParamsSchema,
  GetTaskByIdDtoReqParamsSchema,
} from './dto';
import { authService } from 'api/services/auth.service';
import { taskService } from 'api/services/task.service';
import { ErrorResponse } from 'api/errors/errorResponse';
import type {
  DeleteTaskByIdReqParamsDto,
  GetTaskByIdDtoReqParamsDto,
} from './types';

export const DeleteTaskById = async (
  req: NextRequest,
  { params }: { params: Promise<DeleteTaskByIdReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const { taskId } = DeleteTaskByIdReqParamsSchema.parse(await params);

    const deletedTask = await taskService.deleteTask({
      id: taskId,
      initiatorId: userId,
    });

    return NextResponse.json(deletedTask);
  } catch (error) {
    return ErrorResponse(error);
  }
};

export const GetTaskById = async (
  req: NextRequest,
  { params }: { params: Promise<GetTaskByIdDtoReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const { taskId } = GetTaskByIdDtoReqParamsSchema.parse(await params);

    const task = await taskService.getTaskById({
      id: taskId,
      initiatorId: userId,
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return ErrorResponse(error);
  }
};
