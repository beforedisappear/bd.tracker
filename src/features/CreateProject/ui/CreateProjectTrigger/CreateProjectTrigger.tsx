import { PlusCircle } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export function CreateProjectTrigger(props: Props) {
  return (
    <Button variant={null} className='gap-2 w-fit' {...props}>
      <PlusCircle className='w-4 h-4' />
      <span>Добавить проект</span>
    </Button>
  );
}
