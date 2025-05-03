import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';

const mockOptions = [
  { value: '1', name: 'Option 1' },
  { value: '2', name: 'Option 2' },
  { value: '3', name: 'Option 3' },
];

const errorMessage = 'This is an error message';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: { test: mockOptions[0].value, error: undefined },
  });

  useEffect(() => {
    methods.setError('error', { message: errorMessage });
  }, [methods]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const defaultProps = {
  name: 'test',
  options: mockOptions,
};

describe('Select ui component', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    window.HTMLElement.prototype.releasePointerCapture = jest.fn();
    window.HTMLElement.prototype.hasPointerCapture = jest.fn();
  });

  it('renders with label', () => {
    const label = 'Test Label';

    render(
      <TestWrapper>
        <Select {...defaultProps} name='placeholder' label={label} />
      </TestWrapper>,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    const placeholder = 'Select an option';

    render(
      <TestWrapper>
        <Select
          {...defaultProps}
          name='placeholder'
          placeholder={placeholder}
        />
      </TestWrapper>,
    );

    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('renders with description', () => {
    const description = 'Test Description';

    render(
      <TestWrapper>
        <Select {...defaultProps} description={description} />
      </TestWrapper>,
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders with select label', async () => {
    const selectLabel = 'Test Select Label';

    render(
      <TestWrapper>
        <Select {...defaultProps} selectLabel={selectLabel} />
      </TestWrapper>,
    );

    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.getByText(selectLabel)).toBeInTheDocument();
  });

  it('renders all options when opened', async () => {
    render(
      <TestWrapper>
        <Select name='test' options={mockOptions} />
      </TestWrapper>,
    );

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
    render(
      <TestWrapper>
        <Select {...defaultProps} onValueChange={onChange} />
      </TestWrapper>,
    );

    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const options = screen.getAllByRole('option');
    await userEvent.click(options[1]); // Выбираем вторую опцию

    expect(onChange).toHaveBeenCalledWith(mockOptions[1].value);
  });

  it('selects value when option is clicked', async () => {
    render(
      <TestWrapper>
        <Select {...defaultProps} />
      </TestWrapper>,
    );

    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    const options = screen.getAllByRole('option');
    await userEvent.click(options[1]); // Выбираем вторую опцию

    expect(trigger).toHaveTextContent(mockOptions[1].name);
  });

  it('renders in disabled state', () => {
    render(
      <TestWrapper>
        <Select {...defaultProps} disabled />
      </TestWrapper>,
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });

  it('displays error message', () => {
    render(
      <TestWrapper>
        <Select {...defaultProps} name='error' />
      </TestWrapper>,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('cannot be opened when disabled', async () => {
    render(
      <TestWrapper>
        <Select {...defaultProps} disabled />
      </TestWrapper>,
    );

    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
