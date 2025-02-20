'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogContent } from './DialogContent';
import { DialogDescription } from './DialogDescription';
import { DialogTitle } from './DialogTitle';
import { DialogHeader } from './DialogHeader';
import { Button } from '../Button/Button';

const DialogContainer = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

interface IProps {
  defaultOpen?: boolean;
  trigger?: {
    type: 'button';
    label: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props?: { [key: string]: any };
  };
  title: string;
  description?: string;
  children?: React.ReactNode;
  onOpenChange?: (payloda: boolean) => void;
}

export function Dialog(props: IProps) {
  const { title, description, trigger, defaultOpen, children, onOpenChange } =
    props;

  return (
    <DialogContainer defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger && trigger.type === 'button' && (
          <Button variant='outline' {...trigger.props}>
            {trigger.label}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </DialogContainer>
  );
}
