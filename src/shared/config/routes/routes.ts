//public
export const getMainRoute = () => '/';
export const getLoginRoute = () => '/login';

//private
export const getHomeRoute = () => '/home';
export const getProfileRoute = (tenant?: string) =>
  tenant ? `/${tenant}/profile` : '/profile';
export const getTeamRoute = (tenant?: string) =>
  tenant ? `/${tenant}/team` : '/team';

//service
export const getInviteRoute = () => '/invite';

// export const getEmployeeByIdRoute = (id: string | number) => `/employee/${id}`;
// export const getCreateEmployeeRoute = () => `/employee/create`;
