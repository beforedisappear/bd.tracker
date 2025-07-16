import { queryClient } from '@/shared/config/query';
import { queryOptions, type Query } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstack-query';

import { getAllBoards } from './board/getAllBoards';
import { getBoardById } from './board/getBoardById';
import { createBoard } from './board/createBoard';
import { renameBoard } from './board/renameBoard';
import { deleteBoard } from './board/deleteBoard';

import { createColumn } from './column/createColumn';
import { deleteColumn } from './column/deleteColumn';
import { moveColumn } from './column/moveColumn';
import { renameColumn } from './column/renameColumn';

import { getTaskById } from './task/getTaskById';
import { createTask } from './task/createTask';
import { moveTask } from './task/moveTask';
import { updateTask } from './task/updateTask';
import { deleteTask } from './task/deleteTask';

import { getAllBoardStickers } from './sticker/getAllBoardStickers';
import { createBoardSticker } from './sticker/createBoardSticker';
import { updateBoardSticker } from './sticker/updateBoardSticker';
import { deleteBoardSticker } from './sticker/deleteBoardSticker';

import {
  createBoardQueryUpdater,
  renameBoardQueryUpdater,
  deleteBoardQueryUpdater,
} from '../model/queryUpdaters/board';

import {
  createColumnQueryUpdater,
  deleteColumnQueryUpdater,
  moveColumnQueryUpdater,
  renameColumnQueryUpdater,
} from '../model/queryUpdaters/column';

import {
  createTaskQueryUpdater,
  deleteTaskQueryUpdater,
  moveTaskQueryUpdater,
  updateTaskQueryUpdater,
} from '../model/queryUpdaters/task';

import {
  createStickerQueryUpdater,
  deleteStickerOnBoardQueryUpdater,
  updateStickerOnBoardQueryUpdater,
  updateStickerQueryUpdater,
} from '../model/queryUpdaters/sticker';

import type {
  GetAllBoardsDtoReq,
  GetBoardByIdDtoReq,
  GetTaskByIdDtoReq,
  GetAllBoardStickersDtoReq,
  BoardByIdParams,
  Sticker,
} from '../model/types';

export const boardQueries = {
  allBoards: (projectId: string) => ['boards', projectId],

  boardById: (
    boardId: string,
    dto: Omit<GetBoardByIdDtoReq, 'boardId'> = {},
  ) => {
    const { colors, assigneeIds, dateRange, stickerIds } = dto;

    const params: BoardByIdParams = {
      ...(colors && { colors: JSON.stringify(colors) }),
      ...(assigneeIds && { assigneeIds: JSON.stringify(assigneeIds) }),
      ...(stickerIds && { stickerIds: JSON.stringify(stickerIds) }),
      ...(dateRange && {
        dateRange: `${dateRange.from}-${dateRange.to}`,
      }),
    };

    return [
      'board',
      boardId,
      ...(Object.keys(params).length > 0 ? [params] : []),
    ];
  },

  findBoardQueryKey: (boardId: string) => ({
    predicate: ({ queryKey }: Query) => {
      const boardQk = boardQueries.boardById(boardId);

      return queryKey[0] === boardQk[0] && queryKey[1] === boardQk[1];
    },
  }),

  getAllBoards: (dto: GetAllBoardsDtoReq) =>
    queryOptions({
      queryKey: [...boardQueries.allBoards(dto.projectId)],
      queryFn: () => getAllBoards(dto),
    }),

  getBoardById: (dto: GetBoardByIdDtoReq) => {
    const { boardId } = dto;

    return queryOptions({
      queryKey: [...boardQueries.boardById(boardId, dto)],
      queryFn: () => getBoardById(dto),
      placeholderData: data => data,
    });
  },

  createBoard: () =>
    mutationOptions({
      mutationFn: createBoard,
      onSuccess: (res, args) => {
        const { projectId } = args;

        const queryKey = [...boardQueries.allBoards(projectId)];

        queryClient.setQueryData(queryKey, createBoardQueryUpdater(res));
      },
    }),

  deleteBoard: () =>
    mutationOptions({
      mutationFn: deleteBoard,
      onSuccess: (res, { projectId, boardId }) => {
        const queryKey = [...boardQueries.allBoards(projectId)];

        queryClient.setQueryData(queryKey, deleteBoardQueryUpdater(res));

        queryClient.removeQueries({
          queryKey: [...boardQueries.boardById(boardId)],
          exact: false,
        });
      },
    }),

  renameBoard: () =>
    mutationOptions({
      mutationFn: renameBoard,
      onSuccess: (_, args) => {
        const { projectId } = args;

        const queryKey = [...boardQueries.allBoards(projectId)];

        queryClient.setQueryData(queryKey, renameBoardQueryUpdater(args));
      },
    }),
};

