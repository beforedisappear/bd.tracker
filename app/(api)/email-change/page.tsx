import { redirect } from 'next/navigation';
import { apiServer } from '@/shared/api/s';
import { cookies } from 'next/headers';

import { getHomeRoutePath, getMainRoutePath } from '@/shared/config/routes';

import { REFRESH_TOKEN_COOKIE_NAME } from '@/shared/constants/cookie.constants';

interface IProps {
  searchParams: Promise<{}>;
}

export default async function EmailChangePage({ searchParams }: IProps) {
  const query = await searchParams;

  const refreshToken = (await cookies()).get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  const redirectPath = refreshToken ? getHomeRoutePath() : getMainRoutePath();

  await apiServer
    .post('/profile/email/accept-change-request', query)
    .catch(e => console.error(e));

  return redirect(redirectPath);
}
