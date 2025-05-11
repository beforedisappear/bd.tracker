import { createStore as createZustandStore } from 'zustand/vanilla';

interface IPrivateGlobalStoreState {}

interface IPrivateGlobalStoreActions {}

export type PrivateGlobalStore = IPrivateGlobalStoreState &
  IPrivateGlobalStoreActions;

export type PrivateGlobalStoreApi = ReturnType<typeof createPrivateGlobalStore>;

const defaultInitState: IPrivateGlobalStoreState = {};

export const createPrivateGlobalStore = (
  initState: IPrivateGlobalStoreState = defaultInitState,
) => {
  return createZustandStore<PrivateGlobalStore>()(() => ({
    ...initState,
  }));
};
