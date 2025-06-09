import { Popover } from '@/shared/ui/c';
import { FilterTasksByAssignedTrigger } from '../FilterTasksByAssignedTrigger/FilterTasksByAssignedTrigger';

export function FilterTasksByAssigned() {
  return <Popover trigger={<FilterTasksByAssignedTrigger />}>123</Popover>;
}
