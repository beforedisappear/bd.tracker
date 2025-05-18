import { mutationOptions } from '@/shared/lib/tanstack-query';
import { queryOptions } from '@tanstack/react-query';
import { queryClient } from '@/shared/config/query';

import { getHaveAccessToTeam } from './getHaveAccessToTeam';
import { getUserTeamList } from './getUserTeamList';
import { getTeamMembers } from './getTeamMembers';
import { getTeamById } from './getTeamByid';
import { getTeamMemberById } from './getTeamMemberById';
import { createTeam } from './createTeam';
import { deleteTeam } from './deleteTeam';
import { renameTeam } from './renameTeam';
import { inviteToTeam } from './inviteToTeam';
import { addAdmin } from './addAdmin';
import { deleteAdmin } from './deleteAdmin';
import { deleteTeamMember } from './deleteTeamMember';
import type {
  Team,
  CreateTeamDtoReq,
  DeleteTeamDtoReq,
  RenameTeamDtoReq,
  GetHaveAccessToTeamDto,
  GetTeamByIdDtoReq,
  InviteToTeamDtoReq,
  GetTeamMembersDtoReq,
  GetTeamMemberByIdDtoReq,
  AddTeamMemberAdminDtoReq,
  DeleteTeamMemberAdminDtoReq,
  DeleteTeamMemberDtoReq,
} from '../models/types';
import type { AxiosResponse } from 'axios';

export const teamQueries = {
  currentUser: () => ['currentUser'],

  userTeamList: () => ['userTeamList'],

  userTeamById: (idOrSlug: string) => ['userTeamById', idOrSlug],

  teamMembers: (idOrSlug: string) => ['teamMembers', idOrSlug],

  teamMemberById: (idOrSlug: string, memberId: string) => [
    'teamMemberById',
    idOrSlug,
    memberId,
  ],

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

  getTeamMemberById: (dto: GetTeamMemberByIdDtoReq) =>
    queryOptions({
      queryKey: [...teamQueries.teamMemberById(dto.teamIdOrSlug, dto.memberId)],
      queryFn: () => getTeamMemberById(dto),
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

  //TODO: if success is notifications, then invalidate data
  inviteToTeam: () =>
    mutationOptions({
      mutationKey: ['inviteToTeam'],
      mutationFn: (dto: InviteToTeamDtoReq) => inviteToTeam(dto),
    }),

  deleteTeamMember: () =>
    mutationOptions({
      mutationKey: ['deleteTeamMember'],
      mutationFn: (dto: DeleteTeamMemberDtoReq) => deleteTeamMember(dto),
      onSuccess: (_, { teamIdOrSlug, memberId }) => {
        queryClient.setQueryData(
          [...teamQueries.teamMemberById(teamIdOrSlug, memberId)],
          null,
        );

        queryClient.invalidateQueries({
          queryKey: [...teamQueries.teamMembers(teamIdOrSlug)],
        });
      },
    }),

  addAdmin: () =>
    mutationOptions({
      mutationKey: ['addAdmin'],
      mutationFn: (dto: AddTeamMemberAdminDtoReq) => addAdmin(dto),
      onSuccess: (_, { teamIdOrSlug, memberId }) =>
        queryClient.invalidateQueries({
          queryKey: [...teamQueries.teamMemberById(teamIdOrSlug, memberId)],
          refetchType: 'active',
        }),
    }),

  deleteAdmin: () =>
    mutationOptions({
      mutationKey: ['deleteAdmin'],
      mutationFn: (dto: DeleteTeamMemberAdminDtoReq) => deleteAdmin(dto),
      onSuccess: (_, { teamIdOrSlug, memberId }) =>
        queryClient.invalidateQueries({
          queryKey: [...teamQueries.teamMemberById(teamIdOrSlug, memberId)],
          refetchType: 'active',
        }),
    }),
};
