import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sheet } from './Sheet';

const sheetTitle = 'Test Sheet';

const defaultProps = {
  title: sheetTitle,
  trigger: <button>Open Sheet</button>,
};

describe('Sheet ui component', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders trigger button', () => {
    render(<Sheet {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: 'Open Sheet' }),
    ).toBeInTheDocument();
  });

  it('renders title', async () => {
    render(<Sheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await userEvent.click(trigger);

    expect(screen.getByText(sheetTitle)).toBeInTheDocument();
  });

  it('renders description', async () => {
    const description = 'Test Description';
    render(<Sheet {...defaultProps} description={description} />);

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await userEvent.click(trigger);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders children content', async () => {
    const content = 'Sheet Content';
    render(
      <Sheet {...defaultProps}>
        <div>{content}</div>
      </Sheet>,
    );

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await userEvent.click(trigger);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('applies custom className to content', async () => {
    const customClass = 'custom-class';
    render(<Sheet {...defaultProps} className={customClass} />);

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await userEvent.click(trigger);

    const content = screen.getByRole('dialog');
    expect(content).toHaveClass(customClass);
  });

  it('applies custom className to header', async () => {
    const headerClass = 'header-class';
    render(<Sheet {...defaultProps} headerClassName={headerClass} />);

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await userEvent.click(trigger);

    const header = screen.getByRole('heading', {
      name: 'Test Sheet',
    }).parentElement;
    expect(header).toHaveClass(headerClass);
  });

  it('renders with different side position', async () => {
    render(<Sheet {...defaultProps} content={{ side: 'right' }} />);

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await userEvent.click(trigger);

    const content = screen.getByRole('dialog');
    expect(content).toHaveClass('right-0');
  });

  it('closes when clicking outside', async () => {
    render(<Sheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    await userEvent.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const overlay = screen.getByTestId('sheet-overlay');
    await userEvent.click(overlay);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
