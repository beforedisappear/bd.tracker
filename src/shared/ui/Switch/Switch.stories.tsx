import { TEST_DESCRIPTION } from '@/shared/constants/test.constants';
import { Switch } from './Switch';
import { FormDecorator } from '@/shared/lib/storybook/decorators';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
  title: 'shared-ui/Switch',
  component: Switch,
  decorators: [FormDecorator],
  args: {
    name: 'switch',
  },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const WithDefaultValue: Story = {
  args: { name: 'switchValue' },
};

export const Disabled: Story = {
  args: { name: 'switchValue', disabled: true },
};

export const WithLabel: Story = {
  args: {
    label: 'Switch label',
  },
};

export const WithDescription: Story = {
  args: {
    description: TEST_DESCRIPTION,
  },
};
