import { apiClient } from '@/shared/api/c';

import type {
  GetTeamMembersDtoReq,
  GetTeamMembersDtoRes,
} from '../../model/types';

export const getTeamMembersRequest = async (data: GetTeamMembersDtoReq) => {
  return apiClient.withAuth.get<GetTeamMembersDtoRes>(
    `/team/${data.idOrSlug}/members`,
    { params: { keyword: data.keyword } },
  );
};
