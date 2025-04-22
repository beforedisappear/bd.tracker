type Separator = {
  type: 'separator';
};

type MenuAction = { title: string; icon: React.ReactNode; onClick: () => void };

type MenuLink = { title: string; url: string; icon?: React.ReactNode };

type MenuSubItem = Omit<MenuItem, 'subItems' | 'action' | 'badge'>;

type MenuItem = {
  type: 'item';
  link: MenuLink;
  subItems?: MenuSubItem[];
  action?: MenuAction;
  badge?: React.ReactNode;
};

type GroupAction = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

type GroupItem = {
  type: 'item';
  items: (MenuItem | Separator)[];
  label?: string;
  action?: GroupAction;
};

export type SidebarGroupEl = GroupItem | Separator;
