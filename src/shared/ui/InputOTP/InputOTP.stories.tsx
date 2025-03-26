import { InputOTP } from './InputOTP';

import { FormDecorator } from '@/shared/lib/storybook/decorators';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof InputOTP>;

const meta: Meta<typeof InputOTP> = {
  title: 'shared-ui/InputOTP',
  component: InputOTP,
  decorators: [FormDecorator],
  args: { name: 'inputOInputOTP' },
};

export default meta;

export const Simple: Story = {
  name: 'Simple (with specified length)',
  args: {},
};

export const WithSpecifiedGroupSize = {
  args: { groupSize: 2 },
};

export const WithClassName: Story = {
  args: { className: 'border-2 border-red-700' },
};

export const WithValue: Story = {
  args: { name: 'inputOtpValue' },
};

export const Disabled: Story = {
  args: { name: 'inputOtpValue', disabled: true },
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
