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

interface IProps {
  trigger: React.ReactNode;
  align?: DropdownMenuPrimitive.DropdownMenuContentProps['align'];
  label?: string;
  options: DropDownMenuOptions;
  className?: string;
}

export function DropdownMenu(props: IProps) {
  const { trigger, label, options = [], align, className } = props;

  return (
    <DropdownMenuContainer>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className={className} align={align}>
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

          return <></>;
        })}
      </DropdownMenuContent>
    </DropdownMenuContainer>
  );
}
