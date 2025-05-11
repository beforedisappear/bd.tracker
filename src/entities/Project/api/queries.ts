import { queryOptions } from '@tanstack/react-query';
import { getProjectsByTeam } from './getProjectsByTeam';

import type { GetProjectsByTeamDto } from '../models/types';

export const projectQueries = {
  getProjectsByTeam: (dto: GetProjectsByTeamDto) =>
    queryOptions({
      queryKey: ['projects', dto.teamIdOrSlug],
      queryFn: () => getProjectsByTeam(dto),
      select: res => res.data,
    }),
};
