import { Logout } from '@/features/Logout';
import { SelectTeam } from '@/features/SelectTeam';

import { HomePageContainer } from '../HomePageContainer/HomePageContainer';
import { CreateTeam } from '@/features/CreateTeam';

interface Props {}

export function HomePage({}: Props) {
  return (
    <HomePageContainer>
      <SelectTeam actionSlot={<CreateTeam />} />

      <Logout
        btnSize='lg'
        className='text-base w-full max-w-[400px] rounded-lg'
      />
    </HomePageContainer>
  );
}
