import { NavigationMenu } from './NavigationMenu';

import {
  navigationMenuExtendedItems,
  navigationMenuPureItems,
  navigationMenuSimpleItems,
} from './NavigationMenu.config.stories';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof NavigationMenu>;

const meta: Meta<typeof NavigationMenu> = {
  title: 'shared-ui/NavigationMenu',
  component: NavigationMenu,
  args: { items: navigationMenuSimpleItems },
};

export default meta;

export const Simple: Story = {
  name: 'Simple (with simple items)',
  args: {},
};

export const WithClassName: Story = {
  args: { className: 'border-2 border-red-700' },
};

export const WithPureItems: Story = {
  args: { items: navigationMenuPureItems },
};

export const WithExtendedItems: Story = {
  args: { items: navigationMenuExtendedItems },
};
