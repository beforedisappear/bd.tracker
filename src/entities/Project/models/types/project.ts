export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export type GetProjectsByTeamDtoRes = Project[];

export interface GetProjectsByTeamDto {
  teamIdOrSlug: string;
}
