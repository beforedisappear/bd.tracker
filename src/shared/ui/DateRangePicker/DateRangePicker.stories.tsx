import { FormDecorator } from '@/shared/lib/storybook/decorators';
import { DateRangePicker } from './DateRangePicker';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DateRangePicker>;

const meta: Meta<typeof DateRangePicker> = {
  title: 'shared-ui/DateRangePicker',
  component: DateRangePicker,
  decorators: [FormDecorator],
  args: { name: 'dateRange' },
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const WithDefaultValue: Story = {
  args: { name: 'dateRangeValue' },
};
