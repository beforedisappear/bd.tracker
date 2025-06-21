import { useShallow } from 'zustand/react/shallow';

import type { PrivateGlobalStore } from '@/shared/store/privateGlobalStore';

export const getDeleteProjectModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: PrivateGlobalStore) => ({
    currentProjectId: state.currentProjectId,
    showDeleteProjectModal: state.showDeleteProjectModal,
    setCurrentProjectId: state.setCurrentProjectId,
    setShowDeleteProjectModal: state.setShowDeleteProjectModal,
  }));
