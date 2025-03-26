import { Button } from '../Button/Button';
import { DropdownMenu } from './DropdownMenu';

import {
  groupMenuData,
  groupMenuData2,
  simpleMenuData,
} from './DropdownMenu.config.stories';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DropdownMenu>;

const meta: Meta<typeof DropdownMenu> = {
  title: 'shared-ui/DropdownMenu',
  component: DropdownMenu,
  args: {
    trigger: (
      <Button variant='ghost' className='ml-16'>
        Open
      </Button>
    ),
    options: simpleMenuData,
  },
};

export default meta;

export const Simple: Story = {
  name: 'Simple (with trigger)',
  args: {},
};

export const WithClassName: Story = {
  args: { className: 'border-2 border-red-700' },
};

export const WithLabel: Story = {
  args: { label: 'DropdownMenu label' },
};

export const WithCustomAlign: Story = {
  args: { align: 'end' },
};

export const WithSimpleSubitems: Story = {
  name: 'With simple subitems (+separators)',
  args: { options: groupMenuData },
};

export const WithNestedSubitems: Story = {
  name: 'With nested subitems (+separators)',
  args: { options: groupMenuData2 },
};
