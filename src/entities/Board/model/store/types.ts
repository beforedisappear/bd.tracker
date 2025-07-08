import type { DateRange } from '../types/dateRange';
import type { Color } from '../types';
import { StateCreator } from 'zustand';

export interface BoardStoreState {
  showDeleteColumnModal: boolean;
  currentColumnId: string | null;
  showCreateTaskModal: boolean;
  mapColorTaskFilterByBoardId: Record<string, Color[] | undefined>;
  mapAssigneesTaskFilterByBoardId: Record<string, string[] | undefined>;
  mapDateRangeTaskFilterByBoardId: Record<string, DateRange | undefined>;
  mapStickerTaskFilterByBoardId: Record<string, string[] | undefined>;
}

export interface BoardStoreActions {
  setCurrentColumnId: (id: string | null) => void;
  setShowDeleteColumnModal: (show: boolean) => void;
  setShowCreateTaskModal: (show: boolean) => void;
  setMapColorTaskFilterByBoardId: (boardId: string, colors: Color[]) => void;
  setMapAssigneesTaskFilterByBoardId: (
    boardId: string,
    assignees: string[],
  ) => void;
  setMapDateRangeTaskFilterByBoardId: (
    boardId: string,
    date: DateRange,
  ) => void;
  setMapStickerTaskFilterByBoardId: (
    boardId: string,
    stickers: string[],
  ) => void;
  clearAllMapFilters: () => void;
}

export type BoardStore = BoardStoreState & BoardStoreActions;

export type CreateBoardStoreArgs = Parameters<StateCreator<BoardStore, [], []>>;
