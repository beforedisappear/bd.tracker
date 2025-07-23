import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  description: '',
};

export const dynamic = 'force-static';

export default function Page() {
  return <div>admin page</div>;
}
