import { NextRequest, NextResponse } from 'next/server';
import { RenameBoardDtoReqParams, RenameBoardDtoBodyReq } from './dto';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { boardService } from 'api/services/board.service';
import type { RenameBoardDtoReqParamsDto } from './types';
import { ErrorResponse } from 'api/errors/errorResponse';

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

    return NextResponse.json(renamedBoard);
  } catch (error) {
    return ErrorResponse(error);
  }
};
