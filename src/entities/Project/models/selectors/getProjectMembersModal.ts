import { useShallow } from 'zustand/react/shallow';

import type { PrivateGlobalStore } from '@/shared/store/privateGlobalStore';

export const getProjectMembersModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: PrivateGlobalStore) => ({
    currentProjectId: state.currentProjectId,
    showProjectMembersModal: state.showProjectMembersModal,
    setCurrentProjectId: state.setCurrentProjectId,
    setShowProjectMembersModal: state.setShowProjectMembersModal,
  }));
