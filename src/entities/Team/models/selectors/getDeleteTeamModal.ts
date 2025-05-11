/* eslint-disable react-hooks/rules-of-hooks */
import { useShallow } from 'zustand/react/shallow';
import type { TeamStore } from '../store/types';

export const getDeleteTeamModal = () =>
  useShallow((state: TeamStore) => ({
    showDeleteTeamModal: state.showDeleteTeamModal,
    setShowDeleteTeamModal: state.setShowDeleteTeamModal,
  }));
