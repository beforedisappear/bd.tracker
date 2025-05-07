import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { boardService } from '$/services/board.service';
import { getAccessTokenFromReq } from '$/utils/getAccessTokenFromReq';
import { CreateBoardReqBodySchema } from './dto';
import { getQueryParams } from '$/utils/getQueryParams';

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
