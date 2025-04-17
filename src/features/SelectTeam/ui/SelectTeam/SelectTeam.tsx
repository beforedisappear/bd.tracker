'use client';

import { teamQueries } from '@/entities/Team';
import { useQuery } from '@tanstack/react-query';

import { Card } from '@/shared/ui/s';
import { ScrollArea } from '@/shared/ui/c';
import { SelectTeamItem } from '../SelectTeamItem/SelectTeamItem';
import { SelectTeamItemLoading } from '../SelectTeamItem/SelectTeamItem.loading';

interface Props {}

export function SelectTeam({}: Props) {
  const {
    data: userTeamList,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(teamQueries.getUserTeamList());

  console.log(userTeamList);

  // if (isLoading) return <SelectTeamLoading />;
  // else if (isError || !userTeamList) return <span>Ошибка!</span>;

  return (
    <Card
      title='Выберите команду'
      className='h-auto p-2 w-full max-w-[400px]'
      headerClassName='text-xl text-center'
    >
      <ScrollArea type='always' className='h-48 -mr-4'>
        <div className='flex flex-col gap-y-3 pr-4'>
          {isSuccess &&
            userTeamList.map(el => <SelectTeamItem key={el.id} data={el} />)}

          {isLoading &&
            new Array(3)
              .fill('_')
              .map((_, i) => <SelectTeamItemLoading key={i} />)}
        </div>
      </ScrollArea>
    </Card>
  );
}
