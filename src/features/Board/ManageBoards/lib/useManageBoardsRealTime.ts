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
  const queryKey = boardQueries.allBoards(projectId);

  useBoardSubscription({
    queryKey,
    schema: BoardCreatedActionSchema,
    updater: res => createBoardQueryUpdater(res, projectId),
  });

  useBoardSubscription({
    queryKey,
    schema: BoardUpdatedActionSchema,
    updater: renameBoardQueryUpdater,
  });

  useBoardSubscription({
    queryKey,
    schema: BoardDeletedActionSchema,
    updater: deleteBoardQueryUpdater,
  });

  return null;
};
