import { Skeleton } from '@/shared/ui/s';
import { EditTeamNameLabel } from '../EditTeamNameLabel/EditTeamNameLabel';

import { useDeviceType } from '@/shared/lib/deviceType/c';

export function EditTeamNameLoading() {
  const { isMobile } = useDeviceType();

  if (isMobile)
    return (
      <div className='flex flex-col gap-2'>
        <EditTeamNameLabel label='Команда' />
        <Skeleton className='min-h-7 h-7 w-full' />
      </div>
    );

  return <Skeleton className='min-h-7 h-7 w-60' />;
}
