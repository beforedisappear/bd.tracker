import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';

const defaultProps = {
  title: 'Test Dialog',
  trigger: <button>Open Dialog</button>,
};

describe('Dialog ui component', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('renders trigger button', () => {
    render(<Dialog {...defaultProps}>Content</Dialog>);
    expect(
      screen.getByRole('button', { name: 'Open Dialog' }),
    ).toBeInTheDocument();
  });

  it('renders dialog with title', async () => {
    render(<Dialog {...defaultProps}>Content</Dialog>);

    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    await userEvent.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders dialog with description when provided', async () => {
    const description = 'Test Description';

    render(
      <Dialog {...defaultProps} description={description}>
        Content
      </Dialog>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    await userEvent.click(trigger);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders dialog content', async () => {
    const content = 'Dialog Content';

    render(<Dialog {...defaultProps}>{content}</Dialog>);

    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    await userEvent.click(trigger);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('applies custom class names', async () => {
    const className = 'custom-dialog';
    const titleClassName = 'custom-title';
    const descClassName = 'custom-desc';

    render(
      <Dialog
        {...defaultProps}
        className={className}
        titleClassName={titleClassName}
        descClassName={descClassName}
        description='Test Description'
      >
        Content
      </Dialog>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    await userEvent.click(trigger);

    const dialog = screen.getByRole('dialog');
    const title = screen.getByText('Test Dialog');
    const description = screen.getByText('Test Description');

    expect(dialog).toHaveClass(className);
    expect(title).toHaveClass(titleClassName);
    expect(description).toHaveClass(descClassName);
  });

  it('handles defaultOpen prop', () => {
    render(
      <Dialog {...defaultProps} defaultOpen>
        Content
      </Dialog>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onOpenChange when dialog is closed', async () => {
    const onOpenChange = jest.fn();

    render(
      <Dialog {...defaultProps} onOpenChange={onOpenChange}>
        Content
      </Dialog>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    await userEvent.click(trigger);
    const closeButton = screen.getByTestId('dialog-close-button');
    await userEvent.click(closeButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
