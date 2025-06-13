import { FilterTasksByStickerContentLoading } from './FilterTasksByStickerContent.loading';

import { useProject } from '@/shared/lib/navigation';
import { useQuery } from '@tanstack/react-query';

import { stickerQueries } from '@/entities/Board';
import { ErrorBoundary } from '@/shared/ui/c';
import { FilterTasksByStickerForm } from '../FilterTasksByStickerForm/FilterTasksByStickerForm';

export function FilterTasksByStickerContent() {
  const { boardId } = useProject();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery(stickerQueries.getBoardStickers({ boardId }));

  if (isLoading) return <FilterTasksByStickerContentLoading />;
  else if (isError)
    return (
      <ErrorBoundary
        error={error}
        titleClassName='text-xs'
        descriptionClassName='text-xs'
      />
    );

  return <FilterTasksByStickerForm data={data} />;
}
