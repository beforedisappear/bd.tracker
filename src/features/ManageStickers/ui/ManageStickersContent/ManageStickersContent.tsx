import { stickerQueries } from '@/entities/Board';

import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/shared/ui/s';
import { ErrorBoundary, Slot } from '@/shared/ui/c';

interface Props {
  children: React.ReactNode;
  boardId?: string | null;
}

export function ManageStickersContent(props: Props) {
  const { children, boardId } = props;

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

  return <Slot data={data}>{children}</Slot>;
}
