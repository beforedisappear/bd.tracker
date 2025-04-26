//public
export const getMainRoutePath = () => '/';
export const getLoginRoutePath = () => '/login';

//private
export const getHomeRoutePath = () => '/home';
export const getProfileRoutePath = (tenant: string) => `/${tenant}/profile`;
export const getTeamRoutePath = (tenant?: string) => `/${tenant}/team`;
export const getProjectByIdRoutePath = (tenant?: string, projectId?: string) =>
  `/${tenant}/project/${projectId}`;

//service
export const getInviteRoutePath = () => '/invite';

// export const getEmployeeByIdRoute = (id: string | number) => `/employee/${id}`;
// export const getCreateEmployeeRoute = () => `/employee/create`;
