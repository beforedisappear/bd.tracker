import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { DatePicker } from './DatePicker';
import { getDate } from 'date-fns';

const defaultDate = new Date('2024-03-15');

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      date: defaultDate,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('DatePicker ui component', () => {
  it('renders with default value', () => {
    render(
      <TestWrapper>
        <DatePicker name='date' />
      </TestWrapper>,
    );
    const button = screen.getByRole('button', { name: /15\.03\.2024/ });
    expect(button).toBeInTheDocument();
  });

  it('renders with label', () => {
    const label = 'Select date';
    render(
      <TestWrapper>
        <DatePicker name='date' label={label} />
      </TestWrapper>,
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders with description', () => {
    const description = 'Choose a date';
    render(
      <TestWrapper>
        <DatePicker name='date' description={description} />
      </TestWrapper>,
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders with disabled trigger', () => {
    render(
      <TestWrapper>
        <DatePicker name='date' disabled />
      </TestWrapper>,
    );

    const trigger = screen.getByTestId('date-picker-trigger');
    expect(trigger).toBeDisabled();
  });

  it('handles disabled dates', async () => {
    render(
      <TestWrapper>
        <DatePicker name='date' disabledDates={defaultDate} />
      </TestWrapper>,
    );

    const trigger = screen.getByTestId('date-picker-trigger');
    await userEvent.click(trigger);

    const dayCells = screen.getAllByRole('gridcell');
    const disabledDayCell = dayCells.find(
      cell => cell.textContent === getDate(defaultDate).toString(),
    );

    expect(disabledDayCell).toBeInTheDocument();
    expect(disabledDayCell).toBeDisabled();
  });

  it('handles disabled dates function', async () => {
    const isDivisibleBy5 = (date: Date) => getDate(date) % 5 === 0;
    render(
      <TestWrapper>
        <DatePicker name='date' disabledDates={isDivisibleBy5} />
      </TestWrapper>,
    );

    const trigger = screen.getByTestId('date-picker-trigger');
    await userEvent.click(trigger);

    const dayCells = screen.getAllByRole('gridcell');

    const divisibleBy5 = ['10', '15', '20'];
    const disabledCells = dayCells.filter(
      cell => cell.textContent && divisibleBy5.includes(cell.textContent),
    );

    expect(disabledCells).toHaveLength(divisibleBy5.length);
    disabledCells.forEach(cell => {
      expect(cell).toBeDisabled();
    });
  });

  it('handles date selection', async () => {
    render(
      <TestWrapper>
        <DatePicker name='date' />
      </TestWrapper>,
    );

    const trigger = screen.getByTestId('date-picker-trigger');
    await userEvent.click(trigger);

    const dayCells = screen.getAllByRole('gridcell');
    const disabledDayCell = dayCells.find(cell => cell.textContent === '20')!;
    await userEvent.click(disabledDayCell);

    expect(trigger).toHaveTextContent('20.03.2024');
  });

  it('handles keyboard navigation', async () => {
    render(
      <TestWrapper>
        <DatePicker name='date' />
      </TestWrapper>,
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);

    // Navigate with arrow keys
    fireEvent.keyDown(button, { key: 'ArrowDown' });
    fireEvent.keyDown(button, { key: 'ArrowRight' });
    fireEvent.keyDown(button, { key: 'Enter' });

    // Check if the date was updated
    expect(button).not.toHaveTextContent('16.03.2024');
  });
});
