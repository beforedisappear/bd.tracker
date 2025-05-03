import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer';

const defaultProps = {
  title: 'Test Drawer',
  trigger: <button>Open Drawer</button>,
};

describe('Drawer ui component', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    Element.prototype.setPointerCapture = jest.fn();
    Element.prototype.releasePointerCapture = jest.fn();
    Element.prototype.hasPointerCapture = jest.fn();

    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('renders trigger button', () => {
    render(<Drawer {...defaultProps}>Content</Drawer>);
    expect(
      screen.getByRole('button', { name: 'Open Drawer' }),
    ).toBeInTheDocument();
  });

  it('renders drawer with title', async () => {
    render(<Drawer {...defaultProps}>Content</Drawer>);

    const trigger = screen.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders drawer with description when provided', async () => {
    const description = 'Test Description';
    render(
      <Drawer {...defaultProps} description={description}>
        Content
      </Drawer>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders drawer content', async () => {
    const content = 'Drawer Content';
    render(<Drawer {...defaultProps}>{content}</Drawer>);

    const trigger = screen.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('renders footer content when provided', async () => {
    const footerContent = <button>Custom Footer Button</button>;
    render(
      <Drawer {...defaultProps} footerContent={footerContent}>
        Content
      </Drawer>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);

    expect(
      screen.getByRole('button', { name: 'Custom Footer Button' }),
    ).toBeInTheDocument();
  });

  it('renders close button by default', async () => {
    render(<Drawer {...defaultProps}>Content</Drawer>);

    const trigger = screen.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);

    expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument();
  });

  it('does not render close button when withCloseBtn is false', async () => {
    render(
      <Drawer {...defaultProps} withCloseBtn={false}>
        Content
      </Drawer>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);

    expect(
      screen.queryByRole('button', { name: 'Закрыть' }),
    ).not.toBeInTheDocument();
  });

  it('applies custom class names', async () => {
    const className = 'custom-drawer';
    const titleClassName = 'custom-title';
    const descClassName = 'custom-desc';

    render(
      <Drawer
        {...defaultProps}
        className={className}
        titleClassName={titleClassName}
        descClassName={descClassName}
        description='Test Description'
      >
        Content
      </Drawer>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);

    const drawer = screen.getByRole('dialog');
    const title = screen.getByText('Test Drawer');
    const description = screen.getByText('Test Description');

    expect(drawer).toHaveClass(className);
    expect(title).toHaveClass(titleClassName);
    expect(description).toHaveClass(descClassName);
  });

  it('handles defaultOpen prop', () => {
    render(
      <Drawer {...defaultProps} defaultOpen>
        Content
      </Drawer>,
    );

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('calls onOpenChange with true when drawer is opened', async () => {
    const onOpenChange = jest.fn();

    render(
      <Drawer {...defaultProps} onOpenChange={onOpenChange}>
        Content
      </Drawer>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
