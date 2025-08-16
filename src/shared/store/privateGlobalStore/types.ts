export interface IPrivateGlobalStoreState {
  teamIdBySlugMap: Record<string, string>;
}

export interface IPrivateGlobalStoreActions {
  setTeamIdBySlugMap: (map: Record<string, string>) => void;
}

export type PrivateGlobalStore = IPrivateGlobalStoreState &
  IPrivateGlobalStoreActions;
