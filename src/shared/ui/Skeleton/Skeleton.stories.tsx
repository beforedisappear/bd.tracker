import { Skeleton } from './Skeleton';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Skeleton>;

const meta: Meta<typeof Skeleton> = {
  title: 'shared-ui/Skeleton',
  component: Skeleton,
  args: {},
};

export default meta;

export const Simple: Story = {
  args: { className: 'w-52 h-28' },
};

export const ForText: Story = {
  args: { className: 'text-2xl', numberOfTextLines: 1 },
};
