import { apiClient } from '@/shared/api/c';

import type {
  GetTeamMemberByIdDtoReq,
  GetTeamMemberByIdDtoRes,
} from '../../model/types';

export const getTeamMemberByIdRequest = async (
  data: GetTeamMemberByIdDtoReq,
) => {
  const { teamIdOrSlug, memberId } = data;

  return apiClient.withAuth
    .get<GetTeamMemberByIdDtoRes>(`/team/${teamIdOrSlug}/members/${memberId}`)
    .then(res => res.data);
};
