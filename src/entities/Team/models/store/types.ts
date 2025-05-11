export interface TeamStoreState {
  deletingTeam: { id: string; slug: string } | null;
  showDeleteTeamModal: boolean;
}

export interface TeamStoreActions {
  setDeletingTeam: (team: { id: string; slug: string } | null) => void;
  setShowDeleteTeamModal: (show: boolean) => void;
}

export type TeamStore = TeamStoreState & TeamStoreActions;
