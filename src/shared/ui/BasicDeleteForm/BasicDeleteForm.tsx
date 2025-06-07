import { Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib/css';

import { Button } from '../Button/Button';

interface Props {
  className?: string;
  onClose?: () => void;
  onDelete?: () => void;
  isPending?: boolean;
  isDesktop?: boolean;
  isMobile?: boolean;
}

export function BasicDeleteForm(props: Props) {
  const { className, onClose, onDelete, isPending, isDesktop, isMobile } =
    props;

  return (
    <div
      className={cn(
        'flex gap-2',
        {
          'justify-end  mt-auto': isDesktop,
          'mt-4': isMobile,
        },
        className,
      )}
    >
      {isDesktop && (
        <Button onClick={onClose} variant='outline'>
          Отмена
        </Button>
      )}

      <Button
        type='submit'
        variant='destructive'
        className={cn({
          'w-28': isDesktop,
          'w-full': isMobile,
        })}
        disabled={isPending}
        onClick={onDelete}
      >
        {isPending ? (
          <Loader2 className='w-4 h-4 animate-spin' />
        ) : (
          <span>Удалить</span>
        )}
      </Button>
    </div>
  );
}
