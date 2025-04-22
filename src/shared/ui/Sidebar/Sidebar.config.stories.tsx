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
  type: 'item' as const,
  label: 'First Group',
  items: [
    {
      type: 'item' as const,
      link: { title: 'Item №1', url: '#', icon: <House /> },
    },
    {
      type: 'item' as const,
      link: { title: 'Item №2', url: '#', icon: <Filter /> },
    },
    {
      type: 'item' as const,
      link: { title: 'Item №3', url: '#', icon: <Plane /> },
    },
  ],
};

const sidebarGroupElement2: SidebarGroupEl = {
  type: 'item' as const,
  label: 'Second Group',
  items: [
    {
      type: 'item' as const,
      link: { title: 'Item №1', url: '#', icon: <Search /> },
    },
    {
      type: 'item' as const,
      link: { title: 'Item №2', url: '#', icon: <Timer /> },
    },
    {
      type: 'item' as const,
      link: { title: 'Item №3', url: '#', icon: <Umbrella /> },
    },
  ],
};

const sidebarGroupElementSubItems = [
  {
    type: 'item' as const,
    link: { title: 'SubItem №1', icon: <Subtitles />, url: '#' },
  },
  {
    type: 'item' as const,
    link: { title: 'SubItem №2', icon: <Circle />, url: '#' },
  },
  {
    type: 'item' as const,
    link: { title: 'SubItem №3', icon: <Map />, url: '#' },
  },
];

const sidebarSepartor: SidebarGroupEl = {
  type: 'separator',
};

export const simpleGroupItems: SidebarGroupEl[] = [
  sidebarGroupElement1,
  sidebarGroupElement2,
];

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
    type: 'item' as const,
    label: 'Group',
    items: [
      {
        type: 'item' as const,
        link: { title: 'Item №1', url: '#', icon: <ChevronDownCircleIcon /> },
        subItems: sidebarGroupElementSubItems,
      },
      {
        type: 'item' as const,
        link: { title: 'Item №2', url: '#', icon: <Option /> },
        subItems: sidebarGroupElementSubItems,
      },
    ],
  },
];
