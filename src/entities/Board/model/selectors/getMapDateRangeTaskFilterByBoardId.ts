import { useShallow } from 'zustand/react/shallow';

import type { BoardStore } from '../store/types';

export const getMapDateRangeTaskFilterByBoardId = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: BoardStore) => ({
    mapDateRangeTaskFilterByBoardId: state.mapDateRangeTaskFilterByBoardId,
    setMapDateRangeTaskFilterByBoardId:
      state.setMapDateRangeTaskFilterByBoardId,
  }));
