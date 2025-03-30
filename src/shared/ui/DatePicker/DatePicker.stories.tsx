import { FormDecorator } from '@/shared/lib/storybook/decorators';
import { DatePicker } from './DatePicker';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DatePicker>;

const meta: Meta<typeof DatePicker> = {
  title: 'shared-ui/DatePicker',
  component: DatePicker,
  decorators: [FormDecorator],
  args: { name: 'date' },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const WithDefaultValue: Story = {
  args: { name: 'dateValue' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithDisabledDates: Story = {
  args: {
    disabledDates: date => date > new Date() || date < new Date('2025-01-01'),
  },
};
