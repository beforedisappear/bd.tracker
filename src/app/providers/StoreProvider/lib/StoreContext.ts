import { createContext } from "react";

import type { StoreApi } from "../ui/StoreProvider";

export const StoreContext = createContext<StoreApi | undefined>(undefined);
