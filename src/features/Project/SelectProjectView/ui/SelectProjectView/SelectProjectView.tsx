import {
  Kanban,
  List,
  //  Calendar
} from 'lucide-react';

import { Button } from '@/shared/ui/c';
import { cn } from '@/shared/lib/css';

export function SelectProjectView() {
  // TODO: add logic for selecting view

  return (
    <div className='flex gap-0.5 items-center bg-muted rounded-md'>
      <Button
        variant={null}
        size='sm'
        className={cn('w-20 p-2', {
          'text-blue-600': true,
        })}
      >
        <Kanban />
        <span>Доска</span>
      </Button>

      <Button
        variant={null}
        size='sm'
        disabled
        className={cn('w-24 p-2', {
          'text-blue-600': false,
        })}
      >
        <List />
        <span>Список</span>
      </Button>

      {/* <Button variant={null} size='sm'>
        <Calendar />
        <span>Календарь</span>
      </Button> */}
    </div>
  );
}
