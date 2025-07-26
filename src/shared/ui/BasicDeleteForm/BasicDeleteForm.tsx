import { Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib/css';

import { Button } from '../Button/Button';

interface Props {
  className?: string;
  onClose?: () => void;
  onDelete?: () => void;
  isPending?: boolean;
}

export function BasicDeleteForm(props: Props) {
  const { className, onClose, onDelete, isPending } = props;

  return (
    <div
      className={cn(
        `flex gap-2 
        desktop:justify-end desktop:mt-auto 
        mobile:mt-4`,
        className,
      )}
    >
      <Button onClick={onClose} variant='outline' className='mobile:hidden'>
        Отмена
      </Button>

      <Button
        type='submit'
        variant='destructive'
        className='desktop:w-28 mobile:w-full'
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
