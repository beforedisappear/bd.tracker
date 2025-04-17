import { Logout } from '@/features/Logout';
import { SelectTeam } from '@/features/SelectTeam';

import { PrivateHomePageContainer } from '../PrivateHomePageContainer/PrivateHomePageContainer';

interface Props {}

export function PrivateHomePage({}: Props) {
  return (
    <PrivateHomePageContainer>
      <SelectTeam />

      <Logout
        btnSize='lg'
        className='text-base w-full max-w-[400px] rounded-lg'
      />
    </PrivateHomePageContainer>
  );
}
