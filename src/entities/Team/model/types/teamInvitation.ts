export type InviteToTeamDtoRes = {
  result: 'notification' | 'proposal';
};

export interface InviteToTeamDtoReq {
  teamIdOrSlug: string;
  inviteeEmail: string;
  projectIds: string[];
}

export interface CheckTeamInvitationDtoReq {
  idOrSlug: string;
  inviteeEmail: string;
}

export interface CheckTeamInvitationDtoRes {
  exists: boolean;
}
