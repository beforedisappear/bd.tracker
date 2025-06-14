export interface IPrivateGlobalStoreState {
  teamIdBySlugMap: Record<string, string>;
  showProjectMembersModal: boolean;
  showDeleteProjectModal: boolean;
  showDeleteBoardModal: boolean;
  showManageStickersModal: boolean;
  currentProjectId: string | null;
  currentBoardId: string | null;
}

export interface IPrivateGlobalStoreActions {
  setTeamIdBySlugMap: (map: Record<string, string>) => void;
  setShowProjectMembersModal: (show: boolean) => void;
  setShowDeleteProjectModal: (show: boolean) => void;
  setShowDeleteBoardModal: (show: boolean) => void;
  setShowManageStickersModal: (show: boolean) => void;
  setCurrentProjectId: (id: string | null) => void;
  setCurrentBoardId: (id: string | null) => void;
}

export type PrivateGlobalStore = IPrivateGlobalStoreState &
  IPrivateGlobalStoreActions;
