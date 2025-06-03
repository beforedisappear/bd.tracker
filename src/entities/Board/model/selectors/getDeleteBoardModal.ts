import type { PrivateGlobalStore } from '@/shared/store/privateGlobalStore/types';
import { useShallow } from 'zustand/react/shallow';

export const getDeleteBoardModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: PrivateGlobalStore) => ({
    showDeleteBoardModal: state.showDeleteBoardModal,
    deletingBoardId: state.deletingBoardId,
    setShowDeleteBoardModal: state.setShowDeleteBoardModal,
    setDeletingBoardId: state.setDeletingBoardId,
  }));
