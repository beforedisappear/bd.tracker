import {
  renameBoardQueryUpdater,
  BoardUpdatedActionSchema,
  BoardCreatedActionSchema,
  createBoardQueryUpdater,
  useBoardSubscription,
  boardQueries,
  BoardDeletedActionSchema,
  deleteBoardQueryUpdater,
} from '@/entities/Board';

export const useManageBoardsRealTime = (projectId: string) => {
  const queryOptions = {
    queryKey: boardQueries.allBoards(projectId),
    queryKeyType: 'queryKey' as const,
  };

  useBoardSubscription({
    ...queryOptions,
    schema: BoardCreatedActionSchema,
    updater: res => createBoardQueryUpdater(res, projectId),
  });

  useBoardSubscription({
    ...queryOptions,
    schema: BoardUpdatedActionSchema,
    updater: renameBoardQueryUpdater,
  });

  useBoardSubscription({
    ...queryOptions,
    schema: BoardDeletedActionSchema,
    updater: deleteBoardQueryUpdater,
  });

  return null;
};
