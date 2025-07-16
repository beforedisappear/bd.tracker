export interface IProjectSliceState {
  currentProjectId: string | null;
  showProjectMembersModal: boolean;
  showDeleteProjectModal: boolean;
}

export interface IProjectSliceActions {
  setCurrentProjectId: (id: string | null) => void;
  setShowProjectMembersModal: (show: boolean) => void;
  setShowDeleteProjectModal: (show: boolean) => void;
}
