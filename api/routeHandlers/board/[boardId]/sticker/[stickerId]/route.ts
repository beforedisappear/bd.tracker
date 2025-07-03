import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { boardService } from 'api/services/board.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { publish } from 'config/redis';

import {
  UpdateStickerReqParamsSchema,
  UpdateStickerReqBodySchema,
  DeleteStickerReqParamsSchema,
} from './dto';
import type { UpdateStickerReqParams, DeleteStickerReqParams } from './types';
import type { ServerMessage } from 'socket/types';

export async function PatchUpdateSticker(
  request: NextRequest,
  { params }: { params: Promise<UpdateStickerReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { stickerId } = UpdateStickerReqParamsSchema.parse(await params);
    const { name, color } = UpdateStickerReqBodySchema.parse(
      await request.json(),
    );

    const sticker = await boardService.updateSticker({
      id: stickerId,
      name,
      color,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof sticker> = {
      type: 'message',
      tenantId: sticker.tenantId,
      initiatorId: userId,
      action: 'STICKER_UPDATED',
      data: sticker,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(sticker, { status: 200 });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function DeleteSticker(
  request: NextRequest,
  { params }: { params: Promise<DeleteStickerReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { stickerId } = DeleteStickerReqParamsSchema.parse(await params);

    const deletedSticker = await boardService.deleteSticker({
      id: stickerId,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof deletedSticker> = {
      type: 'message',
      tenantId: deletedSticker.tenantId,
      initiatorId: userId,
      action: 'STICKER_DELETED',
      data: deletedSticker,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(deletedSticker, { status: 200 });
  } catch (e) {
    return ErrorResponse(e);
  }
}
