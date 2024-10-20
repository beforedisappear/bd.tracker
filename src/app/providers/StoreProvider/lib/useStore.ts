import { useStore as useZustandStore } from "zustand";
import { useContext } from "react";
import { StoreContext } from "./StoreContext";

import type { Store } from "../ui/StoreProvider";

export const useStore = <T>(selector: (store: Store) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error(`useStore must be used within StoreProvider`);
  }

  return useZustandStore(storeContext, selector);
};
