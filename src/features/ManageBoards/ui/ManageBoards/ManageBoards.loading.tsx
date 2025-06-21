import { Skeleton } from '@/shared/ui/s';

export function ManageBoardsLoading() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Skeleton key={idx} className='h-full w-full max-w-20 rounded-b-none' />
      ))}
    </>
  );
}
