import { useShallow } from 'zustand/react/shallow';

import type { ProjectStore } from '../store/types';

export const getCreateTaskModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: ProjectStore) => ({
    showCreateTaskModal: state.showCreateTaskModal,
    setShowCreateTaskModal: state.setShowCreateTaskModal,
  }));
