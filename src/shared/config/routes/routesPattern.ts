import { AppRoutes } from './routes.types';

export const routePatterns: Record<AppRoutes, string> = {
  //public
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/login',
  //private
  [AppRoutes.HOME]: '/home',
  [AppRoutes.PROFILE]: '/:tenant/profile',
  [AppRoutes.TEAM]: '/:tenant/team',
  [AppRoutes.PROJECT_BY_ID]: '/:tenant/project/:projectId/:boardId',
  //service
  [AppRoutes.INVITE]: '/invite',
  [AppRoutes.EMAIL_CHANGE]: '/email-change',
  [AppRoutes.SWAGGER]: '/swagger',
  [AppRoutes.NOT_FOUND]: '*', //skip pattern
};
