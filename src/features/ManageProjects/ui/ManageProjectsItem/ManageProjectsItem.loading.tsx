import { Skeleton } from '@/shared/ui/s';

import { getManageProjectsItemClassName } from '../../config';

export function ManageProjectsItemLoading() {
  return <Skeleton className={getManageProjectsItemClassName()} />;
}
