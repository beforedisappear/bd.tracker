import { Profile } from '@/widgets/Profile';
import { MyTeams } from '@/widgets/MyTeams';

interface Props {}

export function ProfilePage({}: Props) {
  return (
    <div
      className='flex flex-col gap-4 w-1/2 
      lg:w-full'
    >
      <Profile />
      <MyTeams />
    </div>
  );
}
