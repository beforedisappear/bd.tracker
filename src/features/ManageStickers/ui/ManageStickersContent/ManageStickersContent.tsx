import { ManageStickerList } from '../ManageStickerList/ManageStickerList';

import { stickerQueries } from '@/entities/Board';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';
import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/shared/ui/s';
import { ErrorBoundary } from '@/shared/ui/c';

export function ManageStickersContent() {
  const boardId = usePrivateGlobalStore(state => state.currentBoardId);

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(stickerQueries.getBoardStickers({ boardId: boardId! }));

  if (isLoading) return <Skeleton className='w-full h-full flex-grow' />;
  else if (isError || !boardId)
    return <ErrorBoundary className='m-auto' error={error} reset={refetch} />;

  return <ManageStickerList boardId={boardId} data={data} />;
}
