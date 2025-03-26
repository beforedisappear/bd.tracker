import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

import { TEST_TEXT } from '@/shared/constants/test.constants';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  title: 'shared-ui/Drawer',
  component: Drawer,
  args: { title: 'Drawer title', trigger: <Button>Open</Button> },
};

export default meta;

export const Simple: Story = {
  name: 'Simple (With title & trigger)',
  args: {},
};

export const WithTitleClassName: Story = {
  args: { titleClassName: 'border-2 border-red-700' },
};

export const WithDescription: Story = {
  args: { description: 'The description can be found here' },
};

export const WithDescriptionClassName: Story = {
  args: {
    description: 'The description can be found here',
    descClassName: 'border-2 border-red-700',
  },
};

export const WithContent: Story = {
  args: { children: <span>{TEST_TEXT}</span> },
};

export const WithFooterContent: Story = {
  args: { footerContent: <span>{'Footer content'}</span> },
};

export const WithoutCloseButton: Story = {
  args: { withCloseBtn: false },
};
