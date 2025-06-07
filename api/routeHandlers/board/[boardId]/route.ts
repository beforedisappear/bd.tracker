import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { boardService } from 'api/services/board.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import {
  GetBoardByIdReqParamsSchema,
  DeleteBoardByIdReqParamsSchema,
} from './dto';
import type {
  GetBoardByIdReqParamsDto,
  DeleteBoardByIdReqParamsDto,
} from './types';

export const GetBoardById = async (
  request: NextRequest,
  { params }: { params: Promise<GetBoardByIdReqParamsDto> },
) => {
  try {
    const { boardId } = GetBoardByIdReqParamsSchema.parse(await params);
    const accessToken = getAccessTokenFromReq(request);
    const { userId } = await authService.verifyJwt(accessToken);

    const board = await boardService.getBoardById({
      id: boardId,
      initiatorId: userId,
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
    const { boardId } = DeleteBoardByIdReqParamsSchema.parse(await params);
    const accessToken = getAccessTokenFromReq(request);
    const { userId } = await authService.verifyJwt(accessToken);

    const deletedBoard = await boardService.deleteBoard({
      id: boardId,
      initiatorId: userId,
    });

    return NextResponse.json(deletedBoard);
  } catch (error) {
    return ErrorResponse(error);
  }
};
