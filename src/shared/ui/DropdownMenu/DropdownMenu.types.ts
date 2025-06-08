import { type MouseEvent } from 'react';

export type MenuSeparator = {
  type: 'separator';
};

export type MenuItem = {
  type: 'item';
  label: {
    icon?: React.ReactNode;
    text: string;
  };
  shortcut?: string;
  disabled?: boolean;
  onSelect?: (e: MouseEvent<HTMLDivElement>) => void;
};

export type MenuSubItem = {
  type: 'sub';
  triggerLabel: string;
  subItems: (MenuItem | MenuSeparator)[];
};

export type MenuGroup = {
  type: 'group';
  subItems: (MenuItem | MenuSubItem)[];
};

export type DropDownMenuOptions = (MenuItem | MenuGroup | MenuSeparator)[];
