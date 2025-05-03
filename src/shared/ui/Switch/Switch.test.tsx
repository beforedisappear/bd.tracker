import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';
import { renderWithFormProvider } from '@/shared/lib/testing';

const defaultProps = {
  name: 'test',
};

const defaultValues = {
  test: false,
};

describe('Switch ui component', () => {
  it('renders simple switch', () => {
    renderWithFormProvider(<Switch {...defaultProps} />, {
      defaultValues,
    });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  });

  it('renders with label', () => {
    const label = 'Test Label';

    renderWithFormProvider(<Switch {...defaultProps} label={label} />, {
      defaultValues,
    });

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders with description', () => {
    const description = 'Test Description';

    renderWithFormProvider(
      <Switch {...defaultProps} description={description} />,
      { defaultValues },
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('toggles state when clicked', async () => {
    renderWithFormProvider(<Switch {...defaultProps} />, {
      defaultValues,
    });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    await userEvent.click(switchElement);
    expect(switchElement).toBeChecked();

    await userEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  it('calls onChange when toggled', async () => {
    const onChange = jest.fn();

    renderWithFormProvider(
      <Switch {...defaultProps} onCheckedChange={onChange} />,
      { defaultValues: { test: false } },
    );

    const switchElement = screen.getByRole('switch');
    await userEvent.click(switchElement);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders in disabled state', () => {
    renderWithFormProvider(<Switch {...defaultProps} disabled />, {
      defaultValues,
    });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('cannot be toggled when disabled', async () => {
    renderWithFormProvider(<Switch {...defaultProps} disabled />, {
      defaultValues,
    });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    await userEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    renderWithFormProvider(
      <Switch {...defaultProps} className={customClass} />,
      { defaultValues },
    );

    const formItem = screen.getByRole('switch').parentElement;
    expect(formItem).toHaveClass(customClass);
  });
});
