import { ErrorResponse } from 'api/errors/errorResponse';
import { NextRequest, NextResponse } from 'next/server';

import { taskService } from 'api/services/task.service';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { publish } from 'config/redis';

import { CreateTaskReqBodySchema } from './dto';
import type { ServerMessage } from 'socket/types';

export const PostCreateTask = async (req: NextRequest) => {
  try {
    const { columnId, title, order } = CreateTaskReqBodySchema.parse(
      await req.json(),
    );

    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const task = await taskService.createTask({
      columnId,
      title,
      order,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof task> = {
      type: 'message',
      tenantId: task.tenantId,
      initiatorId: userId,
      action: 'TASK_CREATED',
      data: task,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(task);
  } catch (error) {
    return ErrorResponse(error);
  }
};
