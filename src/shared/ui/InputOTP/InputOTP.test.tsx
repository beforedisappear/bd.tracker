import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputOTP } from './InputOTP';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';

// Mock elementFromPoint
Object.defineProperty(document, 'elementFromPoint', {
  value: () => null,
  writable: true,
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      test: '',
      error: '',
    },
  });

  useEffect(() => {
    methods.setError('error', { type: 'required', message: errorMessage });
  }, [methods]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const defaultProps = {
  name: 'test',
  length: 4,
};

const errorMessage = 'test error';

describe('InputOTP ui component', () => {
  it('renders input with label', () => {
    const label = 'Test Label';
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} label={label} />
      </TestWrapper>,
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders input with description', () => {
    const description = 'Test Description';
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} description={description} />
      </TestWrapper>,
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders correct number of input slots', () => {
    const length = 6;
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} length={length} />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxlength', length.toString());
  });

  it('renders with correct group size', () => {
    const length = 10;
    const groupSize = 4;
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} length={length} groupSize={groupSize} />
      </TestWrapper>,
    );

    const separators = screen.getAllByRole('separator');
    const input = screen.getByRole('textbox');
    expect(separators).toHaveLength(Math.floor((length - 1) / groupSize));
    expect(input).toHaveAttribute('maxlength', length.toString());
  });

  it('handles input changes', async () => {
    const onChange = jest.fn();
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} onChange={onChange} />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, '1234');

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('1234');
  });

  it('handles disabled state', () => {
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} disabled />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('shows validation error', async () => {
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} name='error' />
      </TestWrapper>,
    );

    await waitFor(() => {
      const error = screen.getByText(errorMessage);
      expect(error).toBeInTheDocument();
    });
  });

  it('throws error for invalid length', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(
        <TestWrapper>
          <InputOTP {...defaultProps} length={0} />
        </TestWrapper>,
      );
    }).toThrow('groupSize и separatorStep can only be positive');

    consoleError.mockRestore();
  });

  it('throws error for invalid group size', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(
        <TestWrapper>
          <InputOTP {...defaultProps} groupSize={0} />
        </TestWrapper>,
      );
    }).toThrow('groupSize и separatorStep can only be positive');

    consoleError.mockRestore();
  });
});
