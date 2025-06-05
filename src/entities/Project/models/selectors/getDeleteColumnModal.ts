import { useShallow } from 'zustand/react/shallow';

import type { ProjectStore } from '../store/types';

export const getDeleteColumnModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: ProjectStore) => ({
    deletingColumnId: state.deletingColumnId,
    showDeleteColumnModal: state.showDeleteColumnModal,
    setDeletingColumnId: state.setDeletingColumnId,
    setShowDeleteColumnModal: state.setShowDeleteColumnModal,
  }));
