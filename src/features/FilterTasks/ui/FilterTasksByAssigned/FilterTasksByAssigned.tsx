import { User } from 'lucide-react';

import { Button } from '@/shared/ui/c';

export function FilterTasksByAssigned() {
  return (
    <Button variant={null} size='sm'>
      <User />
      <span>Ответственный</span>
    </Button>
  );
}
