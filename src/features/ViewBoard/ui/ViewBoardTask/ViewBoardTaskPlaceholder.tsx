import { cn } from '@/shared/lib/css';
import { getTaskClassName } from '../../lib/getTaskClassName';

export function ViewBoardTaskPlaceholder() {
  return <div className={cn(getTaskClassName(), 'border border-dashed')}></div>;
}
