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

export type GetTeamMemberByIdDtoReq = {
  teamIdOrSlug: string;
  memberId: string;
};

export type GetTeamMemberByIdDtoRes = TeamMember;

export type DeleteTeamMemberDtoReq = {
  teamIdOrSlug: string;
  memberId: string;
};

export type DeleteTeamMemberDtoRes = unknown;
