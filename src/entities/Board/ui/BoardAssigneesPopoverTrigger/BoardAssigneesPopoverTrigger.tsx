import { UserIcon } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';
import { Avatar } from '@/shared/ui/s';

import type { MouseEvent } from 'react';
import type { Task } from '@/entities/Board';

interface Props extends ButtonProps {
  assignees: Task['assignees'];
}

export function BoardAssigneesPopoverTrigger(props: Props) {
  const { onClick, assignees, ...rest } = props;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  if (assignees.length > 0)
    return (
      <div className='flex justify-end min-w-14'>
        <Button
          variant={null}
          className='h-6 p-0 gap-0'
          onClick={handleClick}
          {...rest}
        >
          {assignees.slice(0, 3).map(user => (
            <Avatar
              key={user.id}
              src=''
              alt={user.name}
              initials={user.name}
              className='grid place-content-center h-6 w-6 text-xs ml-[-10px] border-2 border-muted'
            />
          ))}
        </Button>
      </div>
    );

  return (
    <Button
      variant={null}
      size='sm'
      className='p-1 size-6 gap-1 border border-dashed border-primary/60 text-primary/60'
      onClick={handleClick}
      {...rest}
    >
      <UserIcon className='!size-3.5' />
    </Button>
  );
}
