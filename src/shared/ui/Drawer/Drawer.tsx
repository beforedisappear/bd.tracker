'use client';

import { DrawerContent } from './DrawerContent';
import { DrawerHeader } from './DrawerHeader';
import { DrawerTitle } from './DrawerTitle';
import { DrawerDescription } from './DrawerDescription';
import { DrawerFooter } from './DrawerFooter';
import { DrawerContainer } from './DrawerContainer';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Button } from '../Button/Button';

import { type ComponentProps, type PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/css';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerClose = DrawerPrimitive.Close;

interface BaseProps {
  title: string;
  footerContent?: React.ReactNode;
  trigger?: React.ReactNode;
  description?: string;
  className?: string;
  titleClassName?: string;
  descClassName?: string;
  withCloseBtn?: boolean;
}

type Props = ComponentProps<typeof DrawerContainer> &
  BaseProps &
  PropsWithChildren;

export function Drawer(props: Props) {
  const {
    trigger,
    footerContent,
    title,
    description,
    children,
    className,
    titleClassName,
    descClassName,
    withCloseBtn = true,
    ...restProps
  } = props;

  return (
    <DrawerContainer {...restProps} repositionInputs={false}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent className={cn(className, 'px-4')}>
        <DrawerHeader>
          <DrawerTitle className={titleClassName}>{title}</DrawerTitle>
          {description && (
            <DrawerDescription className={descClassName}>
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>

        {children}

        <DrawerFooter>
          {footerContent}

          <DrawerClose asChild>
            {withCloseBtn && (
              <Button variant='outline' className='w-40 mx-auto'>
                Закрыть
              </Button>
            )}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerContainer>
  );
}
