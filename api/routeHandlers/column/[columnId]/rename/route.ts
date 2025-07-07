import { NextRequest, NextResponse } from 'next/server';
import { RenameColumnReqBodySchema, RenameColumnReqParamsSchema } from './dto';
import { columnService } from 'api/services/column.service';
import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { publish } from 'config/redis';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import type { RenameColumnReqParamsDto } from './types';
import type { ServerMessage } from 'socket/types';

export const PatchRenameColumn = async (
  req: NextRequest,
  { params }: { params: Promise<RenameColumnReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));
    const { columnId } = RenameColumnReqParamsSchema.parse(await params);
    const { name } = RenameColumnReqBodySchema.parse(await req.json());

    const renamedColumn = await columnService.renameColumn({
      id: columnId,
      name,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof renamedColumn> = {
      type: 'message',
      tenantId: renamedColumn.tenantId,
      initiatorId: userId,
      action: 'COLUMN_UPDATED',
      data: renamedColumn,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(renamedColumn);
  } catch (error) {
    return ErrorResponse(error);
  }
};
