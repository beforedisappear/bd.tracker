export enum AppRoutes {
  //public
  MAIN = 'main',
  LOGIN = 'login',
  //private
  HOME = 'home',
  PROFILE = 'profile',
  TEAM = 'team',
  PROJECT = 'project',
  //service
  INVITE = 'invite',
  EMAIL_CHANGE = 'email_change',
  SWAGGER = 'swagger',

  // EMPLOYEE_BY_ID = 'employee_by_id',
  // CREATE_EMPLOYEE = 'create_employee',

  // last
  NOT_FOUND = 'not_found',
}

export type RoutesMetadata = {
  title: string;
  description: string;
};

export type RouteAccess = 'public' | 'private' | 'service';
