import { Card } from '@/shared/ui/s';
import { LightbulbIcon } from 'lucide-react';

interface Props {}

export function ProjectHeroService({}: Props) {
  const headerContent = (
    <div className='grid place-content-center mt-1 bg-primary/20 p-1 rounded-2xl w-14 h-14'>
      <LightbulbIcon className='w-10 h-10' />
    </div>
  );

  const titleContent = (
    <h3 className='text-2xl font-semibold'>{'Light & dark mode'}</h3>
  );

  return (
    <Card
      className='absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10
      md:static md:w-full'
      title={titleContent}
      titleClassName='col-start-2 row-start-1'
      headerClassName='grid grid-cols-[auto_1fr] gap-x-4 space-y-0'
      headerContent={headerContent}
      descClassName='text-md col-start-2 row-start-2 self-end !-mt-4'
      description='Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur natusm.'
    />
  );
}
