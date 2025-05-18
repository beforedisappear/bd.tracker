export interface Team {
  name: string;
  id: string;
  slug: string;
  createdAt: string;
  ownerId: string;
}

export interface UserTeam extends Team {
  owned: boolean;
  admin: boolean;
}

export type CreateTeamDtoReq = {
  name: string;
};

export type RenameTeamDtoReq = {
  idOrSlug: string;
  name: string;
};

export type DeleteTeamDtoReq = {
  idOrSlug: string;
};

export type DeleteTeamDtoRes = {
  idOrSlug: string;
};

export type GetUserTeamListDtoRes = UserTeam[];

export type GetHaveAccessToTeamDto = {
  idOrSlug: string;
};

export type GetHaveAccessToTeamDtoRes = {
  inTeam: boolean;
  isAdmin: boolean;
  isOwner: boolean;
};

export type GetTeamByIdDtoReq = {
  idOrSlug: string;
};

export type GetTeamByIdDtoRes = Team;
