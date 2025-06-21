import { useShallow } from 'zustand/react/shallow';

import type { PrivateGlobalStore } from '@/shared/store/privateGlobalStore';

export const getDeleteProjectModalActions = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: PrivateGlobalStore) => ({
    setCurrentProjectId: state.setCurrentProjectId,
    setShowDeleteProjectModal: state.setShowDeleteProjectModal,
  }));
