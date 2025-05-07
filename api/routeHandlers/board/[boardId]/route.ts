import { NextRequest, NextResponse } from 'next/server';
import { GetBoardByIdReqParamsDto, RenameBoardReqBodyDto } from './types';
import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { boardService } from '$/services/board.service';
import { getAccessTokenFromReq } from '$/utils/getAccessTokenFromReq';

export const GetBoardById = async (
  request: NextRequest,
  { params }: { params: Promise<GetBoardByIdReqParamsDto> },
) => {
  try {
    const { boardId } = await params;
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

export const RenameBoard = async (
  request: NextRequest,
  { params }: { params: Promise<GetBoardByIdReqParamsDto> },
) => {
  try {
    const { boardId } = await params;
    const accessToken = getAccessTokenFromReq(request);
    const { userId } = await authService.verifyJwt(accessToken);

    const body = (await request.json()) as RenameBoardReqBodyDto;

    const renamedBoard = await boardService.renameBoard({
      id: boardId,
      name: body.name,
      initiatorId: userId,
    });

    return NextResponse.json(renamedBoard);
  } catch (error) {
    return ErrorResponse(error);
  }
};

export const DeleteBoard = async (
  request: NextRequest,
  { params }: { params: Promise<GetBoardByIdReqParamsDto> },
) => {
  try {
    const { boardId } = await params;
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
