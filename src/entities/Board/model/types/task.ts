export interface Task {}

export interface CreateTaskDtoReq {
  name: string;
  columnId: string;
}

export type CreateTaskDtoRes = never;
