import { Card } from '@/shared/ui/s';

interface Props {}

export function TeamMembers({}: Props) {
  return (
    <Card
      title='Участники команды'
      titleClassName='text-xl font-bold'
      className='flex flex-col gap-4'
    ></Card>
  );
}
