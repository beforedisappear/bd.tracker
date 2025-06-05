import { queryClient } from '@/shared/config/query';
import { queryOptions } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstack-query';

import { getAllBoards } from './board/getAllBoards';
import { createBoard } from './board/createBoard';
import { getBoardById } from './board/getBoardById';
import { deleteBoard } from './board/deleteBoard';

import { createColumn } from './column/createColumn';
import { deleteColumn } from './column/deleteColumn';
import { moveColumn } from './column/moveColumn';

import { createTask } from './task/createTask';

import type {
  GetAllBoardsDtoReq,
  CreateBoardDtoReq,
  DeleteBoardDtoReq,
  GetBoardByIdDtoReq,
  CreateColumnDtoReq,
  DeleteColumnDtoReq,
  CreateTaskDtoReq,
  MoveColumnDtoReq,
  GetBoardByIdDtoRes,
  Column,
  Board,
} from '../model/types';

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
    }),

  deleteBoard: () =>
    mutationOptions({
      mutationFn: (dto: DeleteBoardDtoReq) => deleteBoard(dto),
      onSuccess: (_, { projectId }) => {
        queryClient.invalidateQueries({
          queryKey: [...boardQueries.all(projectId)],
        });
      },
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

  moveColumn: () =>
    mutationOptions({
      mutationFn: (dto: MoveColumnDtoReq) => moveColumn(dto),
    }),
};

export const taskQueries = {
  createTask: () =>
    mutationOptions({
      mutationFn: (dto: CreateTaskDtoReq) => createTask(dto),
      onSuccess: (res, { boardId, columnId }) =>
        queryClient.setQueryData(
          [...boardQueries.boardById(boardId)],
          (old: GetBoardByIdDtoRes) => {
            const copyOld = structuredClone(old);

            const column = copyOld.columns.find(
              c => c.id === columnId,
            ) as Column;

            if (!column) return old;

            const newTasks = [...column.tasks, res.data];

            const newColumn: Column = {
              ...column,
              tasks: newTasks,
            };

            const newColumns = [...copyOld.columns];
            const columnIndex = newColumns.findIndex(c => c.id === columnId);
            newColumns[columnIndex] = newColumn;

            const newData: Board = {
              ...copyOld,
              columns: newColumns,
            };

            return newData;
          },
        ),
    }),
};
