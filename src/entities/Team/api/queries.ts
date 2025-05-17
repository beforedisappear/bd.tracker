import { mutationOptions } from '@/shared/lib/tanstack-query';
import { queryOptions } from '@tanstack/react-query';
import { queryClient } from '@/shared/config/query';

import { getHaveAccessToTeam } from './getHaveAccessToTeam';
import { getUserTeamList } from './getUserTeamList';
import { createTeam } from './createTeam';
import { deleteTeam } from './deleteTeam';
import { renameTeam } from './renameTeam';
import { getTeamById } from './getTeamByid';
import { inviteToTeam } from './inviteToTeam';
import { getTeamMembers } from './getTeamMembers';

import type {
  Team,
  CreateTeamDtoReq,
  DeleteTeamDtoReq,
  RenameTeamDtoReq,
  GetHaveAccessToTeamDto,
  GetTeamByIdDtoReq,
  InviteToTeamDtoReq,
  GetTeamMembersDtoReq,
} from '../models/types';
import type { AxiosResponse } from 'axios';

export const teamQueries = {
  currentUser: () => ['currentUser'],

  userTeamList: () => ['userTeamList'],

  userTeamById: (idOrSlug: string) => ['userTeamById', idOrSlug],

  teamMembers: (idOrSlug: string) => ['teamMembers', idOrSlug],

  getUserTeamList: () =>
    queryOptions({
      queryKey: [...teamQueries.userTeamList()],
      queryFn: getUserTeamList,
      select: res => res.data,
    }),

  getTeamMembers: (dto: GetTeamMembersDtoReq) =>
    queryOptions({
      queryKey: [...teamQueries.teamMembers(dto.idOrSlug)],
      queryFn: () => getTeamMembers(dto),
      select: res => res.data,
    }),

  // TODO: add cache time
  getHaveAccessToTeam: (dto: GetHaveAccessToTeamDto) =>
    queryOptions({
      queryKey: ['teamAccess', dto.idOrSlug],
      queryFn: () => getHaveAccessToTeam(dto),
      select: res => res.data,
    }),

  getTeamById: (dto: GetTeamByIdDtoReq) =>
    queryOptions({
      queryKey: [...teamQueries.userTeamById(dto.idOrSlug)],
      queryFn: () => getTeamById(dto),
      select: res => res.data,
    }),

  createTeam: () =>
    mutationOptions({
      mutationKey: ['createTeam'],
      mutationFn: (data: CreateTeamDtoReq) => createTeam(data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [...teamQueries.userTeamList()],
          refetchType: 'active',
        }),
    }),

  deleteTeam: () =>
    mutationOptions({
      mutationKey: ['deleteTeam'],
      mutationFn: (dto: DeleteTeamDtoReq) => deleteTeam(dto),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [...teamQueries.userTeamList()],
          refetchType: 'active',
        }),
    }),

  renameTeam: () =>
    mutationOptions({
      mutationKey: ['renameTeam'],
      mutationFn: (dto: RenameTeamDtoReq) => renameTeam(dto),
      onMutate: async ({ idOrSlug, name }) => {
        const queryKey = teamQueries.userTeamList();

        await queryClient.cancelQueries({ queryKey });

        const previousTeams: AxiosResponse<Team[]> | undefined =
          queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (old: AxiosResponse<Team[]>) => {
          const newTeams = old.data.map((team: Team) =>
            team.id === idOrSlug ? { ...team, name } : team,
          );

          return { ...old, data: newTeams };
        });

        return { previousTeams };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousTeams) {
          const queryKey = teamQueries.userTeamList();
          queryClient.setQueryData(queryKey, context.previousTeams);
        }
      },
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: [...teamQueries.userTeamList()],
        }),
    }),

  inviteToTeam: () =>
    mutationOptions({
      mutationKey: ['inviteToTeam'],
      mutationFn: (dto: InviteToTeamDtoReq) => inviteToTeam(dto),
    }),
};
