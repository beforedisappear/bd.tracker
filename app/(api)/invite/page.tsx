import { redirect } from 'next/navigation';

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

  //TODO:add custom server fetch
  await fetch(`${process.env.NEXT_PUBLIC_URL}/api/team/accept-invitation`, {
    method: 'POST',
    body: JSON.stringify(query),
  }).catch(e => {
    console.error(e);
    redirectPath = getMainRoutePath();
  });

  return redirect(redirectPath);
}
