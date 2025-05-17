import { UserRoundPlus } from 'lucide-react';

import { Button, type ButtonProps } from '@/shared/ui/c';

export function InviteToTeamTrigger(props: ButtonProps) {
  return (
    <Button type='button' variant='outline' className='w-fit' {...props}>
      <UserRoundPlus />
      <span>Пригласить участника по почте</span>
    </Button>
  );
}
