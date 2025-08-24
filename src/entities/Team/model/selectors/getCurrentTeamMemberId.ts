/* eslint-disable react-hooks/rules-of-hooks */
import { useShallow } from 'zustand/react/shallow';

import type { TeamStore } from '../store/types';

export const getCurrentTeamMemberId = () =>
  useShallow((state: TeamStore) => ({
    currentTeamMemberId: state.currentTeamMemberId,
    setCurrentTeamMemberId: state.setCurrentTeamMemberId,
  }));
