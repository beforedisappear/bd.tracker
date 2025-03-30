import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuShortcut } from './DropdownMenuShortcut';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';
import { DropdownMenuSubContent } from './DropdownMenuSubContent';
import { DropdownMenuSubTrigger } from './DropdownMenuSubTrigger';

import type { MenuItem, MenuSubItem } from './DropdownMenu.types';
import { v4 as uuidv4 } from 'uuid';

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const getMenuSeparator = () => <DropdownMenuSeparator key={uuidv4()} />;

export const getMenuItem = (el: MenuItem) => (
  <DropdownMenuItem key={uuidv4()} onClick={el.onSelect} disabled={el.disabled}>
    {el.label}
    {el.shortcut && <DropdownMenuShortcut>{el.shortcut}</DropdownMenuShortcut>}
  </DropdownMenuItem>
);

export const getMenuSubItem = (el: MenuSubItem) => (
  <DropdownMenuSub key={uuidv4()}>
    <DropdownMenuSubTrigger>{el.triggerLabel}</DropdownMenuSubTrigger>

    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        {el.subItems.map(item => {
          if (item.type === 'item') return getMenuItem(item);
          else if (item.type === 'separator') return getMenuSeparator();
        })}
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
);
