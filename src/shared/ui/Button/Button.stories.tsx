import { Button } from './Button';
import Link from 'next/link';

import { buttonVariants } from './Button.utils';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: 'shared-ui/Button',
  component: Button,
  args: { children: 'Some content' },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithClassName: Story = {
  name: 'With classname',
  args: { className: 'border-2 border-gray-300' },
};

export const WithVariant: Story = {
  name: 'With variant',
  args: { variant: 'destructive' },
};

export const WithSize: Story = {
  name: 'With size',
  args: { size: 'lg' },
};

export const AsChild: Story = {
  name: 'As child',
  args: { asChild: true, children: <div>123</div> },
};

export const LinkAsButton: Story = {
  name: 'With custom tag (e.g Link)',
  render: () => (
    <Link href={'#'} className={buttonVariants()}>
      Link
    </Link>
  ),
};
