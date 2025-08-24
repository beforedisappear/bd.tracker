export interface TeamStoreState {
  deletingTeam: { id: string; slug: string } | null;
  showDeleteTeamModal: boolean;
  showTeamMemberProfileModal: boolean;
  currentTeamMemberId: string | null;
}

export interface TeamStoreActions {
  setDeletingTeam: (team: { id: string; slug: string } | null) => void;
  setShowDeleteTeamModal: (show: boolean) => void;
  setShowTeamMemberProfileModal: (show: boolean) => void;
  setCurrentTeamMemberId: (id: string | null) => void;
}

export type TeamStore = TeamStoreState & TeamStoreActions;
