export interface ProjectStoreState {
  deletingColumnId: string | null;
  showDeleteColumnModal: boolean;
  showCreateTaskModal: boolean;
}

export interface ProjectStoreActions {
  setDeletingColumnId: (id: string | null) => void;
  setShowDeleteColumnModal: (show: boolean) => void;
  setShowCreateTaskModal: (show: boolean) => void;
}

export type ProjectStore = ProjectStoreState & ProjectStoreActions;
