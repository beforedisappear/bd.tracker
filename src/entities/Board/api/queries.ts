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
import { renameColumn } from './column/renameColumn';

import { createTask } from './task/createTask';
import { moveTask } from './task/moveTask';
import { deleteTask } from './task/deleteTask';
import { updateTask } from './task/updateTask';
import { getTaskById } from './task/getTaskById';

import type {
  Column,
  Board,
  GetAllBoardsDtoReq,
  CreateBoardDtoReq,
  DeleteBoardDtoReq,
  GetBoardByIdDtoReq,
  CreateColumnDtoReq,
  DeleteColumnDtoReq,
  CreateTaskDtoReq,
  MoveColumnDtoReq,
  GetBoardByIdDtoRes,
  MoveTaskDtoReq,
  DeleteTaskDtoReq,
  RenameColumnDtoReq,
  UpdateTaskDtoReq,
  GetTaskByIdDtoReq,
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

  getBoardById: (dto: GetBoardByIdDtoReq) => {
    const { boardId } = dto;

    return queryOptions({
      queryKey: [...boardQueries.boardById(boardId)],
      queryFn: () => getBoardById(dto),
      placeholderData: data => data,
    });
  },

  deleteBoard: () =>
    mutationOptions({
      mutationFn: (dto: DeleteBoardDtoReq) => deleteBoard(dto),
      onSuccess: (_, { projectId, boardId }) => {
        queryClient.invalidateQueries({
          queryKey: [...boardQueries.all(projectId)],
        });

        queryClient.removeQueries({
          queryKey: [...boardQueries.boardById(boardId)],
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

  renameColumn: () =>
    mutationOptions({
      mutationFn: (dto: RenameColumnDtoReq) => renameColumn(dto),
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
  taskById: (taskId: string) => ['task', taskId],

  getTaskById: (dto: GetTaskByIdDtoReq) =>
    queryOptions({
      queryKey: [...taskQueries.taskById(dto.taskId)],
      queryFn: () => getTaskById(dto),
      select: res => res.data,
    }),

  createTask: () =>
    mutationOptions({
      mutationFn: (dto: CreateTaskDtoReq) => createTask(dto),
      onSuccess: (res, { boardId, columnId }) =>
        queryClient.setQueryData(
          [...boardQueries.boardById(boardId)],
          (old: GetBoardByIdDtoRes) => {
            const column = old.columns.find(c => c.id === columnId) as Column;

            if (!column) return old;

            const lastTask = column.tasks.find(task => !task.nextTaskId);

            if (lastTask) {
              //обновляем nextTaskId у последнего таски в колонке если она существует
              lastTask.nextTaskId = res.data.id;
            }

            const newTasks = [...column.tasks, res.data];

            const newColumn: Column = {
              ...column,
              tasks: newTasks,
            };

            const newColumns = [...old.columns];
            const columnIndex = newColumns.findIndex(c => c.id === columnId);
            newColumns[columnIndex] = newColumn;

            const newData: Board = {
              ...old,
              columns: newColumns,
            };

            return newData;
          },
        ),
    }),

  deleteTask: () =>
    mutationOptions({
      mutationFn: (dto: DeleteTaskDtoReq) => deleteTask(dto),
      // TODO: add cache handling
      onSuccess: (_, { boardId }) =>
        queryClient.invalidateQueries({
          queryKey: [...boardQueries.boardById(boardId)],
        }),
    }),

  moveTask: () =>
    mutationOptions({
      mutationFn: (dto: MoveTaskDtoReq) => moveTask(dto),
      onSuccess: (_, { boardId }) =>
        //TODO: add cache handling
        queryClient.invalidateQueries({
          queryKey: [...boardQueries.boardById(boardId)],
        }),
    }),

  updateTask: () =>
    mutationOptions({
      mutationFn: (dto: UpdateTaskDtoReq) => updateTask(dto),
      onSuccess: (res, { boardId }) =>
        queryClient.setQueryData(
          [...boardQueries.boardById(boardId)],
          (old: GetBoardByIdDtoRes) => {
            const newColumns = old.columns.map(column => ({
              ...column,
              tasks: column.tasks.map(task =>
                task.id === res.data.id ? res.data : task,
              ),
            }));

            return {
              ...old,
              columns: newColumns,
            };
          },
        ),
    }),
};
