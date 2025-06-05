import { useShallow } from 'zustand/react/shallow';

import type { PrivateGlobalStore } from '@/shared/store/privateGlobalStore/types';

export const getDeleteBoardModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: PrivateGlobalStore) => ({
    showDeleteBoardModal: state.showDeleteBoardModal,
    setShowDeleteBoardModal: state.setShowDeleteBoardModal,
  }));
