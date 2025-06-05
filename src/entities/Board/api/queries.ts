import { queryClient } from '@/shared/config/query';
import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstack-query';

import { getAllBoards } from './board/getAllBoards';
import { createBoard } from './board/createBoard';
import { getBoardById } from './board/getBoardById';
import { deleteBoard } from './board/deleteBoard';

import { createColumn } from './column/createColumn';

import type {
  GetAllBoardsDtoReq,
  CreateBoardDtoReq,
  DeleteBoardDtoReq,
  GetBoardByIdDtoReq,
  CreateColumnDtoReq,
  DeleteColumnDtoReq,
} from '../model/types';
import { deleteColumn } from './column/deleteColumn';

export const boardQueries = {
  all: (projectId: string) => ['boards', projectId],

  boardById: (boardId: string) => ['board', boardId],

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
      queryKey: [...boardQueries.boardById(dto.boardId)],
      queryFn: () => getBoardById(dto),
      select: res => res.data,
    }),

  deleteBoard: () =>
    mutationOptions({
      mutationFn: (dto: DeleteBoardDtoReq) => deleteBoard(dto),
    }),
};

export const columnQueries = {
  createColumn: () =>
    mutationOptions({
      mutationFn: (dto: CreateColumnDtoReq) => createColumn(dto),
      onSuccess: (_, { boardId }) =>
        queryClient.invalidateQueries({
          queryKey: [...boardQueries.boardById(boardId)],
        }),
    }),

  deleteColumn: () =>
    mutationOptions({
      mutationFn: (dto: DeleteColumnDtoReq) => deleteColumn(dto),
      onSuccess: (_, { boardId }) =>
        queryClient.invalidateQueries({
          queryKey: [...boardQueries.boardById(boardId)],
        }),
    }),
};
