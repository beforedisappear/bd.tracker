import { apiClient } from '@/shared/api/c';

import type {
  GetTeamMemberByIdDtoReq,
  GetTeamMemberByIdDtoRes,
} from '../models/types';

export const getTeamMemberById = async (data: GetTeamMemberByIdDtoReq) => {
  const { teamIdOrSlug, memberId } = data;

  return apiClient.withAuth
    .get<GetTeamMemberByIdDtoRes>(`/team/${teamIdOrSlug}/members/${memberId}`)
    .then(res => res.data);
};
