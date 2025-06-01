import { useShallow } from 'zustand/react/shallow';

import type { PrivateGlobalStore } from '@/shared/store/privateGlobalStore';

export const getProjectMembersModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: PrivateGlobalStore) => ({
    showProjectMembersModal: state.showProjectMembersModal,
    setShowProjectMembersModal: state.setShowProjectMembersModal,
  }));
