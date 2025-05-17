import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';
import { renderWithFormProvider } from '@/shared/lib/testing';

const defaultValues = {
  test: false,
  error: false,
};

const defaultProps = {
  name: 'test',
};

describe('Checkbox ui component', () => {
  it('renders checkbox with label', () => {
    const label = 'Test Label';

    renderWithFormProvider(<Checkbox {...defaultProps} label={label} />, {
      defaultValues,
    });

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders checkbox with description', () => {
    const description = 'Test Description';

    renderWithFormProvider(
      <Checkbox {...defaultProps} description={description} />,
      {
        defaultValues,
      },
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('handles checkbox changes', async () => {
    const onCheckedChange = jest.fn();

    renderWithFormProvider(
      <Checkbox {...defaultProps} onCheckedChange={onCheckedChange} />,
      {
        defaultValues,
      },
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });

  it('applies custom class name', () => {
    const className = 'custom-checkbox';

    renderWithFormProvider(
      <Checkbox {...defaultProps} className={className} />,
      {
        defaultValues,
      },
    );

    const checkboxWrapper = screen.getByRole('checkbox').parentElement;
    expect(checkboxWrapper).toHaveClass(className);
  });

  it('handles disabled state', () => {
    renderWithFormProvider(<Checkbox {...defaultProps} disabled />, {
      defaultValues,
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('shows validation error', async () => {
    const errorMessage = 'test error';

    renderWithFormProvider(<Checkbox {...defaultProps} name='error' />, {
      defaultValues,
      errorMessage,
    });

    await waitFor(() => {
      const error = screen.getByText(errorMessage);
      expect(error).toBeInTheDocument();
    });
  });
});
