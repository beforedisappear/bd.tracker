import { mutationOptions } from '@/shared/lib/tanstack-query';

import { createTeam } from './createTeam';

import type { CreateTeamDtoReq } from '../models/types';
import { getUserTeamList } from './getUserTeamList';
import { queryOptions } from '@tanstack/react-query';

export const teamQueries = {
  currentUser: () => ['currentUser'],

  createTeam: () =>
    mutationOptions({
      mutationKey: ['createTeam'],
      mutationFn: (data: CreateTeamDtoReq) => createTeam(data),
    }),

  getUserTeamList: () =>
    queryOptions({
      queryKey: [...teamQueries.currentUser(), 'usetTeamList'],
      queryFn: getUserTeamList,
      select: res => res.data,
    }),
};
