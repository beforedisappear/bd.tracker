import { Badge } from '../Badge/Badge';

import type { NavigationMenuItems } from './NavigationMenu.types';

export default { tags: ['hidden'] };

export const navigationMenuSimpleItems: NavigationMenuItems = [
  {
    type: 'simple',
    content: { label: 'Alert Dialog', href: '/docs/primitives/alert-dialog' },
  },
  {
    type: 'simple',
    content: { label: 'Hover Card', href: '/docs/primitives/hover-card' },
  },
  {
    type: 'simple',
    content: { label: 'Progress', href: '/docs/primitives/progress' },
  },
];

export const navigationMenuPureItems: NavigationMenuItems = [
  {
    type: 'pure',
    content: <Badge>Pure Item №1</Badge>,
  },
  ...navigationMenuSimpleItems,
  {
    type: 'pure',
    content: <Badge>Pure Item №2</Badge>,
  },
];

export const navigationMenuExtendedItems: NavigationMenuItems = [
  {
    type: 'extended',
    triggerLabel: `Trigger №1`,
    content: [
      {
        label: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description:
          'A modal dialog that interrupts the user with important content and expects a response.',
      },
    ],
  },
  {
    type: 'extended',
    triggerLabel: `Trigger №2`,
    content: [
      {
        label: 'Progress',
        href: '/docs/primitives/progress',
        description:
          'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
      },
      {
        label: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
      },
      {
        label: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description:
          'For sighted users to preview content available behind a link.',
      },
    ],
  },
  {
    type: 'extended',
    triggerLabel: 'Trigger №3',
    content: [
      {
        label: 'Tabs',
        href: '/docs/primitives/tabs',
        description:
          'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
      },
      {
        label: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description:
          'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
      },
    ],
  },
];
