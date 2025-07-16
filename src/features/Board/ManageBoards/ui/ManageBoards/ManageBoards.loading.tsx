import { Skeleton } from '@/shared/ui/s';

export function ManageBoardsLoading() {
  return (
    <div className='flex h-full w-full gap-2'>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Skeleton key={idx} className='h-full w-full max-w-20 rounded-b-none' />
      ))}
    </div>
  );
}
