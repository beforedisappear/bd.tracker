import { DeviceTypeDecorator } from '../../lib/storybook/decorators/DeviceTypeDecorator';
import { Sidebar } from './Sidebar';
import {
  groupItemsWithSubItems,
  simpleGroupItems,
  simpleGroupItemsWithGroupAction,
  simpleGroupItemsWithBadge,
  simpleGroupItemsWithSeparator,
  simpleGroupItemsWithActions,
} from './Sidebar.config.stories';
import { SidebarProvider } from './SidebarProvider';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Sidebar>;

const meta: Meta<typeof Sidebar> = {
  title: 'shared-ui/Sidebar',
  component: Sidebar,
  decorators: [
    Story => (
      <SidebarProvider>
        <Story />
        <main>
          <div>Page content</div>
        </main>
      </SidebarProvider>
    ),
    DeviceTypeDecorator,
  ],
};

export default meta;

export const Simple: Story = {
  args: {
    groupItems: simpleGroupItems,
  },
};

export const WithSeparator: Story = {
  args: {
    groupItems: simpleGroupItemsWithSeparator,
  },
};

export const WithBadge: Story = {
  args: {
    groupItems: simpleGroupItemsWithBadge,
  },
};

export const WithGroupAction: Story = {
  args: {
    groupItems: simpleGroupItemsWithGroupAction,
  },
};

export const WithMenuActions: Story = {
  args: {
    groupItems: simpleGroupItemsWithActions,
  },
};

export const WithSubitems: Story = {
  args: {
    groupItems: groupItemsWithSubItems,
  },
};

export const WithHeader: Story = {
  args: { headerContent: <div>Header</div> },
};

export const WithFooter: Story = {
  args: { footerContent: <div>Footer</div> },
};
