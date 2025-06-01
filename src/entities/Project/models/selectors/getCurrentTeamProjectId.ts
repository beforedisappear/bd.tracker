import { useShallow } from 'zustand/react/shallow';

import type { PrivateGlobalStore } from '@/shared/store/privateGlobalStore';

export const getCurrentTeamProjectId = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: PrivateGlobalStore) => ({
    currentProjectId: state.currentProjectId,
    setCurrentProjectId: state.setCurrentProjectId,
  }));
