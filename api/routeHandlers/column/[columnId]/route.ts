import { NextRequest, NextResponse } from 'next/server';
import { DeleteColumnByIdReqParamsSchema } from './dto';
import { ErrorResponse } from 'api/errors/errorResponse';
import { DeleteColumnByIdReqParamsDto } from './types';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { columnService } from 'api/services/column.service';

export const DeleteColumnById = async (
  req: NextRequest,
  { params }: { params: Promise<DeleteColumnByIdReqParamsDto> },
) => {
  try {
    const accessToken = getAccessTokenFromReq(req);
    const { userId } = await authService.verifyJwt(accessToken);

    const { columnId } = DeleteColumnByIdReqParamsSchema.parse(await params);

    const deletedColumn = await columnService.deleteColumn({
      id: columnId,
      initiatorId: userId,
    });

    return NextResponse.json(deletedColumn);
  } catch (error) {
    return ErrorResponse(error);
  }
};
