import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides',
  description: '',
};

export const dynamic = 'force-static';

export default function Page() {
  return <div>guide list page</div>;
}
