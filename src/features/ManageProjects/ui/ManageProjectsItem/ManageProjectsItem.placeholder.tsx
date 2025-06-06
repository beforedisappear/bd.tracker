import { cn } from '@/shared/lib/css';
import { getManageProjectsItemClassName } from '../../constants';

export function ManageProjectsItemPlaceholder() {
  return (
    <div
      className={cn(
        getManageProjectsItemClassName(),
        'border border-card-foreground opacity-30 border-dashed',
      )}
    />
  );
}
