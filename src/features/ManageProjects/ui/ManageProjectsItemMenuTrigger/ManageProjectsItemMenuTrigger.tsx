import { EllipsisVertical } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';
import type { MouseEvent } from 'react';

interface Props extends ButtonProps {}

export function ManageProjectsItemMenuTrigger(props: Props) {
  const { onClick } = props;

  const onCustomClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <Button
      variant={null}
      size='icon'
      className='w-6 h-6 justify-end'
      onClick={onCustomClick}
      {...props}
    >
      <EllipsisVertical className='w-4 h-4' />
    </Button>
  );
}
