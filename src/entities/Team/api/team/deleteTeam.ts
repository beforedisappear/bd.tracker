import { apiClient } from '@/shared/api/c';

import type { DeleteTeamDtoReq, DeleteTeamDtoRes } from '../../model/types';

export const deleteTeamRequest = async (dto: DeleteTeamDtoReq) => {
  return apiClient.withAuth.delete<DeleteTeamDtoRes>(`/team/${dto.idOrSlug}`);
};
