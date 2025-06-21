import { NextRequest, NextResponse } from 'next/server';
import { RenameColumnReqBodySchema, RenameColumnReqParamsSchema } from './dto';
import { columnService } from 'api/services/column.service';
import { ErrorResponse } from 'api/errors/errorResponse';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import type { RenameColumnReqParamsDto } from './types';

export const PatchRenameColumn = async (
  req: NextRequest,
  { params }: { params: Promise<RenameColumnReqParamsDto> },
) => {
  try {
    const accessToken = getAccessTokenFromReq(req);
    const { userId } = await authService.verifyJwt(accessToken);
    const { columnId } = RenameColumnReqParamsSchema.parse(await params);
    const { name } = RenameColumnReqBodySchema.parse(await req.json());

    const renamedColumn = await columnService.renameColumn({
      id: columnId,
      name,
      initiatorId: userId,
    });

    return NextResponse.json(renamedColumn);
  } catch (error) {
    return ErrorResponse(error);
  }
};
