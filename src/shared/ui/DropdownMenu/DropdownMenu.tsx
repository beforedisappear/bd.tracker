'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const DropdownMenuContainer = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuLabel } from './DropdownMenuLabel';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';

import { v4 as uuidv4 } from 'uuid';

import {
  getMenuItem,
  getMenuSeparator,
  getMenuSubItem,
} from './DropdownMenu.utils';
import type { DropDownMenuOptions } from './DropdownMenu.types';
import { Fragment, type ComponentProps } from 'react';

interface IProps extends ComponentProps<typeof DropdownMenuContainer> {
  trigger: React.ReactNode;
  label?: string;
  options: DropDownMenuOptions;
  className?: string;
  contentProps?: ComponentProps<typeof DropdownMenuContent>;
}

export function DropdownMenu(props: IProps) {
  const {
    trigger,
    label,
    options = [],
    className,
    contentProps,
    modal = false,
    ...restProps
  } = props;

  return (
    <DropdownMenuContainer modal={modal} {...restProps}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className={className} {...contentProps}>
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {options.map(el => {
          if (el.type === 'item') return getMenuItem(el);

          if (el.type === 'group') {
            return (
              <DropdownMenuGroup key={uuidv4()}>
                {el.subItems.map(el => {
                  if (el.type === 'item') return getMenuItem(el);

                  if (el.type === 'sub') return getMenuSubItem(el);

                  return <></>;
                })}
              </DropdownMenuGroup>
            );
          }

          if (el.type === 'separator') return getMenuSeparator();

          if (el.type === 'pure')
            return <Fragment key={uuidv4()}>{el.content}</Fragment>;

          return <></>;
        })}
      </DropdownMenuContent>
    </DropdownMenuContainer>
  );
}
