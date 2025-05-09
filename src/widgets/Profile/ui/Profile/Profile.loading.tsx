import { Skeleton } from '@/shared/ui/s';
import { getProfileBlockClassName } from '../../config';

export function ProfileLoading() {
  return <Skeleton className={getProfileBlockClassName()} />;
}
