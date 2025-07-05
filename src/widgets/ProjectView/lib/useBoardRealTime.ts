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

export const useBoardRealTime = (boardId: string) => {
  const queryClient = useQueryClient();
  const queryKey = boardQueries.boardById(boardId);

  useBoardSubscription({
    queryKey,
    schema: ColumnCreatedActionSchema,
    updater: createColumnQueryUpdater,
  });

  useBoardSubscription({
    queryKey,
    schema: ColumnDeletedActionSchema,
    updater: deleteColumnQueryUpdater,
  });

  useBoardSubscription({
    queryKey,
    schema: ColumnUpdatedActionSchema,
    updater: renameColumnQueryUpdater,
  });

  useBoardSubscription({
    queryKey,
    schema: ColumnMovedActionSchema,
    updater: moveColumnQueryUpdater,
  });

  useBoardSubscription({
    queryKey,
    schema: TaskCreatedActionSchema,
    updater: createTaskQueryUpdater,
  });

  useBoardSubscription({
    queryKey,
    schema: TaskDeletedActionSchema,
    updater: deleteTaskQueryUpdater,
  });

  useBoardSubscription({
    queryKey,
    schema: TaskMovedActionSchema,
    updater: moveTaskQueryUpdater,
  });

  useBoardSubscription({
    queryKey,
    schema: TaskUpdatedActionSchema,
    updater: updateTaskQueryUpdater,
    onComplete: (taskId: string) => {
      queryClient.invalidateQueries({
        queryKey: taskQueries.taskById(taskId),
      });
    },
  });

  return null;
};
