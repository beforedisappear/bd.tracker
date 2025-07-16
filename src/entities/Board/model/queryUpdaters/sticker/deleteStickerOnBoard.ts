import type { GetBoardByIdDtoRes, DeleteBoardStickerDtoReq } from '../../types';

type Args = DeleteBoardStickerDtoReq;
type Cache = GetBoardByIdDtoRes;

export const deleteStickerOnBoardQueryUpdater =
  (args: Args) => (oldData: Cache) => {
    if (args.boardId !== oldData.id) return oldData;

    return {
      ...oldData,
      columns: oldData.columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task => ({
          ...task,
          stickers: task.stickers.filter(sticker => sticker.id !== args.id),
        })),
      })),
    };
  };
