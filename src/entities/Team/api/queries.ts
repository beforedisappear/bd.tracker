import { mutationOptions } from '@/shared/lib/tanstack-query';

import { createTeam } from './createTeam';
import { getUserTeamList } from './getUserTeamList';

import { queryOptions } from '@tanstack/react-query';
import { queryClient } from '@/shared/config/query';

import type { CreateTeamDtoReq } from '../models/types';

export const teamQueries = {
  currentUser: () => ['currentUser'],

  userTeamList: () => ['userTeamList'],

  createTeam: () =>
    mutationOptions({
      mutationKey: ['createTeam'],
      mutationFn: (data: CreateTeamDtoReq) => createTeam(data),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [...teamQueries.userTeamList()],
          refetchType: 'none',
        }),
    }),

  getUserTeamList: () =>
    queryOptions({
      queryKey: [...teamQueries.userTeamList()],
      queryFn: getUserTeamList,
      select: res => res.data,
    }),
};
