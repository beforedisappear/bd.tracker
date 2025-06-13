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

  //TODO: add scroll area
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-[10px] font-medium uppercase text-muted-foreground'>
        Метки задачи
      </span>

      <FilterTasksByStickerForm data={data} />
    </div>
  );
}
