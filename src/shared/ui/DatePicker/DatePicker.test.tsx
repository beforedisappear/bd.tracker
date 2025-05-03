import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './DatePicker';
import { renderWithFormProvider } from '@/shared/lib/testing';
import { getDate } from 'date-fns';

const defaultDate = new Date('2024-03-15');

const defaultValues = {
  date: defaultDate,
};

describe('DatePicker ui component', () => {
  it('renders with default value', () => {
    renderWithFormProvider(<DatePicker name='date' />, {
      defaultValues,
    });
    const button = screen.getByRole('button', { name: /15\.03\.2024/ });
    expect(button).toBeInTheDocument();
  });

  it('renders with label', () => {
    const label = 'Select date';
    renderWithFormProvider(<DatePicker name='date' label={label} />, {
      defaultValues,
    });
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders with description', () => {
    const description = 'Choose a date';
    renderWithFormProvider(
      <DatePicker name='date' description={description} />,
      { defaultValues },
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders with disabled trigger', () => {
    renderWithFormProvider(<DatePicker name='date' disabled />, {
      defaultValues,
    });

    const trigger = screen.getByTestId('date-picker-trigger');
    expect(trigger).toBeDisabled();
  });

  it('handles disabled dates', async () => {
    renderWithFormProvider(
      <DatePicker name='date' disabledDates={defaultDate} />,
      { defaultValues },
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
    renderWithFormProvider(
      <DatePicker name='date' disabledDates={isDivisibleBy5} />,
      { defaultValues },
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
    renderWithFormProvider(<DatePicker name='date' />, {
      defaultValues,
    });

    const trigger = screen.getByTestId('date-picker-trigger');
    await userEvent.click(trigger);

    const dayCells = screen.getAllByRole('gridcell');
    const disabledDayCell = dayCells.find(cell => cell.textContent === '20')!;
    await userEvent.click(disabledDayCell);

    expect(trigger).toHaveTextContent('20.03.2024');
  });

  it('handles keyboard navigation', async () => {
    renderWithFormProvider(<DatePicker name='date' />, {
      defaultValues,
    });

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
