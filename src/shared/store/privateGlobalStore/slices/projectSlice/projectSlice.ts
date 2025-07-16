import type { StateCreator } from 'zustand';
import type { PrivateGlobalStore } from '../../types';
import type { IProjectSliceState, IProjectSliceActions } from './types';

type ProjectSlice = IProjectSliceState & IProjectSliceActions;

type CreateSlice = StateCreator<PrivateGlobalStore, [], [], ProjectSlice>;

export const createProjectSlice: CreateSlice = set => ({
  currentProjectId: null,
  showProjectMembersModal: false,
  showDeleteProjectModal: false,
  setCurrentProjectId: payload => set(() => ({ currentProjectId: payload })),
  setShowProjectMembersModal: payload =>
    set(() => ({ showProjectMembersModal: payload })),
  setShowDeleteProjectModal: payload =>
    set(() => ({ showDeleteProjectModal: payload })),
});
