import { Plus } from 'lucide-react';

import { Button } from '@/shared/ui/c';

export function AddBoard() {
  return (
    <Button variant='ghost' size='icon' className='flex-shrink-0'>
      <Plus />
    </Button>
  );
}
