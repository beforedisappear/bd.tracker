import { NextRequest, NextResponse } from 'next/server';

import { authService } from 'api/services/auth.service';
import { taskService } from 'api/services/task.service';
import { publish } from 'config/redis';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { ErrorResponse } from 'api/errors/errorResponse';
import {
  UpdateTaskDtoReqBodySchema,
  UpdateTaskDtoReqParamsSchema,
} from './dto';
import type { UpdateTaskDtoReqParamsDto } from './types';
import type { ServerMessage } from 'socket/types';

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

    const message: ServerMessage<typeof updatedTask> = {
      type: 'message',
      tenantId: updatedTask.tenantId,
      initiatorId: userId,
      action: 'TASK_UPDATED',
      data: updatedTask,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return ErrorResponse(error);
  }
};
