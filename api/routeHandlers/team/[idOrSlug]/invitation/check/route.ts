import { authService } from '$/services/auth.service';
import { teamService } from '$/services/team.service';

import { ErrorResponse } from '$/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';
import { getAccessTokenFromReq } from '$/utils';

import {
  CheckInvitationExistsReqBodySchema,
  CheckInvitationExistsReqParamsSchema,
} from '$/dto/team.dto';

import type {
  CheckInvitationExistsReqParams,
  CheckInvitationExistsReqDto,
} from '$/types/team.types';

export async function GetCheckInvitationExists(
  request: NextRequest,
  { params }: { params: Promise<CheckInvitationExistsReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);

    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug } = await params;

    const dto: CheckInvitationExistsReqDto = await request.json();

    CheckInvitationExistsReqBodySchema.parse(dto);
    CheckInvitationExistsReqParamsSchema.parse({ idOrSlug });

    const isInvitationExists =
      await teamService.checkInvitationExistsByInviteeEmail(
        idOrSlug,
        dto.inviteeEmail,
        userId,
      );

    return NextResponse.json(
      { exists: isInvitationExists },
      {
        status: 200,
      },
    );
  } catch (e) {
    return ErrorResponse(e);
  }
}
