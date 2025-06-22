import { computeOrder } from './computeOrder';

describe('computeOrder task type', () => {
  it('should compute order for insertion at the beginning', () => {
    const result = computeOrder({
      prev: undefined,
      next: 2_000_000,
      type: 'task',
    });

    expect(result).toBe(1_000_000);
  });

  it('should compute order for insertion at the end', () => {
    const result = computeOrder({
      prev: 3_000_000,
      next: undefined,
      type: 'task',
    });

    expect(result).toBe(4_000_000);
  });

  it('should compute order for insertion between two tasks', () => {
    const result = computeOrder({
      prev: 1_000_000,
      next: 3_000_000,
      type: 'task',
    });

    expect(result).toBe(2_000_000);
  });

  it('should compute order for insertion between tasks with odd sum', () => {
    const result = computeOrder({
      prev: 1_000_000,
      next: 4_000_000,
      type: 'task',
    });

    expect(result).toBe(2_500_000);
  });

  it('should return 0 for first task when no prev and no next', () => {
    const result = computeOrder({
      prev: undefined,
      next: undefined,
      type: 'task',
    });

    expect(result).toBe(0);
  });
});

describe('computeOrder column type', () => {
  it('should compute order for insertion at the beginning', () => {
    const result = computeOrder({
      prev: undefined,
      next: 2_000_000,
      type: 'column',
    });

    expect(result).toBe(1_000_000);
  });

  it('should compute order for insertion at the end', () => {
    const result = computeOrder({
      prev: 3_000_000,
      next: undefined,
      type: 'column',
    });

    expect(result).toBe(4_000_000);
  });

  it('should compute order for insertion between two columns', () => {
    const result = computeOrder({
      prev: 1_000_000,
      next: 3_000_000,
      type: 'column',
    });

    expect(result).toBe(2_000_000);
  });

  it('should return 0 for first column when no prev and no next', () => {
    const result = computeOrder({
      prev: undefined,
      next: undefined,
      type: 'column',
    });

    expect(result).toBe(0);
  });
});

describe('edge cases', () => {
  it('should handle zero values', () => {
    const result = computeOrder({
      prev: 0,
      next: 2_000_000,
      type: 'task',
    });

    expect(result).toBe(1_000_000);
  });

  it('should handle negative values', () => {
    const result = computeOrder({
      prev: -1_000_000,
      next: 1_000_000,
      type: 'task',
    });

    expect(result).toBe(0);
  });

  it('should handle very large values', () => {
    const largeValue = 1_000_000_000;
    const result = computeOrder({
      prev: largeValue,
      next: largeValue + 2_000_000,
      type: 'task',
    });

    expect(result).toBe(largeValue + 1_000_000);
  });

  it('should handle same prev and next values', () => {
    const result = computeOrder({
      prev: 1_000_000,
      next: 1_000_000,
      type: 'task',
    });

    expect(result).toBe(1_000_000);
  });
});

describe('real-world scenarios', () => {
  it('should handle typical task insertion scenario', () => {
    // Simulating inserting a task between existing tasks
    const existingTasks = [
      { order: 1_000_000 }, // Task 1
      { order: 3_000_000 }, // Task 2
      { order: 5_000_000 }, // Task 3
    ];

    // Inserting between Task 1 and Task 2
    const result = computeOrder({
      prev: existingTasks[0].order,
      next: existingTasks[1].order,
      type: 'task',
    });

    expect(result).toBe(2_000_000);
  });

  it('should handle typical column insertion scenario', () => {
    // Simulating inserting a column between existing columns
    const existingColumns = [
      { order: 1_000_000 }, // Column 1
      { order: 3_000_000 }, // Column 2
      { order: 5_000_000 }, // Column 3
    ];

    // Inserting between Column 1 and Column 2
    const result = computeOrder({
      prev: existingColumns[0].order,
      next: existingColumns[1].order,
      type: 'column',
    });

    expect(result).toBe(2_000_000);
  });

  it('should handle insertion at the very beginning of a list', () => {
    const result = computeOrder({
      prev: undefined,
      next: 1_000_000,
      type: 'task',
    });

    expect(result).toBe(0); // 1_000_000 - 1_000_000
  });

  it('should handle insertion at the very end of a list', () => {
    const result = computeOrder({
      prev: 5_000_000,
      next: undefined,
      type: 'task',
    });

    expect(result).toBe(6_000_000); // 5_000_000 + 1_000_000
  });
});
