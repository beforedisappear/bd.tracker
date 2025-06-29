import {
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  type FocusEvent,
  type RefObject,
} from 'react';

import { toast } from 'sonner';
import { getZodErrorMessage } from '@/shared/lib/error';
import { ZodError, ZodSchema } from 'zod';

import type { RenameInputMethods } from './RenameInput.types';

interface Args {
  initialName: string;
  methodsRef: RefObject<RenameInputMethods | null>;
  schema: ZodSchema;
  onRename: (name: string) => void;
}

export function useRename(args: Args) {
  const { initialName, methodsRef, schema, onRename } = args;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const inputRef = useRef<HTMLInputElement>(null);

  // to avoid auto blur after focus
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onStartEditing = () => {
    setTimeout(() => setIsEditing(true), 200);
  };

  const onEndEditing = (e: FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);

    const name = e.target.value;

    if (name === initialName) return;

    try {
      schema.parse({ name });
    } catch (error) {
      if (error instanceof ZodError) toast.error(getZodErrorMessage(error));
      setName(initialName);
      return;
    }

    onRename(name);
  };

  useImperativeHandle(
    methodsRef,
    () =>
      ({
        focus: () => inputRef.current?.focus(),
        onStartEditing,
        onEndEditing,
      }) as RenameInputMethods,
  );

  return {
    inputRef,
    isEditing,
    name,
    setName,
    onStartEditing,
    onEndEditing,
  };
}
