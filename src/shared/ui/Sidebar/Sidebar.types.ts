type Separator = {
  type: 'separator';
};

type Skeleton = {
  type: 'skeleton';
};

type MenuAction = { title: string; icon: React.ReactNode; onClick: () => void };

type MenuLink = {
  title: string;
  url: string;
  icon?: React.ReactNode;
  isActive?: boolean;
};

export type MenuSubItem = Omit<MenuItemLink, 'action' | 'badge'>;

type MenuItemLink = {
  type: 'item-link';
  link: MenuLink;
  action?: MenuAction;
  badge?: React.ReactNode;
};

type MenuItemWithSubItems = {
  type: 'item-sub';
  trigger: { label: string; icon?: React.ReactNode };
  subItems: MenuSubItem[];
  isDefaultOpen?: boolean;
};

type GroupAction = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

type GroupItem = {
  type: 'group';
  items: (MenuItemLink | MenuItemWithSubItems | Separator)[];
  label?: string;
  action?: GroupAction;
};

export type SidebarGroupEl = GroupItem | Separator | Skeleton;
