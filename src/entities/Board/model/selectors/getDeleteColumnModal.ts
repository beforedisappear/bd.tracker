import { useShallow } from 'zustand/react/shallow';

import type { BoardStore } from '../store/types';

export const getDeleteColumnModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: BoardStore) => ({
    showDeleteColumnModal: state.showDeleteColumnModal,
    setShowDeleteColumnModal: state.setShowDeleteColumnModal,
    deletingColumnId: state.deletingColumnId,
    setDeletingColumnId: state.setDeletingColumnId,
  }));
