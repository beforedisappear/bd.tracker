import { Badge } from './Badge';
import Link from 'next/link';

import { badgeVariants } from './Badge.utils';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Badge>;

const meta: Meta<typeof Badge> = {
  title: 'shared-ui/Badge',
  component: Badge,
  args: { children: 'Some content' },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const WithClassName: Story = {
  name: 'With classname',
  args: { className: 'border-2 border-gray-300' },
};

export const WithVariant: Story = {
  name: 'With variant',
  args: { variant: 'destructive' },
};

export const LinkAsBadge: Story = {
  name: 'With custom tag (e.g Link)',
  render: () => (
    <Link href={'#'} className={badgeVariants()}>
      Link
    </Link>
  ),
};
