import { authService } from 'api/services/auth.service';
import { teamService } from 'api/services/team.service';

import { ErrorResponse } from 'api/errors/errorResponse';

import { type NextRequest, NextResponse } from 'next/server';
import { getAccessTokenFromReq } from 'api/utils/getAccessTokenFromReq';
import { getQueryParams } from 'api/utils/getQueryParams';

import {
  CheckInvitationExistsReqQuerySchema,
  CheckInvitationExistsReqParamsSchema,
} from './dto';

import type { CheckInvitationExistsReqParams } from './types';

export async function GetCheckInvitationExists(
  request: NextRequest,
  { params }: { params: Promise<CheckInvitationExistsReqParams> },
) {
  try {
    const accessToken = getAccessTokenFromReq(request);
    const { userId } = await authService.verifyJwt(accessToken);

    const { idOrSlug } = await params;
    CheckInvitationExistsReqParamsSchema.parse({ idOrSlug });

    const { inviteeEmail } = getQueryParams(request, ['inviteeEmail']);
    CheckInvitationExistsReqQuerySchema.parse({ inviteeEmail });

    const isInvitationExists =
      await teamService.checkInvitationExistsByInviteeEmail({
        idOrSlug,
        inviteeEmail,
        checkerId: userId,
      });

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
