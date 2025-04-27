import { Logout } from '@/features/Logout';
import { SelectTeam } from '@/features/SelectTeam';
import { CreateTeam } from '@/features/CreateTeam';

import { HomePageContainer } from '../HomePageContainer/HomePageContainer';
import { Card } from '@/shared/ui/s';

interface Props {}

export function HomePage({}: Props) {
  return (
    <HomePageContainer>
      <Card
        title='Выберите команду'
        className='h-auto p-2 w-full max-w-[400px]'
        headerClassName='text-xl text-center'
        contentClassName='flex flex-col'
      >
        <SelectTeam />

        <CreateTeam />
      </Card>

      <Logout
        btnSize='lg'
        className='text-base w-full max-w-[400px] rounded-lg'
      />
    </HomePageContainer>
  );
}
