import { Calendar } from './Calendar';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Calendar>;

const meta: Meta<typeof Calendar> = {
  title: 'shared/Calendar',
  component: Calendar,
  render: () => (
    <div className='flex'>
      <Calendar />
    </div>
  ),
  args: {},
};

export default meta;

export const Simple: Story = {
  args: {},
};
