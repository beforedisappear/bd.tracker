import { RenameTeamDataReqSchema } from '$/dto/team.dto';
import { ErrorResponse } from '$/errors/errorResponse';
import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';
import { RenameTeamReqDto } from '$/types/team.types';
import { getAccessTokenFromReq, getQueryParams } from '$/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function PatchTeamRename(request: NextRequest) {
  try {
    const { id: teamId } = getQueryParams(request, ['id'], { strict: true });

    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const dto: RenameTeamReqDto = await request.json();

    RenameTeamDataReqSchema.parse(dto);

    const newTeam = await teamService.renameTeam(teamId, userId, dto);

    return NextResponse.json(
      { name: newTeam.name },
      {
        status: 200,
      },
    );
  } catch (e) {
    return ErrorResponse(e);
  }
}
