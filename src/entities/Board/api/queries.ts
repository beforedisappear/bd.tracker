import { queryClient } from '@/shared/config/query';
import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstack-query';

import { getAllBoards } from './getAllBoards';
import { createBoard } from './createBoard';
import { getBoardById } from './getBoardById';
import { deleteBoard } from './deleteBoard';

import type {
  GetAllBoardsDtoReq,
  CreateBoardDtoReq,
  DeleteBoardDtoReq,
  GetBoardByIdDtoReq,
} from '../model/types';

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

  getBoardById: (dto: GetBoardByIdDtoReq) =>
    queryOptions({
      queryKey: ['board', dto.boardId],
      queryFn: () => getBoardById(dto),
    }),

  deleteBoard: () =>
    mutationOptions({
      mutationFn: (dto: DeleteBoardDtoReq) => deleteBoard(dto),
    }),
};
