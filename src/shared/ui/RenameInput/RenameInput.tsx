'use client';

import { useRename } from './useRename';

import { cn } from '@/shared/lib/css';

import type { ZodSchema } from 'zod';
import {
  useCallback,
  useEffect,
  type InputHTMLAttributes,
  type RefObject,
} from 'react';
import type { RenameInputMethods } from './RenameInput.types';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'readOnly'> {
  initialName: string;
  schema: ZodSchema;
  methodsRef: RefObject<RenameInputMethods | null>;
  onRename: (name: string) => void;
}

export function RenameInput(props: Props) {
  const { initialName, className, schema, methodsRef, onRename, ...rest } =
    props;

  const { isEditing, name, setName, onEndEditing, inputRef } = useRename({
    initialName,
    methodsRef,
    schema,
    onRename,
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && inputRef.current) inputRef.current.blur();
    },
    [inputRef],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <input
        {...rest}
        className={cn(
          '!hidden text-sm font-medium text-left border-none outline-none bg-transparent w-full cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap',
          { '!flex items-center cursor-text': isEditing },
          className,
        )}
        value={name}
        onChange={e => setName(e.target.value)}
        readOnly={!isEditing}
        ref={inputRef}
        onClick={e => e.stopPropagation()}
        onBlur={onEndEditing}
      />

      <span
        className={cn(
          'flex items-center text-sm font-medium text-left border-none outline-none bg-transparent w-full cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap',
          className,
          { hidden: isEditing },
        )}
      >
        {name}
      </span>
    </>
  );
}
