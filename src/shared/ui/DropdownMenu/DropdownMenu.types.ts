export type MenuSeparator = {
  type: 'separator';
};

export type MenuItem = {
  type: 'item';
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onSelect?: () => void;
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

export type Options = (MenuItem | MenuGroup | MenuSeparator)[];
