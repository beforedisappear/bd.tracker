import { Accordion } from './Accordion';

import { accordionDataList } from './Accordion.config.stories';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Accordion>;

const meta: Meta<typeof Accordion> = {
  title: 'shared-ui/Accordion',
  component: Accordion,
  args: { items: accordionDataList },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const DefaultOpened: Story = {
  args: { defaultValue: 'item-5' },
};

export const WithMultipleOpenings: Story = {
  args: { type: 'multiple', defaultValue: ['item-4', 'item-5'] },
};

export const WithClassnameOnTrigger: Story = {
  args: { triggerClassName: 'border-2 border-red-700' },
};

export const WithClassnameOnContent: Story = {
  args: {
    contentClassName: 'border-2 border-blue-700',
    defaultValue: 'item-5',
  },
};
