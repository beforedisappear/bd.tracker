import type { ProjectMember } from './projectMember';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: ProjectMember[];
}

export interface ProjectWithFirstBoardId extends Project {
  firstBoardId: string;
}

export type GetProjectsByTeamDtoRes = ProjectWithFirstBoardId[];

export interface GetProjectsByTeamDtoReq {
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

export interface RenameProjectDtoReq {
  teamIdOrSlug: string;
  projectId: string;
  name: string;
}

export type RenameProjectDtoRes = { id: string };

// export interface GetProjectByIdDtoReq {
//   projectId: string;
// }

// export interface GetProjectByIdDtoRes {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   members: ProjectMember[];
//   boards: SummaryBoard[];
// }
