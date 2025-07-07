import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';

import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';

import { authService } from 'api/services/auth.service';
import { taskService } from 'api/services/task.service';
import { publish } from 'config/redis';

import {
  DeleteTaskByIdReqParamsSchema,
  GetTaskByIdDtoReqParamsSchema,
} from './dto';
import type {
  DeleteTaskByIdReqParamsDto,
  GetTaskByIdDtoReqParamsDto,
} from './types';
import type { ServerMessage } from 'socket/types';

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

    const message: ServerMessage<typeof deletedTask> = {
      type: 'message',
      tenantId: deletedTask.tenantId,
      initiatorId: userId,
      action: 'TASK_DELETED',
      data: deletedTask,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

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
