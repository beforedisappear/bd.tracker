export interface IBoardSliceState {
  showDeleteBoardModal: boolean;
  showManageStickersModal: boolean;
  currentBoardId: string | null;
}

export interface IBoardSliceActions {
  setCurrentBoardId: (id: string | null) => void;
  setShowDeleteBoardModal: (show: boolean) => void;
  setShowManageStickersModal: (show: boolean) => void;
}
