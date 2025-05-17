export type TeamMember = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  isAdmin: boolean;
};

export type GetTeamMembersDtoRes = TeamMember[];

export type GetTeamMembersDtoReq = {
  idOrSlug: string;
  keyword?: string;
};
