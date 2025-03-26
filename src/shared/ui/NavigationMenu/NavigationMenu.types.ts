type SimpleListitem = { label: React.ReactNode; href: string };

type ListItem = { label: string; href: string; description?: string };

type PureListItem = { type: 'pure'; content: React.ReactNode };

type SimpleItem = { type: 'simple'; content: SimpleListitem };

type ExtendedItem = {
  type: 'extended';
  triggerLabel: string;
  content: ListItem[];
};

export type NavigationMenuItems = (PureListItem | SimpleItem | ExtendedItem)[];
