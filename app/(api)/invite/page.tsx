import { redirect } from 'next/navigation';
import { apiServer } from '@/shared/api/s';

import {
  getLoginRoutePath,
  getMainRoutePath,
} from '@/shared/config/routes/routesPath';

interface IProps {
  searchParams: Promise<{}>;
}

export default async function InvitePage({ searchParams }: IProps) {
  const query = await searchParams;

  let redirectPath = getLoginRoutePath();

  await apiServer.post('/team/accept-invitation', query).catch(e => {
    console.error(e);
    redirectPath = getMainRoutePath();
  });

  return redirect(redirectPath);
}
