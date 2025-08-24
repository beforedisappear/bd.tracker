import { Skeleton } from '@/shared/ui/s';

export function FilterTasksByColorContentLoading() {
  return <Skeleton className='absolute top-0 left-0 w-full h-full flex-grow' />;
}
