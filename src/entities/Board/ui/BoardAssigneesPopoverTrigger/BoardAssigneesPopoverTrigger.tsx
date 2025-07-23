import { UserIcon } from 'lucide-react';

import { cn } from '@/shared/lib/css';
import { Button, type ButtonProps } from '@/shared/ui/c';
import { Avatar } from '@/shared/ui/s';

import type { MouseEvent } from 'react';
import type { AssigneesPopoverTriggerDirection, Task } from '../../model/types';

interface Props extends ButtonProps {
  assignees: Task['assignees'];
  direction?: AssigneesPopoverTriggerDirection;
  avatarLimit?: number;
}

export function BoardAssigneesPopoverTrigger(props: Props) {
  const {
    onClick,
    assignees,
    direction = 'rightToLeft',
    avatarLimit = 3,
    ...rest
  } = props;

  const length = assignees.length;
  const isLeftToRight = direction === 'leftToRight';
  const isRightToLeft = direction === 'rightToLeft';

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  if (length > 0)
    return (
      <div
        className={cn('flex justify-end min-w-14', {
          'justify-start': isLeftToRight,
          'justify-end': isRightToLeft,
        })}
      >
        <Button
          variant={null}
          className='h-6 p-0 gap-0'
          onClick={handleClick}
          {...rest}
        >
          {assignees.slice(0, avatarLimit).map(user => (
            <Avatar
              key={user.id}
              src=''
              alt={user.name}
              initials={user.name}
              className={cn(
                'grid place-content-center h-6 w-6 text-xs border-2 border-muted',
                {
                  'mr-[-10px]': isLeftToRight && length > 1,
                  'ml-[-10px]': isRightToLeft && length > 1,
                },
              )}
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
