import type {
  IProjectSliceActions,
  IProjectSliceState,
} from './slices/projectSlice';
import type { IBoardSliceActions, IBoardSliceState } from './slices/boardSlice';

export interface IPrivateGlobalStoreState
  extends IProjectSliceState,
    IBoardSliceState {
  teamIdBySlugMap: Record<string, string>;
}

export interface IPrivateGlobalStoreActions
  extends IProjectSliceActions,
    IBoardSliceActions {
  setTeamIdBySlugMap: (map: Record<string, string>) => void;
}

export type PrivateGlobalStore = IPrivateGlobalStoreState &
  IPrivateGlobalStoreActions;
