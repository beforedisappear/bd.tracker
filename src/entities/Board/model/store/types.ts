import type { Color } from '../types';

export interface BoardStoreState {
  showDeleteColumnModal: boolean;
  currentColumnId: string | null;
  showCreateTaskModal: boolean;
  mapColorTaskFilterByBoardId: Record<string, Color[] | undefined>;
  mapAssigneesTaskFilterByBoardId: Record<string, string[] | undefined>;
}

export interface BoardStoreActions {
  setShowDeleteColumnModal: (show: boolean) => void;
  setCurrentColumnId: (id: string | null) => void;
  setShowCreateTaskModal: (show: boolean) => void;
  setMapColorTaskFilterByBoardId: (boardId: string, colors: Color[]) => void;
  setMapAssigneesTaskFilterByBoardId: (
    boardId: string,
    assignees: string[],
  ) => void;
  clearAllMapFilters: () => void;
}

export type BoardStore = BoardStoreState & BoardStoreActions;
