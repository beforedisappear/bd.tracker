import { NextRequest, NextResponse } from 'next/server';
import { CreateColumnReqBodySchema } from './dto';
import { columnService } from 'api/services/column.service';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { ErrorResponse } from 'api/errors/errorResponse';
import { publish } from 'config/redis';
import type { ServerMessage } from 'socket/types';

export const PostCreateColumn = async (req: NextRequest) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));
    const { boardId, name, order } = CreateColumnReqBodySchema.parse(
      await req.json(),
    );

    const column = await columnService.createColumn({
      name,
      boardId,
      initiatorId: userId,
      order,
    });

    const message: ServerMessage<typeof column> = {
      type: 'message',
      tenantId: column.tenantId,
      initiatorId: userId,
      action: 'COLUMN_CREATED',
      data: column,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(column);
  } catch (error) {
    return ErrorResponse(error);
  }
};
