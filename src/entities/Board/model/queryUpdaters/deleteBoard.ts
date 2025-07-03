import type { DeleteBoardDtoRes, GetAllBoardsDtoRes } from '../types';
import type { AxiosResponse } from 'axios';

type Res = AxiosResponse<DeleteBoardDtoRes>;
type Cache = AxiosResponse<GetAllBoardsDtoRes>;

export const deleteBoardQueryUpdater =
  (response: Res) => (cachedData: Cache) => ({
    ...cachedData,
    data: cachedData.data.filter(board => board.id !== response.data.id),
  });
