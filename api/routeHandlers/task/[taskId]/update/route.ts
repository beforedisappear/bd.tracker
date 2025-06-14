import { NextRequest, NextResponse } from 'next/server';

import { authService } from 'api/services/auth.service';
import { taskService } from 'api/services/task.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { ErrorResponse } from 'api/errors/errorResponse';
import {
  UpdateTaskDtoReqBodySchema,
  UpdateTaskDtoReqParamsSchema,
} from './dto';
import type { UpdateTaskDtoReqParamsDto } from './types';

export const PatchUpdateTask = async (
  req: NextRequest,
  { params }: { params: Promise<UpdateTaskDtoReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const { taskId } = UpdateTaskDtoReqParamsSchema.parse(await params);

    const body = UpdateTaskDtoReqBodySchema.parse(await req.json());

    const updatedTask = await taskService.updateTask({
      id: taskId,
      initiatorId: userId,
      ...body,
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return ErrorResponse(error);
  }
};
