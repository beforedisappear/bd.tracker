import { useShallow } from 'zustand/react/shallow';

import type { BoardStore } from '../store';

export const getMapStickerTaskFilterByBoardId = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: BoardStore) => ({
    mapStickerTaskFilterByBoardId: state.mapStickerTaskFilterByBoardId,
    setMapStickerTaskFilterByBoardId: state.setMapStickerTaskFilterByBoardId,
  }));
