import { Form } from '@/shared/ui/c';
import { ManageStickersBaseForm } from '../ManageStickersBaseForm/ManageStickersBaseForm';

import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

import { type Color, type Sticker, stickerQueries } from '@/entities/Board';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { CreateOrUpdateStickerSchema } from '../../model';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  boardId: string;
  sticker: Sticker;
  setIsEditing: (value: boolean) => void;
}

export function ManageStickerUpdateForm(props: Props) {
  const { boardId, sticker, setIsEditing } = props;

  //to not to declare useForm & FormProvider inside Board Task
  const [selectedColor, setSelectedColor] = useState<Color>(sticker.color);

  const form = useForm<z.infer<typeof CreateOrUpdateStickerSchema>>({
    resolver: zodResolver(CreateOrUpdateStickerSchema),
    defaultValues: { name: sticker.name },
  });

  const { mutateAsync: updateSticker, isPending } = useMutation(
    stickerQueries.updateSticker(),
  );

  const onSubmit = form.handleSubmit(data => {
    if (!selectedColor) return toast.error('Цвет не выбран!');

    updateSticker({
      boardId,
      id: sticker.id,
      ...data,
      color: selectedColor,
    })
      .then(() => form.reset())
      .then(() => setIsEditing(false))
      .catch(e => toast.error(getErrorMessage(e)));
  });

  return (
    <Form {...form}>
      <ManageStickersBaseForm
        onSubmit={onSubmit}
        isLoading={isPending}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        onCancel={() => setIsEditing(false)}
      />
    </Form>
  );
}
