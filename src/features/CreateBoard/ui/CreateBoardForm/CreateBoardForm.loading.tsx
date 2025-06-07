import { Skeleton } from '@/shared/ui/s';

import { useDeviceType } from '@/shared/lib/deviceType/c';
import { cn } from '@/shared/lib/css';

export function CreateBoardFormLoading() {
  const { isMobile } = useDeviceType();

  return <Skeleton className={cn('h-full', { 'mx-4': isMobile })} />;
}
