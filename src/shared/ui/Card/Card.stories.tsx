import { TEST_TEXT } from '../../constants/test.constants';
import { Card } from './Card';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: 'shared/Card',
  component: Card,
  args: { title: 'Card title' },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const WithClassName: Story = {
  name: 'With classname',
  args: { className: 'border-2 border-gray-300' },
};

export const WithContent: Story = {
  args: { children: <div>Card content</div> },
};

export const WithClassnameOnContent: Story = {
  args: {
    ...WithContent.args,
    contentClassName: 'border-2 border-red-700',
  },
};

export const WithDescription: Story = {
  args: { description: TEST_TEXT },
};

export const WithClassnameOnDescription: Story = {
  args: {
    ...WithDescription.args,
    descClassName: 'border-2 border-gray-700',
  },
};

export const WithHeaderContent: Story = {
  args: {
    headerContent: <div>header content</div>,
    children: <div>Card content</div>,
  },
};

export const WithClassnameOnHeaderContent: Story = {
  args: {
    ...WithHeaderContent.args,
    headerClassName: 'border-2 border-yellow-500',
  },
};

export const WithFooterContent: Story = {
  args: {
    children: <div>Card content</div>,
    footerContent: <div>footer content</div>,
  },
};

export const WithClassnameOnFooterContent: Story = {
  args: {
    ...WithFooterContent.args,
    footerClassName: 'border-2 border-purple-800',
  },
};
