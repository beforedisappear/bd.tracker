import { UserIcon } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

import type { MouseEvent } from 'react';

interface Props extends ButtonProps {}

export function ViewBoardAssigneesPopoverTrigger(props: Props) {
  const { onClick, ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <Button
      variant={null}
      size='sm'
      className='p-1 h-6 gap-1 border border-dashed border-primary/60 text-primary/60'
      onClick={handleClick}
      {...rest}
    >
      <UserIcon />
    </Button>
  );
}
