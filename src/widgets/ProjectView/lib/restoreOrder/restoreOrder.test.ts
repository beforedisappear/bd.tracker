import { restoreOrder } from './restoreOrder';
import type { Column, Task } from '@/entities/Board/testing';

const testColumns: Column[] = [
  {
    id: '4',
    name: 'Column 4',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    boardId: '1',
    order: 4_000_000,
    tasks: [],
    projectId: '1',
  },
  {
    id: '1',
    name: 'Column 1',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    boardId: '1',
    order: 1_000_000,
    tasks: [],
    projectId: '1',
  },
  {
    id: '3',
    name: 'Column 3',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    boardId: '1',
    order: 3_000_000,
    tasks: [],
    projectId: '1',
  },
  {
    id: '2',
    name: 'Column 2',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    boardId: '1',
    order: 2_000_000,
    tasks: [],
    projectId: '1',
  },
];

const firstColumn = testColumns[1];
const secondColumn = testColumns[3];
const thirdColumn = testColumns[2];
const fourthColumn = testColumns[0];

const testTasks: Task[] = [
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    color: 'GREEN',
    isDone: false,
    isArchived: false,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    columnId: '1',
    order: 3_000_000,
    projectId: '1',
    assignees: [],
    stickers: [],
    startDate: null,
    endDate: null,
  },
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    color: 'INDIGO',
    isDone: false,
    isArchived: false,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    columnId: '1',
    order: 1_000_000,
    projectId: '1',
    assignees: [],
    stickers: [],
    startDate: null,
    endDate: null,
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    color: 'RED',
    isDone: false,
    isArchived: false,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    columnId: '1',
    order: 2_000_000,
    projectId: '1',
    assignees: [],
    stickers: [],
    startDate: null,
    endDate: null,
  },
];

const firstTask = testTasks[0];
const secondTask = testTasks[1];
const thirdTask = testTasks[2];

describe('restoreOrder', () => {
  it('should restore columns order', () => {
    const restoredColumns = restoreOrder(testColumns);

    expect(restoredColumns).toEqual([
      firstColumn,
      secondColumn,
      thirdColumn,
      fourthColumn,
    ]);
  });

  it('should restore tasks order', () => {
    const restoredTasks = restoreOrder(testTasks);

    expect(restoredTasks).toEqual([secondTask, thirdTask, firstTask]);
  });
});
