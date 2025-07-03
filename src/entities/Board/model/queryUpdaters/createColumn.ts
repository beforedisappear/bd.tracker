import type { AxiosResponse } from 'axios';
import type { GetBoardByIdDtoRes, CreateColumnDtoRes } from '../types';

type Res = AxiosResponse<CreateColumnDtoRes>;
type CacheData = GetBoardByIdDtoRes;

export const createColumnQueryUpdater = (res: Res) => (oldData: CacheData) => ({
  ...oldData,
  columns: [...oldData.columns, res.data],
});
