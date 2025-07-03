import type { CreateBoardDtoRes, GetAllBoardsDtoRes } from '../types';
import type { AxiosResponse } from 'axios';

type Res = AxiosResponse<CreateBoardDtoRes>;
type Cache = AxiosResponse<GetAllBoardsDtoRes>;

export const createBoardQueryUpdater = (res: Res) => (cachedData: Cache) => ({
  ...cachedData,
  data: [...cachedData.data, res.data],
});
