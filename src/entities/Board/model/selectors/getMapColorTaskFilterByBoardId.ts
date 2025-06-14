import { useShallow } from 'zustand/react/shallow';

import type { BoardStore } from '../store/types';

export const getMapColorTaskFilterByBoardId = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: BoardStore) => ({
    mapColorTaskFilterByBoardId: state.mapColorTaskFilterByBoardId,
    setMapColorTaskFilterByBoardId: state.setMapColorTaskFilterByBoardId,
  }));
