export type InviteToTeamDtoRes = {
  result: 'notification' | 'proposal';
};

export interface InviteToTeamDtoReq {
  teamIdOrSlug: string;
  inviteeEmail: string;
  projectIds: string[];
}
