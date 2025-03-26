import { Input } from './Input';

import { FormDecorator } from '@/shared/lib/storybook/decorators';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  title: 'shared-ui/Input',
  component: Input,
  decorators: [FormDecorator],
  args: { name: 'input' },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const WithClassName: Story = {
  args: { className: 'border-2 border-red-700' },
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Please, enter text' },
};

export const WithValue: Story = {
  args: { name: 'inputValue' },
};

export const Disabled: Story = {
  args: { name: 'inputValue', disabled: true },
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
