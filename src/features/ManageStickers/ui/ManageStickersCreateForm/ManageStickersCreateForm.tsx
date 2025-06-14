import { Plus } from 'lucide-react';

import { Button, Form } from '@/shared/ui/c';

import { CreateOrUpdateStickerSchema } from '../../model';
import { ManageStickersBaseForm } from '../ManageStickersBaseForm/ManageStickersBaseForm';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import {
  Color,
  SELECTED_COLOR_BY_DEFAULT,
  stickerQueries,
} from '@/entities/Board';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';

interface Props {
  boardId: string;
}

export function ManageStickersCreateForm(props: Props) {
  const { boardId } = props;

  const [isCreatingMode, setIsCreatingMode] = useState(false);
  //to not to declare useForm & FormProvider inside Board Task
  const [selectedColor, setSelectedColor] = useState<Color>(
    SELECTED_COLOR_BY_DEFAULT,
  );

  const form = useForm<z.infer<typeof CreateOrUpdateStickerSchema>>({
    resolver: zodResolver(CreateOrUpdateStickerSchema),
  });

  const { mutateAsync: createSticker, isPending } = useMutation(
    stickerQueries.createSticker(),
  );

  const onSubmit = form.handleSubmit(data => {
    if (!selectedColor) return toast.error('Цвет не выбран!');

    createSticker({
      boardId,
      ...data,
      color: selectedColor,
    })
      .then(() => form.reset())
      .then(() => setIsCreatingMode(false))
      .catch(e => toast.error(getErrorMessage(e)));
  });

  return (
    <Form {...form}>
      {isCreatingMode ? (
        <ManageStickersBaseForm
          isLoading={isPending}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          onSubmit={onSubmit}
          onCancel={() => setIsCreatingMode(false)}
        />
      ) : (
        <Button
          type='button'
          size='sm'
          variant={null}
          className='w-fit'
          onClick={() => setIsCreatingMode(true)}
        >
          <Plus />
          <span>Добавить метку</span>
        </Button>
      )}
    </Form>
  );
}
