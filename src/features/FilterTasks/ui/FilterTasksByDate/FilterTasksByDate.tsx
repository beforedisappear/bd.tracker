import { Calendar } from 'lucide-react';

import { Button } from '@/shared/ui/c';

export function FilterTasksByDate() {
  return (
    <Button variant={null} size='sm'>
      <Calendar />
      <span>Дата</span>
    </Button>
  );
}
