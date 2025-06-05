export interface ProjectStoreState {
  deletingColumnId: string | null;
  showDeleteColumnModal: boolean;
}

export interface ProjectStoreActions {
  setDeletingColumnId: (id: string | null) => void;
  setShowDeleteColumnModal: (show: boolean) => void;
}

export type ProjectStore = ProjectStoreState & ProjectStoreActions;
