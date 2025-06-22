import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from 'api/errors/errorResponse';
import { MoveColumnReqParamsDto } from './types';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { MoveColumnReqParamsSchema, MoveColumnReqBodySchema } from './dto';
import { columnService } from 'api/services/column.service';

export const PatchMoveColumnRoute = async (
  req: NextRequest,
  { params }: { params: Promise<MoveColumnReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const { columnId } = MoveColumnReqParamsSchema.parse(await params);

    const { order } = MoveColumnReqBodySchema.parse(await req.json());

    const movedColumn = await columnService.moveColumn({
      id: columnId,
      order,
      initiatorId: userId,
    });

    return NextResponse.json(movedColumn);
  } catch (error) {
    return ErrorResponse(error);
  }
};
