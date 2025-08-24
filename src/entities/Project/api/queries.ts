import { queryClient } from '@/shared/config/query';
import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstackQuery';

import { createProjectRequest } from './project/createProject';
import { renameProjectRequest } from './project/renameProject';
import { getProjectsByTeamRequest } from './project/getProjectsByTeam';
import { deleteProjectRequest } from './project/deleteProject';

import { getProjectMembersRequest } from './projectMember/getProjectMembers';
import { addProjectMemberRequest } from './projectMember/addProjectMember';
import { removeProjectMemberRequest } from './projectMember/removeProjectMember';
import { updateProjectMembersRequest } from './projectMember/updateProjectMembers';

import type {
  GetProjectsByTeamDtoReq,
  GetProjectMembersDtoReq,
  CreateProjectDto,
  DeleteProjectDtoReq,
  AddProjectMemberDtoReq,
  RemoveProjectMemberDtoReq,
  UpdateProjectMembersDtoReq,
  RenameProjectDtoReq,
} from '../model/types';

export namespace projectQueries {
  export const teamProjects = (teamIdOrSlug: string) => [
    'projects',
    teamIdOrSlug,
  ];

  const projectMembers = (projectId: string) => ['projectMembers', projectId];

  export const getProjectsByTeam = (dto: GetProjectsByTeamDtoReq) =>
    queryOptions({
      queryKey: [...projectQueries.teamProjects(dto.teamIdOrSlug)],
      queryFn: () => getProjectsByTeamRequest(dto),
      select: res => res.data,
    });

  export const getProjectMembers = (dto: GetProjectMembersDtoReq) =>
    queryOptions({
      queryKey: [...projectMembers(dto.projectId)],
      queryFn: () => getProjectMembersRequest(dto),
      select: res => res.data,
    });

  export const createProject = () =>
    mutationOptions({
      mutationFn: (dto: CreateProjectDto) => createProjectRequest(dto),
      onSuccess: (_, { teamIdOrSlug }) =>
        queryClient.invalidateQueries({
          queryKey: [...projectQueries.teamProjects(teamIdOrSlug)],
        }),
    });

  export const renameProject = () =>
    mutationOptions({
      mutationFn: (dto: RenameProjectDtoReq) => renameProjectRequest(dto),
      onSuccess: (_, { teamIdOrSlug }) => {
        queryClient.invalidateQueries({
          queryKey: [...projectQueries.teamProjects(teamIdOrSlug)],
        });
      },
    });

  export const deleteProject = () =>
    mutationOptions({
      mutationFn: (dto: DeleteProjectDtoReq) => deleteProjectRequest(dto),
      onSuccess: (_, { teamIdOrSlug }) =>
        queryClient.invalidateQueries({
          queryKey: [...projectQueries.teamProjects(teamIdOrSlug)],
        }),
    });

  export const addProjectMember = () =>
    mutationOptions({
      mutationFn: (dto: AddProjectMemberDtoReq) => addProjectMemberRequest(dto),
    });

  export const removeProjectMember = () =>
    mutationOptions({
      mutationFn: (dto: RemoveProjectMemberDtoReq) =>
        removeProjectMemberRequest(dto),
    });

  export const updateProjectMembers = () =>
    mutationOptions({
      mutationFn: (dto: UpdateProjectMembersDtoReq) =>
        updateProjectMembersRequest(dto),
      onSuccess: (_, { teamIdOrSlug, projectId }) => {
        queryClient.invalidateQueries({
          queryKey: [...projectQueries.teamProjects(teamIdOrSlug)],
        });

        setTimeout(
          () =>
            queryClient.invalidateQueries({
              queryKey: [...projectMembers(projectId)],
              refetchType: 'active',
            }),
          0,
        );
      },
    });
}
