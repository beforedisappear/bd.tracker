import { Popover } from '@/shared/ui/c';
import { FilterTasksByStickerTrigger } from '../FilterTasksByStickerTrigger/FilterTasksByStickerTrigger';
import { FilterTasksByStickerContent } from '../FilterTasksByStickerContent';

export function FilterTasksBySticker() {
  return (
    <Popover
      trigger={<FilterTasksByStickerTrigger />}
      className='flex flex-col min-h-40 h-auto w-80 px-5'
    >
      <FilterTasksByStickerContent />
    </Popover>
  );
}
