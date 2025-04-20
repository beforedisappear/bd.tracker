//public
export const getMainRoute = () => '/';
export const getLoginRoute = () => '/login';

//private
export const getHomeRoute = () => '/home';
export const getProfileRoute = (tenant: string = '[tenants]') =>
  `/${tenant}/profile`;
export const getTeamRoute = (tenant: string = '[tenants]') => `/${tenant}/team`;

//service
export const getInviteRoute = () => '/invite';

// export const getEmployeeByIdRoute = (id: string | number) => `/employee/${id}`;
// export const getCreateEmployeeRoute = () => `/employee/create`;
