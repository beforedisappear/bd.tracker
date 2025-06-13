import { Skeleton } from '@/shared/ui/s';

export function FilterTasksByStickerContentLoading() {
  return (
    <Skeleton className='absolute top-0 left-0 w-full h-full flex-1 mr-4' />
  );
}
