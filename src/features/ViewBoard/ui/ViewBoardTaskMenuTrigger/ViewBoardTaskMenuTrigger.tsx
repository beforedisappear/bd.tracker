import { MoreVerticalIcon } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

import type { MouseEvent } from 'react';

interface Props extends ButtonProps {}

export function ViewBoardTaskMenuTrigger(props: Props) {
  const { onClick, ...restProps } = props;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <Button
      variant='ghost'
      className='h-6 w-6 p-0'
      onClick={handleClick}
      {...restProps}
    >
      <MoreVerticalIcon className='size-4' />
    </Button>
  );
}
