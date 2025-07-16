import { apiClient } from '@/shared/api/apiClient';
import { createQueryString } from '@/shared/lib/url';
import type { GetBoardByIdDtoReq, GetBoardByIdDtoRes } from '../../model/types';

export const getBoardById = async (dto: GetBoardByIdDtoReq) => {
  const { boardId, colors, assigneeIds, dateRange, stickerIds } = dto;

  const dateRangeParam =
    dateRange && dateRange.from && dateRange.to
      ? [dateRange.from, dateRange.to]
      : undefined;

  const queryString = createQueryString({
    colors,
    assigneeIds,
    stickerIds,
    dateRange: dateRangeParam,
  });

  return apiClient.withAuth
    .get<GetBoardByIdDtoRes>(`/board/${boardId}`, {
      params: new URLSearchParams(queryString),
    })
    .then(res => res.data);
};
