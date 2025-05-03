import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputOTP } from './InputOTP';
import { renderWithFormProvider } from '@/shared/lib/testing';

const defaultProps = {
  name: 'test',
  length: 4,
};

const defaultValues = {
  test: '',
  error: '',
};

describe('InputOTP ui component', () => {
  const originalElementFromPoint = document.elementFromPoint;

  beforeEach(() => {
    Object.defineProperty(document, 'elementFromPoint', {
      value: () => null,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(document, 'elementFromPoint', {
      value: originalElementFromPoint,
      writable: true,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders input with label', () => {
    const label = 'Test Label';
    renderWithFormProvider(<InputOTP {...defaultProps} label={label} />, {
      defaultValues,
    });

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders input with description', () => {
    const description = 'Test Description';
    renderWithFormProvider(
      <InputOTP {...defaultProps} description={description} />,
      { defaultValues },
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders correct number of input slots', () => {
    const length = 6;
    renderWithFormProvider(<InputOTP {...defaultProps} length={length} />, {
      defaultValues,
    });

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxlength', length.toString());
  });

  it('renders with correct group size', () => {
    const length = 10;
    const groupSize = 4;
    renderWithFormProvider(
      <InputOTP {...defaultProps} length={length} groupSize={groupSize} />,
      { defaultValues },
    );

    const separators = screen.getAllByRole('separator');
    const input = screen.getByRole('textbox');
    expect(separators).toHaveLength(Math.floor((length - 1) / groupSize));
    expect(input).toHaveAttribute('maxlength', length.toString());
  });

  it('handles input changes', async () => {
    const onChange = jest.fn();
    renderWithFormProvider(<InputOTP {...defaultProps} onChange={onChange} />, {
      defaultValues,
    });

    const input = screen.getByRole('textbox');
    await userEvent.type(input, '1234');

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('1234');
  });

  it('handles disabled state', () => {
    renderWithFormProvider(<InputOTP {...defaultProps} disabled />, {
      defaultValues,
    });

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('shows validation error', async () => {
    const errorMessage = 'test error';

    renderWithFormProvider(<InputOTP {...defaultProps} name='error' />, {
      defaultValues,
      errorMessage,
    });

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
      renderWithFormProvider(<InputOTP {...defaultProps} length={0} />, {
        defaultValues,
      });
    }).toThrow('groupSize и separatorStep can only be positive');

    consoleError.mockRestore();
  });

  it('throws error for invalid group size', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      renderWithFormProvider(<InputOTP {...defaultProps} groupSize={0} />, {
        defaultValues,
      });
    }).toThrow('groupSize и separatorStep can only be positive');

    consoleError.mockRestore();
  });
});
