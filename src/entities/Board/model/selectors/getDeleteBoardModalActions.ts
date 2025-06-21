import { useShallow } from 'zustand/react/shallow';

import type { PrivateGlobalStore } from '@/shared/store/privateGlobalStore';

export const getDeleteBoardModalActions = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: PrivateGlobalStore) => ({
    setShowDeleteBoardModal: state.setShowDeleteBoardModal,
    setCurrentBoardId: state.setCurrentBoardId,
  }));
