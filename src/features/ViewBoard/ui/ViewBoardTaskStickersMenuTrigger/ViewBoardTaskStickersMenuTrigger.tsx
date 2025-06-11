import { Plus } from 'lucide-react';
import { Button, type ButtonProps } from '@/shared/ui/c';
import type { MouseEvent } from 'react';

interface Props extends ButtonProps {}

export function ViewBoardTaskStickersMenuTrigger(props: Props) {
  const { onClick, ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <div className='flex gap-2'>
      <Button
        variant={null}
        size='sm'
        className='p-1 h-6 gap-1 border border-dashed border-primary/60 text-primary/60'
        onClick={handleClick}
        {...rest}
      >
        <Plus className='!h-3 !w-3' />
        <span className='text-[11px]'>Метка</span>
      </Button>
    </div>
  );
}
