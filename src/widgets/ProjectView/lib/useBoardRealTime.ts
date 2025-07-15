import { useQueryClient } from '@tanstack/react-query';
import {
  useBoardSubscription,
  boardQueries,
  taskQueries,
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

  const queryOptions = {
    queryKeyType: 'queryFilters' as const,
    queryKey: boardQueries.findBoardQueryKey(boardId),
  };

  useBoardSubscription({
    ...queryOptions,
    schema: ColumnCreatedActionSchema,
    updater: createColumnQueryUpdater,
  });

  useBoardSubscription({
    ...queryOptions,
    schema: ColumnDeletedActionSchema,
    updater: deleteColumnQueryUpdater,
  });

  useBoardSubscription({
    ...queryOptions,
    schema: ColumnUpdatedActionSchema,
    updater: renameColumnQueryUpdater,
  });

  useBoardSubscription({
    ...queryOptions,
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
    ...queryOptions,
    schema: TaskCreatedActionSchema,
    updater: createTaskQueryUpdater,
  });

  useBoardSubscription({
    ...queryOptions,
    schema: TaskDeletedActionSchema,
    updater: deleteTaskQueryUpdater,
  });

  useBoardSubscription({
    ...queryOptions,
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
    ...queryOptions,
    schema: TaskUpdatedActionSchema,
    updater: updateTaskQueryUpdater,
    onComplete: (taskId: string) =>
      queryClient.invalidateQueries({
        queryKey: taskQueries.taskById(taskId),
      }),
  });

  return null;
};
