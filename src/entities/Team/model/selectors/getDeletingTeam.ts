/* eslint-disable react-hooks/rules-of-hooks */
import { useShallow } from 'zustand/react/shallow';

import type { TeamStore } from '../store/types';

export const getDeletingTeam = () =>
  useShallow((state: TeamStore) => ({
    deletingTeam: state.deletingTeam,
    setDeletingTeam: state.setDeletingTeam,
  }));
