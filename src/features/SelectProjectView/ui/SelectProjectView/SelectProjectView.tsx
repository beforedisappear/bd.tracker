import {
  Kanban,
  //  List,
  //  Calendar
} from 'lucide-react';

import { Button } from '@/shared/ui/c';

export function SelectProjectView() {
  // TODO: add logic for selecting view
  // TODO: add tooltips for buttons
  // TODO: add tabs component
  // TODO: add style handling for active view

  return (
    <div className='flex gap-2 items-center bg-muted rounded-md'>
      <Button
        variant={null}
        size='sm'
        className='flex gap-2 items-center text-blue-600'
      >
        <Kanban />
        <span>Доска</span>
      </Button>

      {/* <Button variant={null} size='sm'>
        <List />
        <span>Доска</span>
      </Button>

      <Button variant={null} size='sm'>
        <Calendar />
        <span>Календарь</span>
      </Button> */}
    </div>
  );
}
