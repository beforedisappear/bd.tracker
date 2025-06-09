import { User } from 'lucide-react';
import { Button, type ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export function FilterTasksByAssignedTrigger(props: Props) {
  return (
    <Button variant={null} size='sm' {...props}>
      <User />
      <span>Ответственный</span>
    </Button>
  );
}
