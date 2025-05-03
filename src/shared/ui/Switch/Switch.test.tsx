import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';
import { FormProvider, useForm } from 'react-hook-form';

const defaultProps = {
  name: 'test',
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: { test: false },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Switch ui component', () => {
  it('renders simple switch', () => {
    render(
      <TestWrapper>
        <Switch {...defaultProps} />
      </TestWrapper>,
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  });

  it('renders with label', () => {
    const label = 'Test Label';
    render(
      <TestWrapper>
        <Switch {...defaultProps} label={label} />
      </TestWrapper>,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders with description', () => {
    const description = 'Test Description';
    render(
      <TestWrapper>
        <Switch {...defaultProps} description={description} />
      </TestWrapper>,
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('toggles state when clicked', async () => {
    render(
      <TestWrapper>
        <Switch {...defaultProps} />
      </TestWrapper>,
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    await userEvent.click(switchElement);
    expect(switchElement).toBeChecked();

    await userEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  it('calls onChange when toggled', async () => {
    const onChange = jest.fn();
    render(
      <TestWrapper>
        <Switch {...defaultProps} onCheckedChange={onChange} />
      </TestWrapper>,
    );

    const switchElement = screen.getByRole('switch');
    await userEvent.click(switchElement);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders in disabled state', () => {
    render(
      <TestWrapper>
        <Switch {...defaultProps} disabled />
      </TestWrapper>,
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('cannot be toggled when disabled', async () => {
    render(
      <TestWrapper>
        <Switch {...defaultProps} disabled />
      </TestWrapper>,
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    await userEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(
      <TestWrapper>
        <Switch {...defaultProps} className={customClass} />
      </TestWrapper>,
    );

    const formItem = screen.getByRole('switch').parentElement;
    expect(formItem).toHaveClass(customClass);
  });
});
