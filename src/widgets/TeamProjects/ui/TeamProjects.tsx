import { Card } from '@/shared/ui/s';

interface Props {
  className?: string;
}

export function TeamProjects({}: Props) {
  return (
    <Card
      title='Проекты команды'
      titleClassName='text-xl font-bold'
      className='flex flex-col gap-4'
    ></Card>
  );
}
