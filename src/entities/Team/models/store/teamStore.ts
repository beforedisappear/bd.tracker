import { createStore as createZustandStore } from 'zustand/vanilla';

import type { TeamStore, TeamStoreState } from './types';

export type TeamStoreApi = ReturnType<typeof createTeamStore>;

const defaultInitState: TeamStoreState = {
  deletingTeam: null,
  showDeleteTeamModal: false,
};

export const createTeamStore = (
  initState: TeamStoreState = defaultInitState,
) => {
  return createZustandStore<TeamStore>()(set => ({
    ...initState,
    setDeletingTeam: team => set({ deletingTeam: team }),
    setShowDeleteTeamModal: show => set({ showDeleteTeamModal: show }),
  }));
};
