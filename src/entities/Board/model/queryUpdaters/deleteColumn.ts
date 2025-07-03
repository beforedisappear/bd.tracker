import type { AxiosResponse } from 'axios';
import type { DeleteColumnDtoRes, GetBoardByIdDtoRes } from '../types';

type Res = AxiosResponse<DeleteColumnDtoRes>;
type CacheData = GetBoardByIdDtoRes;

export const deleteColumnQueryUpdater = (res: Res) => (oldData: CacheData) => ({
  ...oldData,
  columns: oldData.columns.filter(column => column.id !== res.data.id),
});
