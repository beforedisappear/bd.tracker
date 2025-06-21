import { BoardStickerFieldLoading } from './BoardStickerField.loading';
import { BoardStickerFieldContent } from '../BoardStickerFieldContent/BoardStickerFieldContent';
import { ErrorBoundary } from '@/shared/ui/c';

import { stickerQueries } from '../../api';

import { useQuery } from '@tanstack/react-query';

import type { CheckedState } from '@radix-ui/react-checkbox';

interface Props {
  boardId: string;
  onCheckedChange: (value: CheckedState, id: string) => void;
}

export function BoardStickerInput(props: Props) {
  const { boardId, onCheckedChange } = props;

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery(stickerQueries.getBoardStickers({ boardId }));

  if (isLoading) return <BoardStickerFieldLoading />;
  else if (isError) return <ErrorBoundary />;

  return (
    <BoardStickerFieldContent data={data} onCheckedChange={onCheckedChange} />
  );
}
