import { restoreColumnsOrder } from './restoreColumnsOrder';
import type { Column } from '@/entities/Board/testing';

const testColumns: Column[] = [
  {
    id: '4',
    name: 'Column 4',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    boardId: '1',
    nextColumnId: null,
    tasks: [],
    previousColumn: { id: '3' },
    projectId: '1',
  },
  {
    id: '1',
    nextColumnId: '2',
    name: 'Column 1',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    boardId: '1',
    tasks: [],
    previousColumn: null,
    projectId: '1',
  },
  {
    id: '3',
    nextColumnId: '4',
    name: 'Column 3',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    boardId: '1',
    tasks: [],
    previousColumn: { id: '2' },
    projectId: '1',
  },
  {
    id: '2',
    nextColumnId: '3',
    name: 'Column 2',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    boardId: '1',
    tasks: [],
    previousColumn: { id: '1' },
    projectId: '1',
  },
];

const firstColumnId = testColumns[1].id;
const secondColumnId = testColumns[3].id;
const thirdColumnId = testColumns[2].id;
const fourthColumnId = testColumns[0].id;

describe('restoreColumnsOrder', () => {
  it('should restore columns order', () => {
    const restoredColumns = restoreColumnsOrder(testColumns);

    const columnIds = restoredColumns.map(column => column.id);

    expect(columnIds).toEqual([
      firstColumnId,
      secondColumnId,
      thirdColumnId,
      fourthColumnId,
    ]);
  });
});
