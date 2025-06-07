import { Palette } from 'lucide-react';

import { Button } from '@/shared/ui/c';

export function FilterTasksByColor() {
  return (
    <Button variant={null} size='sm'>
      <Palette />
      <span>Цвет</span>
    </Button>
  );
}
