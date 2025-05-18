import { apiClient } from '@/shared/api/apiClient';

import type {
  GetTeamMemberByIdDtoReq,
  GetTeamMemberByIdDtoRes,
} from '../models/types';

export const getTeamMemberById = (data: GetTeamMemberByIdDtoReq) => {
  return apiClient.withAuth.get<GetTeamMemberByIdDtoRes>(
    `/team/${data.teamIdOrSlug}/members/${data.memberId}`,
  );
};
