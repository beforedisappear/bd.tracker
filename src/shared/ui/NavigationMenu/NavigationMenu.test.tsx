import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavigationMenu } from './NavigationMenu';
import type { NavigationMenuItems } from './NavigationMenu.types';

const pureContentText = 'Pure Content';

const mockItems = [
  {
    type: 'pure' as const,
    content: <div>{pureContentText}</div>,
  },
  {
    type: 'simple' as const,
    content: {
      label: 'Simple Link',
      href: '/simple',
    },
  },
  {
    type: 'extended' as const,
    triggerLabel: 'Extended Menu',
    content: [
      {
        label: 'Item 1',
        href: '/item1',
        description: 'Description 1',
      },
      {
        label: 'Item 2',
        href: '/item2',
        description: 'Description 2',
      },
    ],
  },
] as const satisfies NavigationMenuItems;

describe('NavigationMenu ui component', () => {
  it('renders with pure content', () => {
    render(<NavigationMenu items={[mockItems[0]]} />);
    expect(screen.getByText(pureContentText)).toBeInTheDocument();
  });

  it('renders with simple link', () => {
    render(<NavigationMenu items={[mockItems[1]]} />);
    const link = screen.getByRole('link', { name: 'Simple Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/simple');
  });

  it('renders extended menu with trigger and content', async () => {
    const triggerLabel = mockItems[2].triggerLabel;
    const firstLabel = mockItems[2].content[0].label;
    const secondLabel = mockItems[2].content[1].label;
    const firstDescription = mockItems[2].content[0].description;
    const secondDescription = mockItems[2].content[1].description;
    const firstLink = mockItems[2].content[0].href;
    const secondLink = mockItems[2].content[1].href;

    render(<NavigationMenu items={[mockItems[2]]} />);

    const trigger = screen.getByRole('button', { name: triggerLabel });
    expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    const menuItems = screen.getAllByTestId('navigation-menu-item');
    expect(menuItems).toHaveLength(2);

    expect(menuItems[0]).toHaveTextContent(firstLabel);
    expect(menuItems[0]).toHaveTextContent(firstDescription);
    expect(menuItems[0].querySelector('a')).toHaveAttribute('href', firstLink);

    expect(menuItems[1]).toHaveTextContent(secondLabel);
    expect(menuItems[1]).toHaveTextContent(secondDescription);
    expect(menuItems[1].querySelector('a')).toHaveAttribute('href', secondLink);
  });

  it('renders multiple items', () => {
    render(<NavigationMenu items={mockItems} />);

    expect(
      screen.getByRole('link', { name: 'Simple Link' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Extended Menu' }),
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<NavigationMenu items={mockItems} className={customClass} />);

    const container = screen.getByRole('navigation');
    expect(container).toHaveClass(customClass);
  });
});
