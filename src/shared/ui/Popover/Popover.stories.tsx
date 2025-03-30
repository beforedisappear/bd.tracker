import { Popover } from './Popover';
import { Button } from '../Button/Button';

import type { Meta, StoryObj } from '@storybook/react';
import { TEST_TEXT } from '@/shared/constants/test.constants';

type Story = StoryObj<typeof Popover>;

const meta: Meta<typeof Popover> = {
  title: 'shared-ui/Popover',
  component: Popover,
  args: {
    trigger: <Button className='ml-28'>Trigger</Button>,
    children: <span>{TEST_TEXT}</span>,
  },
};

export default meta;

export const Simple: Story = {
  name: 'Simple (with trigger & content)',
  args: {},
};

export const WithCustomAlign: Story = {
  args: { content: { align: 'start' } },
};
