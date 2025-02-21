import { Logout } from '@/features/Logout';

interface Props {}

export function ProfilePage({}: Props) {
  return (
    <div>
      <span>ProfilePage</span>

      <Logout />
    </div>
  );
}
