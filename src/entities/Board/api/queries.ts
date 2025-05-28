import { queryClient } from '@/shared/config/query';
import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstack-query';

import { getAllBoards } from './getAllBoards';
import { createBoard } from './createBoard';

import type { GetAllBoardsDtoReq, CreateBoardDtoReq } from '../model/types';
import { getBoardById } from './getBoardById';

export const boardQueries = {
  all: (projectId: string) => ['boards', projectId],

  createBoard: () =>
    mutationOptions({
      mutationFn: (dto: CreateBoardDtoReq) => createBoard(dto),
      onSuccess: (_, { projectId }) => {
        queryClient.invalidateQueries({
          queryKey: [...boardQueries.all(projectId)],
        });
      },
    }),

  getAllBoards: (dto: GetAllBoardsDtoReq) =>
    queryOptions({
      queryKey: [...boardQueries.all(dto.projectId)],
      queryFn: () => getAllBoards(dto),
      select: res => res.data,
    }),

  getBoardById: (id: string) =>
    queryOptions({
      queryKey: ['board', id],
      queryFn: () => getBoardById(id),
    }),
};
