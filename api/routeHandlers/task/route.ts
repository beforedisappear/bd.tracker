import { taskService } from 'api/services/task.service';
import { NextRequest, NextResponse } from 'next/server';
import { CreateTaskReqBodySchema } from './dto';
import { authService } from 'api/services/auth.service';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { ErrorResponse } from 'api/errors/errorResponse';

export const PostCreateTask = async (req: NextRequest) => {
  try {
    const { columnId, title, order } = CreateTaskReqBodySchema.parse(
      await req.json(),
    );

    const { userId } = await authService.verifyJwt(getAccessTokenFromReq(req));

    const task = await taskService.createTask({
      columnId,
      title,
      order,
      initiatorId: userId,
    });

    return NextResponse.json(task);
  } catch (error) {
    return ErrorResponse(error);
  }
};
