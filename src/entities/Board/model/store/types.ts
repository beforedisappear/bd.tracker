export interface BoardStoreState {
  showDeleteColumnModal: boolean;
  deletingColumnId: string | null;
  showCreateTaskModal: boolean;
}

export interface BoardStoreActions {
  setShowDeleteColumnModal: (show: boolean) => void;
  setDeletingColumnId: (id: string | null) => void;
  setShowCreateTaskModal: (show: boolean) => void;
}

export type BoardStore = BoardStoreState & BoardStoreActions;
