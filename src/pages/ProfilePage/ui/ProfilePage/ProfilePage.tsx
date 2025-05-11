import { Profile } from '@/widgets/Profile';
import { MyTeams } from '@/widgets/MyTeams';
import { TeamStoreProvider } from '@/entities/Team';

interface Props {}

export function ProfilePage({}: Props) {
  return (
    <TeamStoreProvider>
      <div
        className='flex flex-col gap-4 w-1/2 
        xl:w-2/3
        lg:w-full'
      >
        <Profile />
        <MyTeams />
      </div>
    </TeamStoreProvider>
  );
}
