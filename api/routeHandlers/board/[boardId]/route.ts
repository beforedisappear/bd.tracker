import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { boardService } from 'api/services/board.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { publish } from 'config/redis';
import { getQueryParams } from 'api/utils/getQueryParams';
import {
  GetBoardByIdReqParamsSchema,
  DeleteBoardByIdReqParamsSchema,
  GetBoardByIdQuerySchema,
} from './dto';
import type {
  GetBoardByIdReqParamsDto,
  DeleteBoardByIdReqParamsDto,
} from './types';
import type { ServerMessage } from 'socket/types';

export const GetBoardById = async (
  request: NextRequest,
  { params }: { params: Promise<GetBoardByIdReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(
      getAccessTokenFromReq(request),
    );

    const { boardId } = GetBoardByIdReqParamsSchema.parse(await params);

    const queryParams = getQueryParams(
      request,
      ['colors', 'assigneeIds', 'dateRange', 'stickerIds'],
      undefined,
      {
        colors: { type: 'array' },
        assigneeIds: { type: 'array' },
        dateRange: { type: 'array' },
        stickerIds: { type: 'array' },
      },
    );

    const { colors, assigneeIds, dateRange, stickerIds } =
      GetBoardByIdQuerySchema.parse(queryParams);

    const board = await boardService.getBoardById({
      id: boardId,
      initiatorId: userId,
      colors,
      assigneeIds,
      dateRange,
      stickerIds,
    });

    return NextResponse.json(board);
  } catch (error) {
    return ErrorResponse(error);
  }
};

export const DeleteBoardById = async (
  request: NextRequest,
  { params }: { params: Promise<DeleteBoardByIdReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(
      getAccessTokenFromReq(request),
    );
    const { boardId } = DeleteBoardByIdReqParamsSchema.parse(await params);

    const deletedBoard = await boardService.deleteBoard({
      id: boardId,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof deletedBoard> = {
      type: 'message',
      tenantId: deletedBoard.tenantId,
      initiatorId: userId,
      action: 'BOARD_DELETED',
      data: deletedBoard,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(deletedBoard);
  } catch (error) {
    return ErrorResponse(error);
  }
};
