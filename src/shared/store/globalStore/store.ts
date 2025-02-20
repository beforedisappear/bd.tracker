import { createStore as createZustandStore } from 'zustand/vanilla';

interface IGlobalStoreState {}

interface IGlobalStoreActions {}

export type GlobalStore = IGlobalStoreState & IGlobalStoreActions;

export type GlobalStoreApi = ReturnType<typeof createStore>;

const defaultInitState: IGlobalStoreState = {};

export const createStore = (
  initState: IGlobalStoreState = defaultInitState,
) => {
  return createZustandStore<GlobalStore>()(() => ({
    ...initState,
  }));
};
