import { StickyNote } from 'lucide-react';

export function BoardStickerFieldContentPlaceholder() {
  return (
    <div className='flex items-center gap-3 m-auto text-gray-400 justify-center select-none'>
      <StickyNote className='w-5 h-5' />
      <span>Метки отсутствуют</span>
    </div>
  );
}
