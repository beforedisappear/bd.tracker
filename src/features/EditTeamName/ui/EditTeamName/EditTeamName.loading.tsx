import { useDeviceType } from '@/shared/lib/deviceType/c';
import { Skeleton } from '@/shared/ui/s';

export function EditTeamNameLoading() {
  const { isMobile } = useDeviceType();

  if (isMobile)
    return (
      <div className='flex flex-col gap-2'>
        <span
          className='text-xl font-bold
          md:text-base'
        >
          Команда
        </span>
        <Skeleton className='min-h-7 h-7 w-full' />
      </div>
    );

  return <Skeleton className='min-h-7 h-7 w-60' />;
}
