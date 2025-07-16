import type { StateCreator } from 'zustand';
import type { PrivateGlobalStore } from '../../types';
import type { IBoardSliceState, IBoardSliceActions } from './types';

type BoardSlice = IBoardSliceState & IBoardSliceActions;

type CreateSlice = StateCreator<PrivateGlobalStore, [], [], BoardSlice>;

export const createBoardSlice: CreateSlice = set => ({
  showDeleteBoardModal: false,
  showManageStickersModal: false,
  currentBoardId: null,
  setShowDeleteBoardModal: payload =>
    set(() => ({ showDeleteBoardModal: payload })),
  setShowManageStickersModal: payload =>
    set(() => ({ showManageStickersModal: payload })),
  setCurrentBoardId: payload => set(() => ({ currentBoardId: payload })),
});
