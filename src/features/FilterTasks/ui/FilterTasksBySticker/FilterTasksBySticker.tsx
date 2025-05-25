import { Tag } from 'lucide-react';

import { Button } from '@/shared/ui/c';

export function FilterTasksBySticker() {
  return (
    <Button variant={null} size='sm'>
      <Tag />
      <span>Метка</span>
    </Button>
  );
}
