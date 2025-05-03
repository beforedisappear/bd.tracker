import { isDisabledDateInRange } from './DateRangePicker.utils';

describe('isDisabledDateInRange', () => {
  const range = {
    from: new Date('2024-03-01'),
    to: new Date('2024-03-10'),
  };

  it('should return false when no disabled dates', () => {
    const result = isDisabledDateInRange(range, []);
    expect(result).toBe(false);
  });

  it('should return true when disabled date in range', () => {
    const disabledDate = new Date('2024-03-05');
    const result = isDisabledDateInRange(range, disabledDate);
    expect(result).toBe(true);
  });

  it('should return true when any disabled date from array in range', () => {
    const disabledDates = [
      new Date('2024-03-07'),
      new Date('2024-03-05'),
      new Date('2024-03-03'),
    ];
    const result = isDisabledDateInRange(range, disabledDates);
    expect(result).toBe(true);
  });

  it('should handle function matcher', () => {
    const isWeekend = (date: Date) =>
      date.getDay() === 0 || date.getDay() === 6;
    const result = isDisabledDateInRange(range, isWeekend);
    expect(result).toBe(true); // Range includes weekends
  });

  it('should handle date range matcher', () => {
    const dateRange = {
      from: new Date('2024-03-04'),
      to: new Date('2024-03-06'),
    };
    const result = isDisabledDateInRange(range, dateRange);
    expect(result).toBe(true);
  });

  it('should handle before matcher', () => {
    const before = { before: new Date('2024-03-05') };
    const result = isDisabledDateInRange(range, before);
    expect(result).toBe(true);
  });

  it('should handle after matcher', () => {
    const after = { after: new Date('2024-03-05') };
    const result = isDisabledDateInRange(range, after);
    expect(result).toBe(true);
  });

  it('should handle mixed matchers array', () => {
    const matchers = [
      new Date('2024-03-07'),
      (date: Date) => date.getDay() === 0,
      { from: new Date('2024-03-03'), to: new Date('2024-03-04') },
    ];
    const result = isDisabledDateInRange(range, matchers);
    expect(result).toBe(true);
  });

  it('should return false when no disabled dates in range', () => {
    const disabledDate = new Date('2024-03-15');
    const result = isDisabledDateInRange(range, disabledDate);
    expect(result).toBe(false);
  });

  it('should handle boolean matcher', () => {
    const result = isDisabledDateInRange(range, true);
    expect(result).toBe(true);
  });
});
