import { useQueryClient } from '@tanstack/react-query';
import {
  useBoardSubscription,
  boardQueries,
  taskQueries,
  stickerQueries,
  createColumnQueryUpdater,
  ColumnCreatedActionSchema,
  deleteColumnQueryUpdater,
  ColumnDeletedActionSchema,
  renameColumnQueryUpdater,
  ColumnUpdatedActionSchema,
  moveColumnQueryUpdater,
  ColumnMovedActionSchema,
  TaskCreatedActionSchema,
  createTaskQueryUpdater,
  TaskDeletedActionSchema,
  deleteTaskQueryUpdater,
  moveTaskQueryUpdater,
  TaskMovedActionSchema,
  updateTaskQueryUpdater,
  TaskUpdatedActionSchema,
  StickerDeletedActionSchema,
  StickerUpdatedActionSchema,
  StickerCreatedActionSchema,
  createStickerQueryUpdater,
  deleteStickerOnBoardQueryUpdater,
  updateStickerOnBoardQueryUpdater,
  deleteStickerQueryUpdater,
  updateStickerQueryUpdater,
} from '@/entities/Board';

const isNormalizedTypeGuard = (
  res: unknown,
): res is { isNormalized: boolean } =>
  typeof res === 'object' &&
  res !== null &&
  'isNormalized' in res &&
  typeof (res as { isNormalized: boolean }).isNormalized === 'boolean' &&
  (res as { isNormalized: boolean }).isNormalized;

export const useBoardRealTime = (boardId: string) => {
  const queryClient = useQueryClient();

  const boardQueryOptions = {
    queryKeyType: 'queryFilters' as const,
    queryKey: boardQueries.findBoardQueryKey(boardId),
  };

  useBoardSubscription({
    ...boardQueryOptions,
    schema: ColumnCreatedActionSchema,
    updater: createColumnQueryUpdater,
  });

  useBoardSubscription({
    ...boardQueryOptions,
    schema: ColumnDeletedActionSchema,
    updater: deleteColumnQueryUpdater,
  });

  useBoardSubscription({
    ...boardQueryOptions,
    schema: ColumnUpdatedActionSchema,
    updater: renameColumnQueryUpdater,
  });

  useBoardSubscription({
    ...boardQueryOptions,
    schema: ColumnMovedActionSchema,
    updater: res => {
      if (isNormalizedTypeGuard(res)) {
        // обнуляем кеш после нормализации веса в БД
        queryClient.invalidateQueries({
          queryKey: [...boardQueries.boardById(boardId)],
          exact: false,
        });
        return null;
      }

      return moveColumnQueryUpdater(res);
    },
  });

  useBoardSubscription({
    ...boardQueryOptions,
    schema: TaskCreatedActionSchema,
    updater: createTaskQueryUpdater,
  });

  useBoardSubscription({
    ...boardQueryOptions,
    schema: TaskDeletedActionSchema,
    updater: deleteTaskQueryUpdater,
  });

  useBoardSubscription({
    ...boardQueryOptions,
    schema: TaskMovedActionSchema,
    updater: res => {
      if (isNormalizedTypeGuard(res)) {
        // обнуляем кеш после нормализации веса в БД
        queryClient.invalidateQueries({
          queryKey: [...boardQueries.boardById(boardId)],
          exact: false,
        });
        return null;
      }

      return moveTaskQueryUpdater(res);
    },
  });

  useBoardSubscription({
    ...boardQueryOptions,
    schema: TaskUpdatedActionSchema,
    updater: updateTaskQueryUpdater,
    onComplete: (taskId: string) =>
      queryClient.invalidateQueries({
        queryKey: taskQueries.taskById(taskId),
      }),
  });

  useBoardSubscription({
    ...boardQueryOptions,
    schema: StickerDeletedActionSchema,
    updater: deleteStickerOnBoardQueryUpdater,
  });

  useBoardSubscription({
    ...boardQueryOptions,
    schema: StickerUpdatedActionSchema,
    updater: updateStickerOnBoardQueryUpdater,
  });

  const stickerQueryOptions = {
    queryKeyType: 'queryKey' as const,
    queryKey: stickerQueries.allStickers(boardId),
  };

  useBoardSubscription({
    ...stickerQueryOptions,
    schema: StickerCreatedActionSchema,
    updater: createStickerQueryUpdater,
  });

  useBoardSubscription({
    ...stickerQueryOptions,
    schema: StickerDeletedActionSchema,
    updater: deleteStickerQueryUpdater,
  });

  useBoardSubscription({
    ...stickerQueryOptions,
    schema: StickerUpdatedActionSchema,
    updater: updateStickerQueryUpdater,
  });

  return null;
};
