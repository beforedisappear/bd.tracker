import { createStore as createZustandStore } from 'zustand/vanilla';

interface IPrivateGlobalStoreState {
  teamIdBySlugMap: Record<string, string>;
}

interface IPrivateGlobalStoreActions {
  setTeamIdBySlugMap: (map: Record<string, string>) => void;
}

export type PrivateGlobalStore = IPrivateGlobalStoreState &
  IPrivateGlobalStoreActions;

export type PrivateGlobalStoreApi = ReturnType<typeof createPrivateGlobalStore>;

const defaultInitState: IPrivateGlobalStoreState = {
  teamIdBySlugMap: {},
};

export const createPrivateGlobalStore = (
  initState: IPrivateGlobalStoreState = defaultInitState,
) => {
  return createZustandStore<PrivateGlobalStore>()(set => ({
    ...initState,
    setTeamIdBySlugMap: (map: Record<string, string>) => {
      set({ teamIdBySlugMap: map });
    },
  }));
};
