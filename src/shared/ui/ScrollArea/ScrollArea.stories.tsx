import { TEST_TEXT } from '@/shared/constants/test.constants';
import { ScrollArea } from './ScrollArea';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ScrollArea>;

const meta: Meta<typeof ScrollArea> = {
  title: 'shared-ui/ScrollArea',
  component: ScrollArea,
  args: {
    style: { border: '1px solid red' },
    children: <div className='flex'>{TEST_TEXT}</div>,
  },
};

export default meta;

export const Simple: Story = {
  args: { className: 'w-[300px] h-[200px] pr-2' },
};

export const AlwaysVisibleScrollBar: Story = {
  args: {
    className: 'w-[300px] h-[200px] pr-2',
    type: 'always',
  },
};

export const HorizontalScroll: Story = {
  args: {
    className: 'w-96 whitespace-nowrap pb-2',
    scrollBar: { orientation: 'horizontal' },
  },
};
