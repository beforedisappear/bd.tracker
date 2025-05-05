'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogContent } from './DialogContent';
import { DialogDescription } from './DialogDescription';
import { DialogTitle } from './DialogTitle';
import { DialogHeader } from './DialogHeader';

import type { ComponentProps } from 'react';

const DialogContainer = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

interface IProps extends ComponentProps<typeof DialogContainer> {
  title: string;
  trigger?: React.ReactNode;
  description?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  titleClassName?: string;
  descClassName?: string;
}

export function Dialog(props: IProps) {
  const {
    title,
    description,
    trigger,
    defaultOpen,
    children,
    className,
    titleClassName,
    descClassName,
    onOpenChange,
    ...restProps
  } = props;

  return (
    <DialogContainer defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className={className} {...restProps}>
        <DialogHeader>
          <DialogTitle className={titleClassName}>{title}</DialogTitle>
          {description && (
            <DialogDescription className={descClassName}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children}
      </DialogContent>
    </DialogContainer>
  );
}
