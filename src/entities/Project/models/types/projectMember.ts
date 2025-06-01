export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProjectMembersDtoReq {
  projectId: string;
  keyword?: string;
}

export type GetProjectMembersDtoRes = ProjectMember[];

export interface AddProjectMemberDtoReq {
  projectId: string;
  memberId: string;
}

export type AddProjectMemberDtoRes = never;

export interface RemoveProjectMemberDtoReq {
  projectId: string;
  memberId: string;
}

export type RemoveProjectMemberDtoRes = never;

export interface UpdateProjectMembersDtoReq {
  teamIdOrSlug: string;
  projectId: string;
  membersIds: string[];
}

export type UpdateProjectMembersDtoRes = never;