export const columnQueries = {
  createColumn: () =>
    mutationOptions({
      mutationFn: createColumn,
      onSuccess: (res, { boardId }) =>
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          createColumnQueryUpdater(res),
        ),
    }),

  renameColumn: () =>
    mutationOptions({
      mutationFn: renameColumn,
      onSuccess: (_, args) => {
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(args.boardId),
          renameColumnQueryUpdater(args),
        );
      },
    }),

  deleteColumn: () =>
    mutationOptions({
      mutationFn: deleteColumn,
      onSuccess: (res, { boardId }) =>
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          deleteColumnQueryUpdater(res),
        ),
    }),

  moveColumn: () =>
    mutationOptions({
      mutationFn: moveColumn,
      onSuccess: (res, { boardId }) => {
        if (res.isNormalized) {
          // обнуляем кеш после нормализации веса в БД
          queryClient.invalidateQueries({
            queryKey: [...boardQueries.boardById(boardId)],
            exact: false,
          });

          return;
        }

        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          moveColumnQueryUpdater(res),
        );
      },
    }),
};

export const taskQueries = {
  taskById: (taskId: string) => ['task', taskId],

  getTaskById: (dto: GetTaskByIdDtoReq) =>
    queryOptions({
      queryKey: [...taskQueries.taskById(dto.taskId)],
      queryFn: () => getTaskById(dto),
      placeholderData: data => data ?? undefined,
      select: res => res.data,
    }),

  createTask: () =>
    mutationOptions({
      mutationFn: createTask,
      onSuccess: (res, { boardId }) =>
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          createTaskQueryUpdater(res),
        ),
    }),

  deleteTask: () =>
    mutationOptions({
      mutationFn: deleteTask,
      onSuccess: (_, args) =>
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(args.boardId),
          deleteTaskQueryUpdater(args),
        ),
    }),

  moveTask: () =>
    mutationOptions({
      mutationFn: moveTask,
      onSuccess: (res, args) => {
        if (res.isNormalized) {
          // обнуляем кеш после нормализации веса в БД
          queryClient.invalidateQueries({
            queryKey: [...boardQueries.boardById(args.boardId)],
            exact: false,
          });

          return;
        }

        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(args.boardId),
          moveTaskQueryUpdater(res),
        );
      },
    }),

  updateTask: () =>
    mutationOptions({
      mutationFn: updateTask,
      onSuccess: (res, { boardId, taskId }) => {
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          updateTaskQueryUpdater(res),
        );

        queryClient.invalidateQueries({
          queryKey: taskQueries.taskById(taskId),
        });
      },
    }),
};

export const stickerQueries = {
  allStickers: (boardId: string) => ['stickers', boardId],

  getBoardStickers: (dto: GetAllBoardStickersDtoReq) =>
    queryOptions({
      queryKey: [...stickerQueries.allStickers(dto.boardId)],
      queryFn: () => getAllBoardStickers(dto),
    }),

  createSticker: () =>
    mutationOptions({
      mutationFn: createBoardSticker,
      onSuccess: (res, { boardId }) =>
        queryClient.setQueriesData(
          { queryKey: [...stickerQueries.allStickers(boardId)] },
          createStickerQueryUpdater(res),
        ),
    }),

  updateSticker: () =>
    mutationOptions({
      mutationFn: updateBoardSticker,
      onSuccess: (res, { boardId }) => {
        queryClient.setQueriesData(
          { queryKey: [...stickerQueries.allStickers(boardId)] },
          updateStickerQueryUpdater(res),
        );

        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          updateStickerOnBoardQueryUpdater(res),
        );
      },
    }),

  deleteSticker: () =>
    mutationOptions({
      mutationFn: deleteBoardSticker,
      onMutate: async ({ boardId, id }) => {
        const queryKey = [...stickerQueries.allStickers(boardId)];

        await queryClient.cancelQueries({
          queryKey,
        });

        const previousStickers = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (old: Sticker[]) => {
          return old.filter(sticker => sticker.id !== id);
        });

        return { previousStickers };
      },
      onError: (_err, { boardId }, context) => {
        if (!context?.previousStickers) return;

        const queryKey = [...stickerQueries.allStickers(boardId)];

        queryClient.setQueryData(queryKey, context.previousStickers);
      },
      onSuccess: (_, args) => {
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(args.boardId),
          deleteStickerOnBoardQueryUpdater(args),
        );
      },
    }),
};
