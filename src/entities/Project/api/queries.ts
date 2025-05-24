import { queryClient } from '@/shared/config/query';
import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstack-query';

import { createProject } from '../api/createProject';
import { getProjectsByTeam } from './getProjectsByTeam';
import { deleteProject } from './deleteProject';

import type {
  GetProjectsByTeamDto,
  CreateProjectDto,
  DeleteProjectDtoReq,
} from '../models/types';

export const projectQueries = {
  teamProjects: (teamIdOrSlug: string) => ['projects', teamIdOrSlug],

  getProjectsByTeam: (dto: GetProjectsByTeamDto) =>
    queryOptions({
      queryKey: [...projectQueries.teamProjects(dto.teamIdOrSlug)],
      queryFn: () => getProjectsByTeam(dto),
      select: res => res.data,
    }),

  createProject: () =>
    mutationOptions({
      mutationFn: (dto: CreateProjectDto) => createProject(dto),
      onSuccess: (_, { teamIdOrSlug }) =>
        queryClient.invalidateQueries({
          queryKey: [...projectQueries.teamProjects(teamIdOrSlug)],
        }),
    }),

  //TODO: add optimistic update
  deleteProject: () =>
    mutationOptions({
      mutationFn: (dto: DeleteProjectDtoReq) => deleteProject(dto),
      onSuccess: (_, { teamIdOrSlug }) =>
        queryClient.invalidateQueries({
          queryKey: [...projectQueries.teamProjects(teamIdOrSlug)],
        }),
    }),
};
