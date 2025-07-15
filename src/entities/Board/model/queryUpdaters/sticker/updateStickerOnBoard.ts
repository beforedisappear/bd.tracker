import type { GetBoardByIdDtoRes, UpdateBoardStickerDtoRes } from '../../types';

type Res = UpdateBoardStickerDtoRes;
type Cache = GetBoardByIdDtoRes;

export const updateStickerOnBoardQueryUpdater =
  (res: Res) => (oldData: Cache) => {
    if (res.boardId !== oldData.id) return oldData;

    return {
      ...oldData,
      columns: oldData.columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task => ({
          ...task,
          stickers: task.stickers.map(sticker =>
            sticker.id === res.id ? res : sticker,
          ),
        })),
      })),
    };
  };
