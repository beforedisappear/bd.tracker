"use client";

import { createStore as createZustandStore } from "zustand/vanilla";
import { StoreContext } from "../lib/StoreContext";
import { type ReactNode, useRef } from "react";

interface IStoreState {}

interface IStoreActions {}

export type Store = IStoreState & IStoreActions;

export type StoreApi = ReturnType<typeof createStore>;

const defaultInitState: IStoreState = {
  adTooltipData: null,
};

export const createStore = (initState: IStoreState = defaultInitState) => {
  return createZustandStore<Store>()((set, get, store) => ({
    ...initState,
  }));
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};
