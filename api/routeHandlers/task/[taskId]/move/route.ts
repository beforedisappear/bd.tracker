import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';

import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { taskService } from 'api/services/task.service';
import { MoveTaskDtoReqBodySchema, MoveTaskDtoReqParamsSchema } from './dto';
import { publish } from 'config/redis';
import type { MoveTaskDtoReqParamsDto } from './types';
import type { ServerMessage } from 'socket/types';

export const PatchMoveTask = async (
  req: NextRequest,
  { params }: { params: Promise<MoveTaskDtoReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const { taskId } = MoveTaskDtoReqParamsSchema.parse(await params);

    const { columnId, order } = MoveTaskDtoReqBodySchema.parse(
      await req.json(),
    );

    const res = await taskService.moveTask({
      id: taskId,
      columnId,
      order,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof res> = {
      type: 'message',
      tenantId: res.tenantId,
      initiatorId: userId,
      action: 'TASK_MOVED',
      data: res,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return ErrorResponse(error);
  }
};
