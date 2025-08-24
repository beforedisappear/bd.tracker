import { queryClient } from '@/shared/config/query';
import { queryOptions, type Query } from '@tanstack/react-query';
import { mutationOptions } from '@/shared/lib/tanstackQuery';

import { getAllBoardsRequest } from './board/getAllBoards';
import { getBoardByIdRequest } from './board/getBoardById';
import { createBoardRequest } from './board/createBoard';
import { renameBoardRequest } from './board/renameBoard';
import { deleteBoardRequest } from './board/deleteBoard';

import { createColumnRequest } from './column/createColumn';
import { deleteColumnRequest } from './column/deleteColumn';
import { moveColumnRequest } from './column/moveColumn';
import { renameColumnRequest } from './column/renameColumn';

import { getTaskByIdRequest } from './task/getTaskById';
import { createTaskRequest } from './task/createTask';
import { moveTaskRequest } from './task/moveTask';
import { updateTaskRequest } from './task/updateTask';
import { deleteTaskRequest } from './task/deleteTask';

import { getAllBoardStickersRequest } from './sticker/getAllBoardStickers';
import { createBoardStickerRequest } from './sticker/createBoardSticker';
import { updateBoardStickerRequest } from './sticker/updateBoardSticker';
import { deleteBoardStickerRequest } from './sticker/deleteBoardSticker';

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

export namespace boardQueries {
  export const allBoards = (projectId: string) => ['boards', projectId];

  export const boardById = (
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
  };

  export const findBoardQueryKey = (boardId: string) => ({
    predicate: ({ queryKey }: Query) => {
      const boardQk = boardQueries.boardById(boardId);

      return queryKey[0] === boardQk[0] && queryKey[1] === boardQk[1];
    },
  });

  export const getAllBoards = (dto: GetAllBoardsDtoReq) =>
    queryOptions({
      queryKey: [...boardQueries.allBoards(dto.projectId)],
      queryFn: () => getAllBoardsRequest(dto),
    });

  export const getBoardById = (dto: GetBoardByIdDtoReq) => {
    const { boardId } = dto;

    return queryOptions({
      queryKey: [...boardQueries.boardById(boardId, dto)],
      queryFn: () => getBoardByIdRequest(dto),
      placeholderData: data => data,
    });
  };

  export const createBoard = () =>
    mutationOptions({
      mutationFn: createBoardRequest,
      onSuccess: (res, args) => {
        const { projectId } = args;

        const queryKey = [...boardQueries.allBoards(projectId)];

        queryClient.setQueryData(queryKey, createBoardQueryUpdater(res));
      },
    });

  export const deleteBoard = () =>
    mutationOptions({
      mutationFn: deleteBoardRequest,
      onSuccess: (res, { projectId, boardId }) => {
        const queryKey = [...boardQueries.allBoards(projectId)];

        queryClient.setQueryData(queryKey, deleteBoardQueryUpdater(res));

        queryClient.removeQueries({
          queryKey: [...boardQueries.boardById(boardId)],
          exact: false,
        });
      },
    });

  export const renameBoard = () =>
    mutationOptions({
      mutationFn: renameBoardRequest,
      onSuccess: (_, args) => {
        const { projectId } = args;

        const queryKey = [...boardQueries.allBoards(projectId)];

        queryClient.setQueryData(queryKey, renameBoardQueryUpdater(args));
      },
    });
}

export namespace columnQueries {
  export const createColumn = () =>
    mutationOptions({
      mutationFn: createColumnRequest,
      onSuccess: (res, { boardId }) =>
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          createColumnQueryUpdater(res),
        ),
    });

  export const renameColumn = () =>
    mutationOptions({
      mutationFn: renameColumnRequest,
      onSuccess: (_, args) => {
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(args.boardId),
          renameColumnQueryUpdater(args),
        );
      },
    });

  export const deleteColumn = () =>
    mutationOptions({
      mutationFn: deleteColumnRequest,
      onSuccess: (res, { boardId }) =>
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          deleteColumnQueryUpdater(res),
        ),
    });

  export const moveColumn = () =>
    mutationOptions({
      mutationFn: moveColumnRequest,
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
    });
}

export namespace taskQueries {
  export const taskById = (taskId: string) => ['task', taskId];

  export const getTaskById = (dto: GetTaskByIdDtoReq) =>
    queryOptions({
      queryKey: [...taskQueries.taskById(dto.taskId)],
      queryFn: () => getTaskByIdRequest(dto),
      placeholderData: data => data ?? undefined,
      select: res => res.data,
    });

  export const createTask = () =>
    mutationOptions({
      mutationFn: createTaskRequest,
      onSuccess: (res, { boardId }) =>
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          createTaskQueryUpdater(res),
        ),
    });

  export const deleteTask = () =>
    mutationOptions({
      mutationFn: deleteTaskRequest,
      onSuccess: (_, args) =>
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(args.boardId),
          deleteTaskQueryUpdater(args),
        ),
    });

  export const moveTask = () =>
    mutationOptions({
      mutationFn: moveTaskRequest,
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
    });

  export const updateTask = () =>
    mutationOptions({
      mutationFn: updateTaskRequest,
      onSuccess: (res, { boardId, taskId }) => {
        queryClient.setQueriesData(
          boardQueries.findBoardQueryKey(boardId),
          updateTaskQueryUpdater(res),
        );

        queryClient.invalidateQueries({
          queryKey: taskQueries.taskById(taskId),
        });
      },
    });
}

export namespace stickerQueries {
  export const allStickers = (boardId: string) => ['stickers', boardId];

  export const getBoardStickers = (dto: GetAllBoardStickersDtoReq) =>
    queryOptions({
      queryKey: [...stickerQueries.allStickers(dto.boardId)],
      queryFn: () => getAllBoardStickersRequest(dto),
    });

  export const createSticker = () =>
    mutationOptions({
      mutationFn: createBoardStickerRequest,
      onSuccess: (res, { boardId }) =>
        queryClient.setQueriesData(
          { queryKey: [...stickerQueries.allStickers(boardId)] },
          createStickerQueryUpdater(res),
        ),
    });

  export const updateSticker = () =>
    mutationOptions({
      mutationFn: updateBoardStickerRequest,
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
    });

  export const deleteSticker = () =>
    mutationOptions({
      mutationFn: deleteBoardStickerRequest,
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
    });
}
