'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';

import { SheetContent } from './SheetContent';
import { SheetHeader } from './SheetHeader';
import { SheetDescription } from './SheetDescription';
import { SheetFooter } from './SheetFooter';
import { SheetTitle } from './SheetTitle';
// import { Button } from '../Button/Button';

import type { ComponentProps, PropsWithChildren } from 'react';

interface IProps
  extends PropsWithChildren,
    ComponentProps<typeof SheetContainer> {
  title: string;
  trigger: React.ReactNode;
  description?: string;
  className?: string;
}

const SheetContainer = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
// const SheetClose = SheetPrimitive.Close;

export function Sheet(props: IProps) {
  const { title, trigger, description, children, className, ...restProps } =
    props;

  return (
    <SheetContainer {...restProps}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent side='left' className={className}>
        <SheetHeader>
          <SheetTitle className='text-center'>{title}</SheetTitle>

          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        {children}

        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </SheetContainer>
  );
}
