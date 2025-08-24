import { apiClient } from '@/shared/api/c';
import type {
  CheckTeamInvitationDtoReq,
  CheckTeamInvitationDtoRes,
} from '../../model/types';

export const checkTeamInvitationRequest = async (
  data: CheckTeamInvitationDtoReq,
) => {
  const { idOrSlug, ...params } = data;

  return apiClient.withAuth
    .get<CheckTeamInvitationDtoRes>(`/team/${idOrSlug}/invitation/check`, {
      params,
    })
    .then(res => res.data);
};
