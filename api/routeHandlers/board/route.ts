import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { boardService } from 'api/services/board.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { CreateBoardReqBodySchema } from './dto';
import { getQueryParams } from 'api/utils/getQueryParams';
import { publish } from 'config/redis';
import type { ServerMessage } from 'socket/types';

export const PostCreateBoard = async (request: NextRequest) => {
  try {
    const accessToken = getAccessTokenFromReq(request);
    const { userId } = await authService.verifyJwt(accessToken);

    const body = CreateBoardReqBodySchema.parse(await request.json());

    const board = await boardService.createBoard({
      projectId: body.projectId,
      name: body.name,
      initiatorId: userId,
    });

    const message: ServerMessage<typeof board> = {
      type: 'message',
      tenantId: board.tenantId,
      initiatorId: userId,
      action: 'BOARD_CREATED',
      data: board,
    };

    publish(process.env.WS_REDIS_CHANNEL_NAME!, JSON.stringify(message))
      .then(() => {})
      .catch(e => console.error('Failed to publish message', e));

    return NextResponse.json(board);
  } catch (error) {
    return ErrorResponse(error);
  }
};

export const GetProjectBoards = async (request: NextRequest) => {
  try {
    const accessToken = getAccessTokenFromReq(request);
    const { userId } = await authService.verifyJwt(accessToken);

    const { projectId } = getQueryParams(request, ['projectId']);

    const boards = await boardService.getAllBoards({
      projectId,
      initiatorId: userId,
    });

    return NextResponse.json(boards);
  } catch (error) {
    return ErrorResponse(error);
  }
};
