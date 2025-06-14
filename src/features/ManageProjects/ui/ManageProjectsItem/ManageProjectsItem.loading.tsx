import { Skeleton } from '@/shared/ui/s';

import { getManageProjectsItemClassName } from '../../constants';

export function ManageProjectsItemLoading() {
  return <Skeleton className={getManageProjectsItemClassName()} />;
}
