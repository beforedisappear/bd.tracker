import { mutationOptions } from '@/shared/lib/tanstackQuery';
import { queryOptions } from '@tanstack/react-query';
import { queryClient } from '@/shared/config/query';

import { projectQueries } from '@/entities/Project/@x/team';

import { getHaveAccessToTeamRequest } from './team/getHaveAccessToTeam';
import { getUserTeamListRequest } from './team/getUserTeamList';
import { getTeamByIdRequest } from './team/getTeamByid';
import { createTeamRequest } from './team/createTeam';
import { deleteTeamRequest } from './team/deleteTeam';
import { renameTeamRequest } from './team/renameTeam';
import { inviteToTeamRequest } from './team/inviteToTeam';
import { checkTeamInvitationRequest } from './team/checkTeamInvitation';

import { getTeamMemberByIdRequest } from './teamMember/getTeamMemberById';
import { deleteTeamMemberRequest } from './teamMember/deleteTeamMember';
import { getTeamMembersRequest } from './teamMember/getTeamMembers';

import { addAdminRequest } from './admin/addAdmin';
import { deleteAdminRequest } from './admin/deleteAdmin';

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
  CheckTeamInvitationDtoReq,
} from '../model/types';
import type { AxiosResponse } from 'axios';

export namespace teamQueries {
  const userTeamList = () => ['userTeamList'];

  const userTeamById = (idOrSlug: string) => ['userTeamById', idOrSlug];

  const teamMembers = (idOrSlug: string, keyword?: string) => [
    'teamMembers',
    idOrSlug,
    ...(keyword ? ['keyword', keyword] : []),
  ];

  const teamMemberById = (idOrSlug: string, memberId: string) => [
    'teamMemberById',
    idOrSlug,
    memberId,
  ];

  export const getUserTeamList = () =>
    queryOptions({
      queryKey: [...userTeamList()],
      queryFn: getUserTeamListRequest,
    });

  export const getTeamMembers = (dto: GetTeamMembersDtoReq) =>
    queryOptions({
      queryKey: [...teamMembers(dto.idOrSlug, dto.keyword)],
      queryFn: () => getTeamMembersRequest(dto),
      select: res => res.data,
    });

  export const getHaveAccessToTeam = (dto: GetHaveAccessToTeamDto) =>
    queryOptions({
      queryKey: ['teamAccess', dto.idOrSlug],
      queryFn: () => getHaveAccessToTeamRequest(dto),
      select: res => res.data,
      staleTime: 60 * 1000 * 10,
    });

  export const getTeamById = (dto: GetTeamByIdDtoReq) =>
    queryOptions({
      queryKey: [...userTeamById(dto.idOrSlug)],
      queryFn: () => getTeamByIdRequest(dto),
      select: res => res.data,
    });

  export const getTeamMemberById = (dto: GetTeamMemberByIdDtoReq) =>
    queryOptions({
      queryKey: [...teamMemberById(dto.teamIdOrSlug, dto.memberId)],
      queryFn: () => getTeamMemberByIdRequest(dto),
    });

  export const createTeam = () =>
    mutationOptions({
      mutationKey: ['createTeam'],
      mutationFn: (data: CreateTeamDtoReq) => createTeamRequest(data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [...userTeamList()],
          refetchType: 'active',
        }),
    });

  export const deleteTeam = () =>
    mutationOptions({
      mutationKey: ['deleteTeam'],
      mutationFn: (dto: DeleteTeamDtoReq) => deleteTeamRequest(dto),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [...userTeamList()],
          refetchType: 'active',
        }),
    });

  export const renameTeam = () =>
    mutationOptions({
      mutationKey: ['renameTeam'],
      mutationFn: (dto: RenameTeamDtoReq) => renameTeamRequest(dto),
      onMutate: async ({ idOrSlug, name }) => {
        const queryKey = userTeamList();

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
        if (!context?.previousTeams) return;

        const queryKey = userTeamList();
        queryClient.setQueryData(queryKey, context.previousTeams);
      },
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: [...userTeamList()],
        }),
    });

  export const inviteToTeam = () =>
    mutationOptions({
      mutationKey: ['inviteToTeam'],
      mutationFn: (dto: InviteToTeamDtoReq) => inviteToTeamRequest(dto),
      onSuccess: ({ data }, { teamIdOrSlug }) => {
        if (data.result === 'proposal') return;

        queryClient.invalidateQueries({
          queryKey: [...teamMembers(teamIdOrSlug)],
          refetchType: 'active',
        });
      },
    });

  export const checkTeamInvitation = () =>
    mutationOptions({
      mutationKey: ['checkTeamInvitation'],
      mutationFn: (dto: CheckTeamInvitationDtoReq) =>
        checkTeamInvitationRequest(dto),
    });

  export const deleteTeamMember = () =>
    mutationOptions({
      mutationKey: ['deleteTeamMember'],
      mutationFn: (dto: DeleteTeamMemberDtoReq) => deleteTeamMemberRequest(dto),
      onSuccess: (_, { teamIdOrSlug, memberId }) => {
        queryClient.setQueryData(
          [...teamMemberById(teamIdOrSlug, memberId)],
          null,
        );

        queryClient.invalidateQueries({
          queryKey: [...teamMembers(teamIdOrSlug)],
        });

        queryClient.invalidateQueries({
          queryKey: [...projectQueries.teamProjects(teamIdOrSlug)],
        });
      },
    });

  export const addAdmin = () =>
    mutationOptions({
      mutationKey: ['addAdmin'],
      mutationFn: (dto: AddTeamMemberAdminDtoReq) => addAdminRequest(dto),
      onSuccess: (_, { teamIdOrSlug, memberId }) =>
        queryClient.invalidateQueries({
          queryKey: [...teamMemberById(teamIdOrSlug, memberId)],
          refetchType: 'active',
        }),
    });

  export const deleteAdmin = () =>
    mutationOptions({
      mutationKey: ['deleteAdmin'],
      mutationFn: (dto: DeleteTeamMemberAdminDtoReq) => deleteAdminRequest(dto),
      onSuccess: (_, { teamIdOrSlug, memberId }) =>
        queryClient.invalidateQueries({
          queryKey: [...teamMemberById(teamIdOrSlug, memberId)],
          refetchType: 'active',
        }),
    });
}
