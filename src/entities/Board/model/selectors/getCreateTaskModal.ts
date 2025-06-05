import { useShallow } from 'zustand/react/shallow';

import type { BoardStore } from '../store/types';

export const getCreateTaskModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: BoardStore) => ({
    showCreateTaskModal: state.showCreateTaskModal,
    setShowCreateTaskModal: state.setShowCreateTaskModal,
  }));
