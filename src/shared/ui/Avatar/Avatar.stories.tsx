import { Avatar } from './Avatar';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Avatar>;

const meta: Meta<typeof Avatar> = {
  title: 'shared/Avatar',
  component: Avatar,
  args: { src: 'https://github.com/shadcn.png', alt: '123' },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const WithClassName: Story = {
  name: 'With classname',
  args: { className: 'border-2 border-gray-300' },
};

export const WithFallback: Story = {
  name: 'With fallback (and broken src)',
  args: {
    src: '',
    fallback: (
      <div style={{ background: '#eee', width: '100%', height: '40px' }}></div>
    ),
  },
};
