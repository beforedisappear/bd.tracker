import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      test: '',
      error: '',
    },
  });

  useEffect(() => {
    methods.setError('error', {
      type: 'required',
      message: errorMessage,
    });
  }, [methods]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const errorMessage = 'test error';

const defaultProps = {
  name: 'test',
  type: 'text',
};

describe('Input ui component', () => {
  it('renders input with label', () => {
    const label = 'Test Label';
    render(
      <TestWrapper>
        <Input {...defaultProps} label={label} />
      </TestWrapper>,
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders input with description', () => {
    const description = 'Test Description';
    render(
      <TestWrapper>
        <Input {...defaultProps} description={description} />
      </TestWrapper>,
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const onChange = jest.fn();
    render(
      <TestWrapper>
        <Input {...defaultProps} onChange={onChange} />
      </TestWrapper>,
    );

    const input = screen.getByTestId('input');
    await userEvent.type(input, 'test value');

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('test value');
  });

  it('applies custom class name', () => {
    const className = 'custom-input';
    render(
      <TestWrapper>
        <Input {...defaultProps} className={className} />
      </TestWrapper>,
    );

    const inputWrapper = screen.getByTestId('input').parentElement;
    expect(inputWrapper).toHaveClass(className);
  });

  it('renders different input types', () => {
    const types = ['text', 'password', 'email', 'number'] as const;

    types.forEach(type => {
      const { unmount } = render(
        <TestWrapper>
          <Input {...defaultProps} type={type} />
        </TestWrapper>,
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', type);
      unmount();
    });
  });

  it('handles disabled state', () => {
    render(
      <TestWrapper>
        <Input {...defaultProps} disabled />
      </TestWrapper>,
    );

    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
  });

  it('handles placeholder', () => {
    const placeholder = 'Enter text here';
    render(
      <TestWrapper>
        <Input {...defaultProps} placeholder={placeholder} />
      </TestWrapper>,
    );

    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  it('shows validation error', async () => {
    render(
      <TestWrapper>
        <Input {...defaultProps} name='error' />
      </TestWrapper>,
    );

    await waitFor(() => {
      const error = screen.getByText(errorMessage);
      expect(error).toBeInTheDocument();
    });
  });
});
