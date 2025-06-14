import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { boardService } from 'api/services/board.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { NextRequest, NextResponse } from 'next/server';

import {
  UpdateStickerReqParamsSchema,
  UpdateStickerReqBodySchema,
  DeleteStickerReqParamsSchema,
} from './dto';
import type { UpdateStickerReqParams, DeleteStickerReqParams } from './types';

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

    return NextResponse.json(deletedSticker, { status: 200 });
  } catch (e) {
    return ErrorResponse(e);
  }
}
