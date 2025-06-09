import { Popover } from '@/shared/ui/c';
import { FilterTasksByStickerTrigger } from '../FilterTasksByStickerTrigger/FilterTasksByStickerTrigger';

export function FilterTasksBySticker() {
  return <Popover trigger={<FilterTasksByStickerTrigger />}></Popover>;
}
