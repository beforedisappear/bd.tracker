import { NextRequest, NextResponse } from 'next/server';
import { DeleteColumnByIdReqParamsSchema } from './dto';
import { ErrorResponse } from 'api/errors/errorResponse';
import { DeleteColumnByIdReqParamsDto } from './types';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { columnService } from 'api/services/column.service';
import type { ServerMessage } from 'socket/types';
import { publish } from 'config/redis';

export const DeleteColumnById = async (
  req: NextRequest,
  { params }: { params: Promise<DeleteColumnByIdReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const { columnId } = DeleteColumnByIdReqParamsSchema.parse(await params);

    const deletedColumn = await columnService.deleteColumn({
      id: columnId,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof deletedColumn> = {
      type: 'message',
      tenantId: deletedColumn.tenantId,
      initiatorId: userId,
      action: 'COLUMN_DELETED',
      data: deletedColumn,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(deletedColumn);
  } catch (error) {
    return ErrorResponse(error);
  }
};
