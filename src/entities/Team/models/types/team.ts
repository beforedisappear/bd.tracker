export type CreateTeamDtoReq = {
  name: string;
};

export interface Team {
  name: string;
  id: string;
  slug: string;
  createdAt: string;
  ownerId: string;
  owned: boolean;
}

export type GetUserTeamListDtoRes = Team[];
