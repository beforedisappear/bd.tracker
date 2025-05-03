import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu';
import type { DropDownMenuOptions } from './DropdownMenu.types';

const defaultProps = {
  trigger: <button>Open Menu</button>,
  options: [
    {
      type: 'item' as const,
      label: 'Item 1',
      onSelect: jest.fn(),
    },
    {
      type: 'separator' as const,
    },
    {
      type: 'group' as const,
      subItems: [
        {
          type: 'item' as const,
          label: 'Sub Item 1',
          onSelect: jest.fn(),
        },
        {
          type: 'sub' as const,
          triggerLabel: 'Sub Menu',
          subItems: [
            {
              type: 'item' as const,
              label: 'Nested Item',
              onSelect: jest.fn(),
            },
          ],
        },
      ],
    },
  ] as DropDownMenuOptions,
};

describe('DropdownMenu ui component', () => {
  it('renders trigger button', () => {
    render(<DropdownMenu {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: 'Open Menu' }),
    ).toBeInTheDocument();
  });

  it('renders menu items when opened', async () => {
    render(<DropdownMenu {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(trigger);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
    expect(screen.getByText('Sub Menu')).toBeInTheDocument();
  });

  it('renders label when provided', async () => {
    const label = 'Menu Label';

    render(<DropdownMenu {...defaultProps} label={label} />);

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(trigger);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('calls onSelect handler when menu item is clicked', async () => {
    const onSelect = jest.fn();
    const options: DropDownMenuOptions = [
      {
        type: 'item',
        label: 'Clickable Item',
        onSelect,
      },
    ];

    render(<DropdownMenu {...defaultProps} options={options} />);

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(trigger);

    const menuItem = screen.getByText('Clickable Item');
    await userEvent.click(menuItem);

    expect(onSelect).toHaveBeenCalled();
  });

  it('renders nested menu items', async () => {
    render(<DropdownMenu {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(trigger);

    const subMenu = screen.getByText('Sub Menu');
    await userEvent.click(subMenu);

    expect(screen.getByText('Nested Item')).toBeInTheDocument();
  });

  it('applies custom class name', async () => {
    const className = 'custom-menu';

    render(<DropdownMenu {...defaultProps} className={className} />);

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(trigger);

    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass(className);
  });

  it('handles align prop', async () => {
    render(<DropdownMenu {...defaultProps} align='end' />);

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await userEvent.click(trigger);

    const menu = screen.getByRole('menu');
    expect(menu).toHaveAttribute('data-align', 'end');
  });
});
