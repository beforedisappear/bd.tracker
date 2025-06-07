export interface BoardStoreState {
  showDeleteColumnModal: boolean;
  currentColumnId: string | null;
  showCreateTaskModal: boolean;
}

export interface BoardStoreActions {
  setShowDeleteColumnModal: (show: boolean) => void;
  setCurrentColumnId: (id: string | null) => void;
  setShowCreateTaskModal: (show: boolean) => void;
}

export type BoardStore = BoardStoreState & BoardStoreActions;
