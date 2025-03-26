'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';

import { SheetContent, type SheetContentProps } from './SheetContent';
import { SheetHeader } from './SheetHeader';
import { SheetDescription } from './SheetDescription';
import { SheetFooter } from './SheetFooter';
import { SheetTitle } from './SheetTitle';
// import { Button } from '../Button/Button';

import type { ComponentProps } from 'react';

type BaseProps = ComponentProps<typeof SheetContainer>;

interface IProps extends BaseProps {
  title: string;
  trigger: React.ReactNode;
  description?: string;
  className?: string;
  content?: SheetContentProps;
}

const SheetContainer = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
// const SheetClose = SheetPrimitive.Close;

export function Sheet(props: IProps) {
  const {
    title,
    trigger,
    description,
    children,
    className,
    content,
    ...restProps
  } = props;

  const { side = 'left', ...contentProps } = content || {};

  return (
    <SheetContainer {...restProps}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent side={side} className={className} {...contentProps}>
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
