import { apiClient } from '@/shared/api/apiClient';
import type { GetBoardByIdDtoReq, GetBoardByIdDtoRes } from '../../model/types';
import { createQueryString } from '@/shared/lib/url/createQueryString/createQueryString';

export const getBoardById = async (dto: GetBoardByIdDtoReq) => {
  const { boardId, colors, assigneeIds, dateRange, stickerIds } = dto;

  const dateRangeParam =
    dateRange && dateRange.from && dateRange.to
      ? [dateRange.from.toISOString(), dateRange.to.toISOString()]
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
