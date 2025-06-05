import { Skeleton } from '@/shared/ui/s';

import { cn } from '@/shared/lib/css';
import { getColumnClassName } from '../../lib/getColumnClassName';

export function ViewBoardColumnLoading() {
  return <Skeleton className={cn('w-80', getColumnClassName())} />;
}
