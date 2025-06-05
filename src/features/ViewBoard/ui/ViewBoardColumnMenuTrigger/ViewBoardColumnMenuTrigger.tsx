import { Ellipsis } from 'lucide-react';

import { Button, ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export function ViewBoardColumnMenuTrigger(props: Props) {
  const { ...rest } = props;

  return (
    <Button variant={null} className='p-0 h-6 w-6' {...rest}>
      <Ellipsis className='h-4 w-4' />
    </Button>
  );
}
