import { redirect } from 'next/navigation';

interface IProps {
  searchParams: Promise<{}>;
}

export default async function InvitePage({ searchParams }: IProps) {
  const query = await searchParams;

  let redirectPath = '/login';

  //add custom server fetch
  await fetch(`${process.env.NEXT_PUBLIC_URL}/api/team/accept-invitation`, {
    method: 'POST',
    body: JSON.stringify(query),
  }).catch(e => {
    console.error(e);
    redirectPath = '/';
  });

  return redirect(redirectPath);
}
