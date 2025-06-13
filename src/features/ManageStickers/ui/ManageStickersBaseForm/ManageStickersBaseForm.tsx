import { Check, Loader2, X } from 'lucide-react';

import { BoardColorInput, type Color } from '@/entities/Board';
import { Button, Input } from '@/shared/ui/c';

import type { MouseEvent } from 'react';

interface Props {
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  selectedColor: Color | null;
  setSelectedColor: (color: Color) => void;
}

export function ManageStickersBaseForm(props: Props) {
  const { isLoading, selectedColor, setSelectedColor, onSubmit, onCancel } =
    props;

  const onSelectColor = (_: MouseEvent<HTMLButtonElement>, color: Color) => {
    setSelectedColor(color);
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
      <div className='flex items-start gap-2'>
        <Input
          name='name'
          className='w-72'
          inputClassName='text-sm h-8'
          disabled={isLoading}
        />

        <Button
          type='submit'
          variant='ghost'
          className='size-8 p-0'
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className='animate-spin' /> : <Check />}
        </Button>

        <Button
          type='submit'
          variant='ghost'
          className='size-8 p-0'
          onClick={onCancel}
          disabled={isLoading}
        >
          <X />
        </Button>
      </div>

      <BoardColorInput currentColor={selectedColor} onSelect={onSelectColor} />
    </form>
  );
}
