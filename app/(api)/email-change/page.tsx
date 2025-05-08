import { redirect } from 'next/navigation';

import {
  getHomeRoutePath,
  getMainRoutePath,
} from '@/shared/config/routes/routesPath';
import { cookies } from 'next/headers';
import { REFRESH_TOKEN_COOKIE_NAME } from '@/shared/constants/cookie.constants';

interface IProps {
  searchParams: Promise<{}>;
}

export default async function EmailChangePage({ searchParams }: IProps) {
  const query = await searchParams;

  const refreshToken = (await cookies()).get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  const redirectPath = refreshToken ? getHomeRoutePath() : getMainRoutePath();

  //TODO: add custom server fetch
  await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/profile/email/accept-change-request`,
    {
      method: 'POST',
      body: JSON.stringify(query),
    },
  ).catch(e => {
    console.error(e);
  });

  return redirect(redirectPath);
}
