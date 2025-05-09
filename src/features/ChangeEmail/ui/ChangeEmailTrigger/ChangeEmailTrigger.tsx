import { Mail } from 'lucide-react';

import { Button, ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export const ChangeEmailTrigger = (props: Props) => {
  return (
    <Button type='button' variant={null} className='w-fit' {...props}>
      <Mail className='h-4 w-4' />
      <span>Смена e-mail</span>
    </Button>
  );
};
