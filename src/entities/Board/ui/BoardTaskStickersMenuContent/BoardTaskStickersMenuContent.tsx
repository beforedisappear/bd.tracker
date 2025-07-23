'use client';

import { Form } from '@/shared/ui/Form';
import { BoardStickerInput, taskQueries, type Sticker } from '@/entities/Board';

import { useProject } from '@/shared/lib/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';

import type { CheckedState } from '@radix-ui/react-checkbox';
interface Props {
  taskId: string;
  stickers: Sticker[];
}

export function BoardTaskStickersMenuContent(props: Props) {
  const { stickers, taskId } = props;

  const { boardId } = useProject();

  const form = useForm({
    defaultValues: {
      stickerIds: Object.fromEntries(stickers.map(el => [el.id, true])),
    },
  });

  const { mutateAsync: updateTask } = useMutation(taskQueries.updateTask());

  const onCheckedChange = (value: CheckedState, stickerId: string) => {
    const newStickerIds = [...stickers.map(el => el.id)];

    if (value) newStickerIds.push(stickerId);
    else newStickerIds.splice(newStickerIds.indexOf(stickerId), 1);

    updateTask({ boardId, taskId, stickerIds: newStickerIds })
      .then(() => {})
      .catch(e => toast.error(getErrorMessage(e)));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={e => e.preventDefault()}
        className='flex flex-col h-full flex-grow'
      >
        <BoardStickerInput
          boardId={boardId}
          onCheckedChange={onCheckedChange}
        />
      </form>
    </Form>
  );
}
