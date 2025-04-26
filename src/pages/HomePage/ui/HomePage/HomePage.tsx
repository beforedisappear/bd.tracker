import { Logout } from '@/features/Logout';
import { SelectTeam } from '@/features/SelectTeam';

import { HomePageContainer } from '../HomePageContainer/HomePageContainer';

interface Props {}

export function HomePage({}: Props) {
  return (
    <HomePageContainer>
      <SelectTeam />

      <Logout
        btnSize='lg'
        className='text-base w-full max-w-[400px] rounded-lg'
      />
    </HomePageContainer>
  );
}
