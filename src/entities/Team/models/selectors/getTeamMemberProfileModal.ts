/* eslint-disable react-hooks/rules-of-hooks */
import { useShallow } from 'zustand/react/shallow';

import type { TeamStore } from '../store/types';

export const getTeamMemberProfileModal = () =>
  useShallow((state: TeamStore) => ({
    showTeamMemberProfileModal: state.showTeamMemberProfileModal,
    setShowTeamMemberProfileModal: state.setShowTeamMemberProfileModal,
  }));
