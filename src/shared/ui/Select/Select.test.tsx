import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';
import { renderWithFormProvider } from '@/shared/lib/testing';

const mockOptions = [
  { name: 'Option 1', value: '1' },
  { name: 'Option 2', value: '2' },
  { name: 'Option 3', value: '3' },
];

const defaultProps = {
  name: 'test',
  options: mockOptions,
};

const defaultValues = {
  test: '',
  error: '',
};

describe('Select ui component', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    window.HTMLElement.prototype.releasePointerCapture = jest.fn();
    window.HTMLElement.prototype.hasPointerCapture = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders select with label', () => {
    const label = 'Test Label';
    renderWithFormProvider(<Select {...defaultProps} label={label} />, {
      defaultValues: { test: '' },
    });

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders select with description', () => {
    const description = 'Test Description';
    renderWithFormProvider(
      <Select {...defaultProps} description={description} />,
      {
        defaultValues: { test: '' },
      },
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders placeholder when no value selected', () => {
    const placeholder = 'Select an option';
    renderWithFormProvider(
      <Select {...defaultProps} placeholder={placeholder} />,
      {
        defaultValues: { test: '' },
      },
    );

    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('renders selected value', () => {
    renderWithFormProvider(<Select {...defaultProps} />, {
      defaultValues: { test: '2' },
    });

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('renders all options when opened', async () => {
    renderWithFormProvider(<Select {...defaultProps} />, {
      defaultValues: { test: '' },
    });

    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockOptions.length);

    mockOptions.forEach((option, index) => {
      expect(options[index]).toHaveTextContent(option.name);
    });
  });

  it('calls onChange when value is selected', async () => {
    const onChange = jest.fn();
    renderWithFormProvider(
      <Select {...defaultProps} onValueChange={onChange} />,
      {
        defaultValues: { test: '' },
      },
    );

    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const options = screen.getAllByRole('option');
    await userEvent.click(options[1]!); // Выбираем вторую опцию

    expect(onChange).toHaveBeenCalledWith(mockOptions[1]!.value);
  });

  it('selects value when option is clicked', async () => {
    renderWithFormProvider(<Select {...defaultProps} />, {
      defaultValues: { test: '' },
    });

    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const options = screen.getAllByRole('option');
    await userEvent.click(options[1]!); // Выбираем вторую опцию

    expect(trigger).toHaveTextContent(mockOptions[1]!.name);
  });

  it('renders in disabled state', () => {
    renderWithFormProvider(<Select {...defaultProps} disabled />, {
      defaultValues: { test: '' },
    });

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });

  it('displays error message', () => {
    const errorMessage = 'test error';

    renderWithFormProvider(<Select {...defaultProps} name='error' />, {
      defaultValues: { error: '' },
      errorMessage,
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('cannot be opened when disabled', async () => {
    renderWithFormProvider(<Select {...defaultProps} disabled />, {
      defaultValues,
    });

    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
