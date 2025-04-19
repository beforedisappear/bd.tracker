import { ErrorBoundary } from './ErrorBoundary';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ErrorBoundary>;

const meta: Meta<typeof ErrorBoundary> = {
  title: 'shared-ui/ErrorBoundary',
  component: ErrorBoundary,
  args: {},
};

export default meta;

export const Simple: Story = {
  args: {},
};

export const WithClassname: Story = {
  args: { className: 'border border-red-900' },
};

export const WithCustomTitle: Story = {
  args: { title: 'Ресурс не найден' },
};

export const WithCustomDescription: Story = {
  args: { description: 'Попробуйте позднее' },
};

export const WithResetButton: Story = {
  args: { reset: () => alert('Clicked on reset') },
};
