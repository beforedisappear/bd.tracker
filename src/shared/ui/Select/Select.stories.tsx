import { FormDecorator } from '@/shared/lib/storybook/decorators';
import { Select } from './Select';

import { selectOptions } from './Select.config.stories';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  title: 'shared-ui/Select',
  component: Select,
  decorators: [FormDecorator],
  args: { name: 'select', options: selectOptions },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Select value' },
};

export const WithSelectLabel: Story = {
  args: { selectLabel: 'Some select label' },
};

export const WithDefaultValue: Story = {
  args: { name: 'selectValue' },
};

export const Disabled: Story = {
  args: { name: 'selectValue', disabled: true },
};

export const WithLabel: Story = {
  args: { label: 'Input label' },
};

export const WithDescription: Story = {
  args: { description: 'Some input description' },
};

export const WithErrorMessage: Story = {
  args: { name: 'error' },
};

export const WithErrorMessageAndLabel: Story = {
  args: { ...WithLabel.args, name: 'error' },
};
