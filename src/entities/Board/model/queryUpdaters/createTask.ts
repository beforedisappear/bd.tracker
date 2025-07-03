import type { AxiosResponse } from 'axios';
import type { GetBoardByIdDtoRes, CreateTaskDtoRes } from '../types';

type Res = AxiosResponse<CreateTaskDtoRes>;
type Cache = GetBoardByIdDtoRes;

export const createTaskQueryUpdater =
  ({ data }: Res) =>
  (oldData: Cache) => {
    const targetColumn = oldData.columns.find(
      column => column.id === data.columnId,
    );

    if (!targetColumn) {
      return oldData;
    }

    return {
      ...oldData,
      columns: oldData.columns.map(column =>
        column.id === targetColumn.id
          ? { ...column, tasks: [...column.tasks, data] }
          : column,
      ),
    };
  };
