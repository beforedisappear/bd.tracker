import { NextRequest } from 'next/server';

import { authService } from 'api/services/auth.service';
import { taskService } from 'api/services/task.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { ErrorResponse } from 'api/errors/errorResponse';
import {
  UpdateTaskDtoReqBodySchema,
  UpdateTaskDtoReqParamsSchema,
} from './dto';
import type { UpdateTaskDtoReqParamsDto } from './types';

export const PatchUpdateTask = async (
  req: NextRequest,
  { params }: { params: Promise<UpdateTaskDtoReqParamsDto> },
) => {
  try {
    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const { id } = UpdateTaskDtoReqParamsSchema.parse(await params);

    const body = UpdateTaskDtoReqBodySchema.parse(await req.json());

    await taskService.updateTask({
      id,
      initiatorId: userId,
      ...body,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
