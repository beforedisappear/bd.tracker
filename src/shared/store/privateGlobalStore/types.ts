export interface IPrivateGlobalStoreState {
  teamIdBySlugMap: Record<string, string>;
  showProjectMembersModal: boolean;
  currentProjectId: string | null;
}

export interface IPrivateGlobalStoreActions {
  setTeamIdBySlugMap: (map: Record<string, string>) => void;
  setShowProjectMembersModal: (show: boolean) => void;
  setCurrentProjectId: (id: string | null) => void;
}

export type PrivateGlobalStore = IPrivateGlobalStoreState &
  IPrivateGlobalStoreActions;
