import { render, screen } from '@testing-library/react';
import { ScrollArea } from './ScrollArea';

describe('ScrollArea ui component', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Content';
    render(
      <ScrollArea>
        <div>{testContent}</div>
      </ScrollArea>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(
      <ScrollArea className={customClass}>
        <div>Content</div>
      </ScrollArea>,
    );

    const container = screen.getByTestId('scroll-area-viewport').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('renders with vertical scrollbar by default', () => {
    render(
      <ScrollArea type='always'>
        <div>Content</div>
      </ScrollArea>,
    );

    const scrollbar = screen.getByTestId('scroll-area-scrollbar');
    expect(scrollbar).toHaveClass('w-2.5');
  });

  it('renders with horizontal scrollbar', () => {
    render(
      <ScrollArea type='always' scrollBar={{ orientation: 'horizontal' }}>
        <div>Content</div>
      </ScrollArea>,
    );

    const scrollbar = screen.getByTestId('scroll-area-scrollbar');
    expect(scrollbar).toHaveClass('h-2.5');
  });
});
