export type CreateTeamDtoReq = {
  name: string;
};

export interface Team {
  name: string;
  id: string;
  slug: string;
  createdAt: string;
  ownerId: string;
}

export type GetUserTeamListDtoRes = Team[];
