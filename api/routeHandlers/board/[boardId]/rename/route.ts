import { NextRequest, NextResponse } from 'next/server';
import { RenameBoardDtoReqParams, RenameBoardDtoBodyReq } from './dto';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { boardService } from 'api/services/board.service';
import type { RenameBoardDtoReqParamsDto } from './types';
import { ErrorResponse } from 'api/errors/errorResponse';
import { publish } from 'config/redis';
import type { ServerMessage } from 'socket/types';

export const PatchRenameBoard = async (
  req: NextRequest,
  { params }: { params: Promise<RenameBoardDtoReqParamsDto> },
) => {
  try {
    const accessToken = getAccessTokenFromReq(req);
    const { userId } = await authService.verifyJwt(accessToken);

    const { boardId } = RenameBoardDtoReqParams.parse(await params);
    const { name } = RenameBoardDtoBodyReq.parse(await req.json());

    const renamedBoard = await boardService.renameBoard({
      id: boardId,
      name,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof renamedBoard> = {
      type: 'message',
      tenantId: renamedBoard.tenantId,
      initiatorId: userId,
      action: 'BOARD_UPDATED',
      data: renamedBoard,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(renamedBoard);
  } catch (error) {
    return ErrorResponse(error);
  }
};
