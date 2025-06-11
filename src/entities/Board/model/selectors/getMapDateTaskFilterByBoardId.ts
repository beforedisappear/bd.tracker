import { useShallow } from 'zustand/react/shallow';

import type { BoardStore } from '../store/types';

export const getMapDateTaskFilterByBoardId = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: BoardStore) => ({
    mapDateTaskFilterByBoardId: state.mapDateTaskFilterByBoardId,
    setMapDateTaskFilterByBoardId: state.setMapDateTaskFilterByBoardId,
  }));
