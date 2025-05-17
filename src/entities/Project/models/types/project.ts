import type { ProjectMember } from './projectMember';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: ProjectMember[];
}

export type GetProjectsByTeamDtoRes = Project[];

export interface GetProjectsByTeamDto {
  teamIdOrSlug: string;
}

export interface CreateProjectDto {
  teamIdOrSlug: string;
  name: string;
  membersIds: string[];
}

export type CreateProjectDtoRes = unknown;

export interface DeleteProjectDtoReq {
  projectId: string;
  teamIdOrSlug: string;
}

export type DeleteProjectDtoRes = unknown;
