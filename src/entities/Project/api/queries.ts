import { queryClient } from '@/shared/config/query';
import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstack-query';

import { createProject } from '../api/createProject';
import { getProjectsByTeam } from './getProjectsByTeam';
import { getProjectMembers } from './getProjectMembers';
import { deleteProject } from './deleteProject';
import { addProjectMember } from './addProjectMember';
import { removeProjectMember } from './removeProjectMembet';
import { updateProjectMembers } from './updateProjectMembers';

import type {
  GetProjectsByTeamDtoReq,
  GetProjectMembersDtoReq,
  CreateProjectDto,
  DeleteProjectDtoReq,
  AddProjectMemberDtoReq,
  RemoveProjectMemberDtoReq,
  UpdateProjectMembersDtoReq,
} from '../models/types';

export const projectQueries = {
  teamProjects: (teamIdOrSlug: string) => ['projects', teamIdOrSlug],

  projectMembers: (projectId: string) => ['projectMembers', projectId],

  getProjectsByTeam: (dto: GetProjectsByTeamDtoReq) =>
    queryOptions({
      queryKey: [...projectQueries.teamProjects(dto.teamIdOrSlug)],
      queryFn: () => getProjectsByTeam(dto),
      select: res => res.data,
    }),

  getProjectMembers: (dto: GetProjectMembersDtoReq) =>
    queryOptions({
      queryKey: [...projectQueries.projectMembers(dto.projectId)],
      queryFn: () => getProjectMembers(dto),
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

  addProjectMember: () =>
    mutationOptions({
      mutationFn: (dto: AddProjectMemberDtoReq) => addProjectMember(dto),
    }),

  removeProjectMember: () =>
    mutationOptions({
      mutationFn: (dto: RemoveProjectMemberDtoReq) => removeProjectMember(dto),
    }),

  updateProjectMembers: () =>
    mutationOptions({
      mutationFn: (dto: UpdateProjectMembersDtoReq) =>
        updateProjectMembers(dto),
      onSuccess: (_, { teamIdOrSlug, projectId }) => {
        queryClient.invalidateQueries({
          queryKey: [...projectQueries.teamProjects(teamIdOrSlug)],
        });

        setTimeout(
          () =>
            queryClient.invalidateQueries({
              queryKey: [...projectQueries.projectMembers(projectId)],
              refetchType: 'active',
            }),
          0,
        );
      },
    }),
};
