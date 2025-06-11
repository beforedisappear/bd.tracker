import { useShallow } from 'zustand/react/shallow';

import type { BoardStore } from '../store/types';

export const getAllMapTaskFilters = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: BoardStore) => ({
    mapColorTaskFilterByBoardId: state.mapColorTaskFilterByBoardId,
    mapAssigneesTaskFilterByBoardId: state.mapAssigneesTaskFilterByBoardId,
    mapDateRangeTaskFilterByBoardId: state.mapDateRangeTaskFilterByBoardId,
  }));
