import type { DropDownMenuOptions, MenuItem } from './DropdownMenu.types';

export default { tags: ['hidden'] };

export const simpleMenuData: DropDownMenuOptions = [
  {
    type: 'item',
    label: { text: 'Item №1' },
    onSelect: () => alert('You selected first item'),
  },
  {
    type: 'item',
    shortcut: 'Ctrl',
    label: { text: 'Item №2' },
    disabled: true,
    onSelect: () => alert('You selected second item'),
  },
  {
    type: 'item',
    label: { text: 'Item №3' },
    shortcut: 'Shift',
    onSelect: () => alert('You selected third item'),
  },
];

const subItems: MenuItem[] = [
  { type: 'item', label: { text: 'SubItem №1' } },
  { type: 'item', label: { text: 'SubItem №2' } },
  { type: 'item', label: { text: 'SubItem №3' } },
  { type: 'item', label: { text: 'SubItem №4' } },
];

export const groupMenuData: DropDownMenuOptions = [
  simpleMenuData[0]!,
  { type: 'separator' },
  {
    type: 'group',
    subItems: [...subItems],
  },
  { type: 'separator' },
  simpleMenuData[2]!,
];

export const groupMenuData2: DropDownMenuOptions = [
  simpleMenuData[0]!,
  { type: 'separator' },
  {
    type: 'group',
    subItems: [
      ...subItems.slice(0, 2),
      {
        type: 'sub',
        triggerLabel: 'SubItem as trigger №1',
        subItems: [...subItems],
      },
      {
        type: 'sub',
        triggerLabel: 'SubItem as trigger №2',
        subItems: [
          ...subItems.slice(0, 2),
          { type: 'separator' },
          ...subItems.slice(0, 2),
        ],
      },
    ],
  },
];
