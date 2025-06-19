import { cn } from '@/shared/lib/css';
import type { InputHTMLAttributes, RefObject } from 'react';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'readOnly'> {
  isEditing: boolean;
  ref?: RefObject<HTMLInputElement | null>;
}

export function RenameInput(props: Props) {
  const { isEditing, className, ref, ...rest } = props;

  return (
    <input
      className={cn(
        'text-sm font-medium text-left border-none outline-none bg-transparent w-full cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap',
        { 'cursor-text': isEditing },
        className,
      )}
      readOnly={!isEditing}
      ref={ref}
      {...rest}
    />
  );
}
