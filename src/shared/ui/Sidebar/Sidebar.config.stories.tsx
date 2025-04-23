import {
  Filter,
  House,
  Plane,
  Timer,
  Umbrella,
  Search,
  ChevronDownCircleIcon,
  Option,
  Circle,
  Subtitles,
  Map,
  Plus,
  Cross,
} from 'lucide-react';

import { SidebarGroupEl } from './Sidebar.types';

export default { tags: ['hidden'] };

const sidebarGroupElement1: SidebarGroupEl = {
  type: 'group' as const,
  label: 'First Group',
  items: [
    {
      type: 'item-link' as const,
      link: { title: 'Item №1', url: '#', icon: <House /> },
    },
    {
      type: 'item-link' as const,
      link: { title: 'Item №2', url: '#', icon: <Filter /> },
    },
    {
      type: 'item-link' as const,
      link: { title: 'Item №3', url: '#', icon: <Plane /> },
    },
  ],
};

const sidebarGroupElement2: SidebarGroupEl = {
  type: 'group' as const,
  label: 'Second Group',
  items: [
    {
      type: 'item-link' as const,
      link: { title: 'Item №1', url: '#', icon: <Search /> },
    },
    {
      type: 'item-link' as const,
      link: { title: 'Item №2', url: '#', icon: <Timer /> },
    },
    {
      type: 'item-link' as const,
      link: { title: 'Item №3', url: '#', icon: <Umbrella /> },
    },
  ],
};

const sidebarGroupElementSubItems = [
  {
    type: 'item-link' as const,
    link: { title: 'SubItem №1', icon: <Subtitles />, url: '#' },
  },
  {
    type: 'item-link' as const,
    link: { title: 'SubItem №2', icon: <Circle />, url: '#' },
  },
  {
    type: 'item-link' as const,
    link: { title: 'SubItem №3', icon: <Map />, url: '#', isActive: true },
  },
];

const sidebarSepartor: SidebarGroupEl = {
  type: 'separator',
};

export const simpleGroupItems: SidebarGroupEl[] = [
  sidebarGroupElement1,
  sidebarGroupElement2,
];

export const getSimpleGroupItemsWithActive = (): SidebarGroupEl[] => {
  const itemsLength = sidebarGroupElement1.items.length;
  const items = sidebarGroupElement1.items.slice(0, itemsLength - 1);
  const lastItem = sidebarGroupElement1.items[itemsLength - 1];

  if (lastItem.type === 'separator' || lastItem.type === 'item-sub') return [];

  return [
    {
      ...sidebarGroupElement1,
      items: [
        ...items,
        {
          ...lastItem,
          type: 'item-link',
          link: { ...lastItem.link, isActive: true },
        },
      ],
    },
  ];
};

export const simpleGroupItemsWithSeparator: SidebarGroupEl[] = [
  sidebarGroupElement1,
  sidebarSepartor,
  sidebarGroupElement2,
];

export const simpleGroupItemsWithBadge: SidebarGroupEl[] = [
  {
    ...sidebarGroupElement1,
    items: sidebarGroupElement1.items.map(el => ({
      ...el,
      badge: Math.floor(Math.random() * 10),
    })),
  },
];

export const simpleGroupItemsWithSkeleton: SidebarGroupEl[] = [
  sidebarGroupElement1,
  ...new Array(5).fill('_').map(() => ({ type: 'skeleton' as const })),
];

export const simpleGroupItemsWithGroupAction: SidebarGroupEl[] = [
  {
    ...sidebarGroupElement1,
    action: { title: 'Group Action', icon: <Plus />, onClick: () => {} },
  },
];

export const simpleGroupItemsWithActions: SidebarGroupEl[] = [
  {
    ...sidebarGroupElement1,
    items: sidebarGroupElement1.items.map(el => ({
      ...el,
      action: { title: 'Menu Action', icon: <Cross />, onClick: () => {} },
    })),
  },
];

export const groupItemsWithSubItems: SidebarGroupEl[] = [
  {
    type: 'group' as const,
    label: 'Group',
    items: [
      {
        type: 'item-sub' as const,
        trigger: {
          label: 'Item №1',
          icon: <ChevronDownCircleIcon />,
        },
        subItems: sidebarGroupElementSubItems,
        isDefaultOpen: true,
      },
      {
        type: 'item-sub' as const,
        trigger: { label: 'Item №2', icon: <Option /> },
        subItems: sidebarGroupElementSubItems,
        isDefaultOpen: false,
      },
    ],
  },
];
