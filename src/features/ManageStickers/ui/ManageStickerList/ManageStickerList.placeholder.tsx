import { StickyNote } from 'lucide-react';

export function ManageStickerListPlaceholder() {
  return (
    <div className='flex items-center gap-3 py-3 px-4 text-gray-500'>
      <StickyNote className='w-5 h-5' />
      <span>Метки отсутствуют</span>
    </div>
  );
}
