import { type Sticker } from '@/entities/Board';

import { ManageStickersCreateForm } from '../ManageStickersCreateForm/ManageStickersCreateForm';
import { ManageStickerListItem } from '../ManageStickerListItem/ManageStickerListItem';
import { ManageStickerListPlaceholder } from './ManageStickerList.placeholder';

interface Props {
  boardId?: string | null;
  data?: Sticker[];
}

export function ManageStickerList(props: Props) {
  const { boardId, data } = props;

  if (!data || !boardId) return null;

  return (
    <div className='flex flex-col gap-2'>
      {data.map(el => (
        <ManageStickerListItem key={el.id} boardId={boardId} data={el} />
      ))}

      {data.length === 0 && <ManageStickerListPlaceholder />}

      <ManageStickersCreateForm boardId={boardId} />
    </div>
  );
}
