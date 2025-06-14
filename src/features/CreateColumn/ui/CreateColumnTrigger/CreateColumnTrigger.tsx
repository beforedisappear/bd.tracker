import { PlusCircle } from 'lucide-react';

import { Button, ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export function CreateColumnTrigger(props: Props) {
  return (
    <Button variant='secondary' {...props}>
      <PlusCircle className='w-4 h-4' />
      <span>Создать колонку</span>
    </Button>
  );
}
