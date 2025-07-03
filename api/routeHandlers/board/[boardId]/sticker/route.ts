import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { boardService } from 'api/services/board.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { NextRequest, NextResponse } from 'next/server';
import { publish } from 'config/redis';

import {
  GetStickersReqParamsSchema,
  CreateStickerReqParamsSchema,
  CreateStickerReqBodySchema,
} from './dto';
import type { GetStickersReqParams, CreateStickerReqParams } from './types';
import type { ServerMessage } from 'socket/types';

export async function GetBoardStickers(
  request: NextRequest,
  { params }: { params: Promise<GetStickersReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { boardId } = GetStickersReqParamsSchema.parse(await params);

    const stickers = await boardService.getAllStickers({
      boardId,
      initiatorId: userId,
    });

    return NextResponse.json(stickers, { status: 200 });
  } catch (e) {
    return ErrorResponse(e);
  }
}

export async function PostCreateSticker(
  request: NextRequest,
  { params }: { params: Promise<CreateStickerReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { boardId } = CreateStickerReqParamsSchema.parse(await params);
    const { name, color } = CreateStickerReqBodySchema.parse(
      await request.json(),
    );

    const sticker = await boardService.createSticker({
      boardId,
      name,
      color,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof sticker> = {
      type: 'message',
      tenantId: sticker.tenantId,
      initiatorId: userId,
      action: 'STICKER_CREATED',
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
