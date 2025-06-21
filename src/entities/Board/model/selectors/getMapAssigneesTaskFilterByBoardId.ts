import { useShallow } from 'zustand/react/shallow';

import type { BoardStore } from '../store/types';

export const getMapAssigneesTaskFilterByBoardId = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: BoardStore) => ({
    mapAssigneesTaskFilterByBoardId: state.mapAssigneesTaskFilterByBoardId,
    setMapAssigneesTaskFilterByBoardId:
      state.setMapAssigneesTaskFilterByBoardId,
  }));
