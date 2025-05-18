import { apiClient } from '@/shared/api/c';

import type {
  GetTeamMembersDtoReq,
  GetTeamMembersDtoRes,
} from '../models/types';

export const getTeamMembers = (data: GetTeamMembersDtoReq) => {
  return apiClient.withAuth.get<GetTeamMembersDtoRes>(
    `/team/${data.idOrSlug}/members`,
    { params: { keyword: data.keyword } },
  );
};
