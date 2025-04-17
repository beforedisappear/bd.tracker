import { Logout } from '@/features/Logout';

interface Props {}

export function PrivateHomePage({}: Props) {
  return (
    <div>
      <span>PrivateHomePage</span>

      <Logout />
    </div>
  );
}
