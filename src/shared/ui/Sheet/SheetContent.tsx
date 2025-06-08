import { X } from 'lucide-react';

import { cn } from '@/shared/lib/css';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import {
  forwardRef,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { sheetVariants } from './Sheet.utils';
import { VariantProps } from 'class-variance-authority';
import { SheetOverlay } from './SheetOverlay';

export interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  onClickOnCloseButton?: () => void;
}

const SheetPortal = SheetPrimitive.Portal;

export const SheetContent = forwardRef<
  ComponentRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>((props, ref) => {
  const { onClickOnCloseButton, side, className, children, ...restProps } =
    props;

  return (
    <SheetPortal>
      <SheetOverlay data-testid='sheet-overlay' />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...restProps}
      >
        <SheetPrimitive.Close
          className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'
          onClick={onClickOnCloseButton}
        >
          <X className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = SheetPrimitive.Content.displayName;
