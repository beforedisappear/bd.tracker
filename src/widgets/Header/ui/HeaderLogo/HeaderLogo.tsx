import Link from 'next/link';

interface Props {}

export function HeaderLogo({}: Props) {
  return <Link href={'/'}>BD.tracker</Link>;
}
