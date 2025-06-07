import { restoreTasksOrder } from './restoreTasksOrder';
import type { Task } from '@/entities/Board/testing';

const testTasks: Task[] = [
  {
    id: '4',
    title: 'Task 4',
    description: 'Description 4',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    columnId: '1',
    nextTaskId: null,
    projectId: '1',
    assignees: [],
    stickers: [],
    previousTask: { id: '3' },
    color: 'RED',
    isDone: false,
    isArchived: false,
    startDate: null,
    endDate: null,
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    columnId: '1',
    nextTaskId: '4',
    projectId: '1',
    assignees: [],
    stickers: [],
    previousTask: { id: '2' },
    color: 'RED',
    isDone: false,
    isArchived: false,
    startDate: null,
    endDate: null,
  },
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    columnId: '1',
    nextTaskId: '2',
    projectId: '1',
    assignees: [],
    stickers: [],
    previousTask: null,
    color: 'RED',
    isDone: false,
    isArchived: false,
    startDate: null,
    endDate: null,
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    columnId: '1',
    nextTaskId: '3',
    projectId: '1',
    assignees: [],
    stickers: [],
    previousTask: { id: '1' },
    color: 'RED',
    isDone: false,
    isArchived: false,
    startDate: null,
    endDate: null,
  },
];

const firstTaskId = testTasks[2].id;
const secondTaskId = testTasks[3].id;
const thirdTaskId = testTasks[1].id;
const fourthTaskId = testTasks[0].id;

describe('restoreTasksOrder', () => {
  it('should restore tasks order', () => {
    const restoredTasks = restoreTasksOrder(testTasks);

    const taskIds = restoredTasks.map(task => task.id);

    expect(taskIds).toEqual([
      firstTaskId,
      secondTaskId,
      thirdTaskId,
      fourthTaskId,
    ]);
  });
});
