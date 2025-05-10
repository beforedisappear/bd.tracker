export interface Team {
  name: string;
  id: string;
  slug: string;
  createdAt: string;
  ownerId: string;
}

export interface UserTeam {
  name: string;
  id: string;
  slug: string;
  createdAt: string;
  ownerId: string;
  owned: boolean;
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
