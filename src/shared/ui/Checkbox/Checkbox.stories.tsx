import { Checkbox } from './Checkbox';

import { FormDecorator } from '@/shared/lib/storybook/decorators';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: 'shared-ui/Checkbox',
  component: Checkbox,
  decorators: [FormDecorator],
  args: { name: 'checkbox' },
};

export default meta;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Checkbox label' },
};

export const WithRightLabel: Story = {
  args: { label: 'Right Checkbox label', withRightLabel: true },
};

export const WithDescription: Story = {
  args: { description: 'Some checkbox description' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Checked: Story = {
  args: { name: 'checkboxValue' },
};
