import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { renderWithFormProvider } from '@/shared/lib/testing';

const defaultValues = {
  test: '',
  error: '',
};

const defaultProps = {
  name: 'test',
  type: 'text',
};

describe('Input ui component', () => {
  it('renders input with label', () => {
    const label = 'Test Label';

    renderWithFormProvider(<Input {...defaultProps} label={label} />, {
      defaultValues,
    });

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders input with description', () => {
    const description = 'Test Description';

    renderWithFormProvider(
      <Input {...defaultProps} description={description} />,
      {
        defaultValues,
      },
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const onChange = jest.fn();

    renderWithFormProvider(<Input {...defaultProps} onChange={onChange} />, {
      defaultValues,
    });

    const input = screen.getByTestId('input');
    await userEvent.type(input, 'test value');

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('test value');
  });

  it('applies custom class name', () => {
    const className = 'custom-input';

    renderWithFormProvider(<Input {...defaultProps} className={className} />, {
      defaultValues,
    });

    const inputWrapper = screen.getByTestId('input').parentElement;
    expect(inputWrapper).toHaveClass(className);
  });

  it('renders different input types', () => {
    const types = ['text', 'password', 'email', 'number'] as const;

    types.forEach(type => {
      const { unmount } = renderWithFormProvider(
        <Input {...defaultProps} type={type} />,
        {
          defaultValues,
        },
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', type);

      unmount();
    });
  });

  it('handles disabled state', () => {
    renderWithFormProvider(<Input {...defaultProps} disabled />, {
      defaultValues,
    });

    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
  });

  it('handles placeholder', () => {
    const placeholder = 'Enter text here';

    renderWithFormProvider(
      <Input {...defaultProps} placeholder={placeholder} />,
      {
        defaultValues,
      },
    );

    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  it('shows validation error', async () => {
    const errorMessage = 'test error';

    renderWithFormProvider(<Input {...defaultProps} name='error' />, {
      defaultValues,
      errorMessage,
    });

    await waitFor(() => {
      const error = screen.getByText(errorMessage);
      expect(error).toBeInTheDocument();
    });
  });
});
