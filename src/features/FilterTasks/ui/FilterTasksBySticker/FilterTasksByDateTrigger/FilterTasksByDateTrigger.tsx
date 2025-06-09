import { Calendar } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export function FilterTasksByDateTrigger(props: Props) {
  return (
    <Button variant={null} size='sm' {...props}>
      <Calendar />
      <span>Дата</span>
    </Button>
  );
}
