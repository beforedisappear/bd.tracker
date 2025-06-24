import { NextRequest, NextResponse } from 'next/server';
import { CreateColumnReqBodySchema } from './dto';
import { columnService } from 'api/services/column.service';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { ErrorResponse } from 'api/errors/errorResponse';

export const PostCreateColumn = async (req: NextRequest) => {
  try {
    const { boardId, name, order } = CreateColumnReqBodySchema.parse(
      await req.json(),
    );
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const column = await columnService.createColumn({
      name,
      boardId,
      initiatorId: userId,
      order,
    });

    return NextResponse.json(column);
  } catch (error) {
    return ErrorResponse(error);
  }
};
