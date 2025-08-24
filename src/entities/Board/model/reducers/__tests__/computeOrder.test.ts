import { arrayMove } from '@dnd-kit/sortable';
import { calculateOrder } from '../calculateOrder';

describe('computeOrder (task type)', () => {
  it('should compute order for insertion at the beginning', () => {
    const result = calculateOrder({
      prev: undefined,
      next: 2_000_000,
      type: 'task',
    });

    expect(result).toBe(1_000_000);
  });

  it('should compute order for insertion at the end', () => {
    const result = calculateOrder({
      prev: 3_000_000,
      next: undefined,
      type: 'task',
    });

    expect(result).toBe(4_000_000);
  });

  it('should compute order for insertion between two tasks', () => {
    const result = calculateOrder({
      prev: 1_000_000,
      next: 3_000_000,
      type: 'task',
    });

    expect(result).toBe(2_000_000);
  });

  it('should compute order for insertion between tasks with odd sum', () => {
    const result = calculateOrder({
      prev: 1_000_000,
      next: 4_000_000,
      type: 'task',
    });

    expect(result).toBe(2_500_000);
  });

  it('should return 0 for first task when no prev and no next', () => {
    const result = calculateOrder({
      prev: undefined,
      next: undefined,
      type: 'task',
    });

    expect(result).toBe(0);
  });
});

describe('column normalization scenarios', () => {
  it('should simulate 15 column moves with neighboring columns', () => {
    let columns = [
      { id: '1', order: 1_000_000 },
      { id: '2', order: 2_000_000 },
      { id: '3', order: 3_000_000 },
      { id: '4', order: 4_000_000 },
    ];

    for (let i = 0; i < 15; i++) {
      const lastColumnIndex = columns.length - 1;

      const secondColumn = columns[1]!;
      const thirdColumn = columns[2]!;

      const newOrder = calculateOrder({
        type: 'column',
        prev: secondColumn?.order,
        next: thirdColumn?.order,
      });

      columns[lastColumnIndex]!.order = newOrder;

      const newColumns = arrayMove(
        columns,
        lastColumnIndex - 1,
        lastColumnIndex,
      );

      columns = newColumns;
    }

    // Проверяем, что каждый элемент меньше следующего
    for (let i = 0; i < columns.length - 1; i++) {
      expect(columns[i]!.order).toBeLessThan(columns[i + 1]!.order);
    }
  });

  it('should move last column between first and second 15 times', () => {
    let columns = [
      { id: '1', order: 1_000_000 },
      { id: '2', order: 2_000_000 },
      { id: '3', order: 3_000_000 },
      { id: '4', order: 4_000_000 },
      { id: '5', order: 5_000_000 },
      { id: '6', order: 6_000_000 },
      { id: '7', order: 7_000_000 },
      { id: '8', order: 8_000_000 },
      { id: '9', order: 9_000_000 },
      { id: '10', order: 10_000_000 },
    ];

    for (let i = 0; i < 15; i++) {
      const lastColumnIndex = columns.length - 1;
      const firstColumn = columns[0];
      const secondColumn = columns[1];

      const newOrder = calculateOrder({
        type: 'column',
        prev: firstColumn?.order,
        next: secondColumn?.order,
      });

      columns[lastColumnIndex]!.order = newOrder;

      const newColumns = arrayMove(
        columns,
        lastColumnIndex,
        1, // Move to position between 1 and 2
      );

      columns = newColumns;
    }

    // Проверяем, что каждый элемент меньше следующего
    for (let i = 0; i < columns.length - 1; i++) {
      expect(columns[i]!.order).toBeLessThan(columns[i + 1]!.order);
    }
  });

  it('should move columns in different patterns', () => {
    let columns = [
      { id: '1', order: 1_000_000 },
      { id: '2', order: 2_000_000 },
      { id: '3', order: 3_000_000 },
      { id: '4', order: 4_000_000 },
      { id: '5', order: 5_000_000 },
    ];

    // Pattern: move last to beginning, then to end, then to middle
    for (let i = 0; i < 15; i++) {
      const lastColumnIndex = columns.length - 1;
      const pattern = i % 3; // 0: to beginning, 1: to end, 2: to middle

      let newOrder: number;
      let targetIndex: number;

      if (pattern === 0) {
        // Move to beginning
        newOrder = calculateOrder({ type: 'column', next: columns[0]!.order });
        targetIndex = 0;
      } else if (pattern === 1) {
        // Move to end
        newOrder = calculateOrder({
          type: 'column',
          prev: columns[columns.length - 1]?.order,
        });

        targetIndex = columns.length;
      } else {
        // Move to middle
        const middleIndex = Math.floor(columns.length / 2);
        newOrder = calculateOrder({
          type: 'column',
          prev: columns[middleIndex - 1]?.order,
          next: columns[middleIndex]?.order,
        });
        targetIndex = middleIndex;
      }

      columns[lastColumnIndex]!.order = newOrder;

      const newColumns = arrayMove(columns, lastColumnIndex, targetIndex);

      columns = newColumns;
    }

    for (let i = 0; i < columns.length - 1; i++) {
      expect(columns[i]!.order).toBeLessThan(columns[i + 1]!.order);
    }
  });

  it('should handle rapid consecutive moves', () => {
    let columns = [
      { id: '1', order: 1_000_000 },
      { id: '2', order: 2_000_000 },
      { id: '3', order: 3_000_000 },
      { id: '4', order: 4_000_000 },
    ];

    for (let i = 0; i < 15; i++) {
      const columnToMove = columns[3];
      const targetPosition = (i % 3) + 1;

      const prevColumn = columns[targetPosition - 1]!;
      const nextColumn = columns[targetPosition]!;

      const newOrder = calculateOrder({
        type: 'column',
        prev: prevColumn.order,
        next: nextColumn.order,
      });

      columnToMove!.order = newOrder;

      const newColumns = arrayMove(columns, 3, targetPosition);

      columns = newColumns;
    }

    for (let i = 0; i < columns.length - 1; i++) {
      expect(columns[i]!.order).toBeLessThan(columns[i + 1]!.order);
    }
  });
});
