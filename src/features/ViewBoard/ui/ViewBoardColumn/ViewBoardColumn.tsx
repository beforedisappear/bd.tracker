import { Ellipsis, PlusCircle } from 'lucide-react';

import { Button } from '@/shared/ui/c';

interface Props {
  title: string;
  count: number;
  children: React.ReactNode;
}

// TODO: add SCROLL AREA
export function ViewBoardColumn(props: Props) {
  const { title, count, children } = props;

  return (
    <div className={`flex-shrink-0 w-80`}>
      <div className={`flex flex-col h-auto gap-2 p-4 bg-muted rounded-lg`}>
        <div className='flex justify-between items-center mb-4'>
          <p className='font-medium text-lg'>{title}</p>
          <div className='flex items-center gap-2'>
            <Button variant={null} className='p-0 h-6 w-6'>
              <Ellipsis className='h-4 w-4' />
            </Button>
            <span className='bg-primary/10 text-primary px-2 py-1 rounded-full text-sm'>
              {count || 0}
            </span>
          </div>
        </div>

        {children}

        <Button
          variant={null}
          className='mt-3 w-full justify-start text-muted-foreground'
        >
          <PlusCircle className='mr-2 h-4 w-4' />
          <span>Добавить задачу</span>
        </Button>
      </div>
    </div>
  );
}
