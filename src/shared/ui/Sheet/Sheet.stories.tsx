import { Sheet } from './Sheet';
import { Button } from '../Button/Button';

import type { Meta, StoryObj } from '@storybook/react';
import { TEST_DESCRIPTION, TEST_TEXT } from '@/shared/constants/test.constants';

type Story = StoryObj<typeof Sheet>;

const meta: Meta<typeof Sheet> = {
  title: 'shared-ui/Sheet',
  component: Sheet,
  args: {
    title: 'Sheet title',
    trigger: <Button className='ml-28'>Trigger</Button>,
  },
};

export default meta;

export const Simple: Story = {
  name: 'Simple (with trigger & title)',
  args: {},
};

export const WithClassName: Story = {
  args: { className: 'border-2 border-red-700' },
};

export const WithContent: Story = {
  args: { children: <span>{TEST_TEXT}</span> },
};

export const WithDescription: Story = {
  args: { description: TEST_DESCRIPTION },
};

export const OnCustomSide: Story = {
  args: { content: { side: 'right' } },
};
