import { NextRequest, NextResponse } from 'next/server';

import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { taskService } from 'api/services/task.service';
import { ErrorResponse } from 'api/errors/errorResponse';
import { MoveTaskDtoReqBodySchema } from './dto';
import type { MoveTaskDtoReqBodyDto } from './types';

export const PatchMoveTask = async (
  req: NextRequest,
  { params }: { params: Promise<MoveTaskDtoReqBodyDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const { taskId, columnId, nextTaskId, previousTaskId } =
      MoveTaskDtoReqBodySchema.parse(await params);

    const res = await taskService.moveTask({
      id: taskId,
      columnId,
      nextTaskId,
      previousTaskId,
      initiatorId: userId,
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return ErrorResponse(error);
  }
};
