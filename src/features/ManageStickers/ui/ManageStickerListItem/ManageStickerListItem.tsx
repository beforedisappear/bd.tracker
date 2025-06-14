import { BoardSticker, stickerQueries, type Sticker } from '@/entities/Board';
import { getErrorMessage } from '@/shared/lib/error';
import { Button } from '@/shared/ui/c';
import { useMutation } from '@tanstack/react-query';
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ManageStickerUpdateForm } from '../ManageStickerUpdateForm/ManageStickerUpdateForm';

interface Props {
  boardId: string;
  data: Sticker;
}

export function ManageStickerListItem(props: Props) {
  const { data, boardId } = props;

  const [isEditing, setIsEditing] = useState(false);

  const { mutateAsync: deleteSticker } = useMutation(
    stickerQueries.deleteSticker(),
  );

  const onDeleteSticker = (id: string) => {
    // TODO: add optimistic update
    deleteSticker({ boardId, stickerId: id }).catch(e =>
      toast.error(getErrorMessage(e)),
    );
  };

  if (isEditing)
    return (
      <ManageStickerUpdateForm
        boardId={boardId}
        sticker={data}
        setIsEditing={setIsEditing}
      />
    );

  return (
    <div key={data.id} className='flex gap-2'>
      <BoardSticker data={data} />

      <div className='flex gap-0.5'>
        <Button
          type='button'
          variant='ghost'
          className='size-6 p-0'
          onClick={() => setIsEditing(true)}
        >
          <Pencil className='!size-3' />
        </Button>

        <Button
          type='button'
          variant='ghost'
          className='size-6 p-0'
          onClick={() => onDeleteSticker(data.id)}
        >
          <Trash className='!size-3' />
        </Button>
      </div>
    </div>
  );
}
