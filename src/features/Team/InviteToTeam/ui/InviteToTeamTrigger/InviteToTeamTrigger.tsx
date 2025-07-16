import { UserRoundPlus } from 'lucide-react';

import { useTeamAccess } from '@/entities/Team';

import { toast } from 'sonner';

import { Button, type ButtonProps } from '@/shared/ui/c';

import { RESTRICTED_ACTION_MESSAGE } from '@/shared/constants';

interface Props extends ButtonProps {
  text: string;
}

export function InviteToTeamTrigger(props: Props) {
  const { text, variant = 'outline', ...restProps } = props;

  const { isEnoughAccess, isLoading } = useTeamAccess();

  const onHandleClick = () => {
    toast.error(RESTRICTED_ACTION_MESSAGE);
  };

  return (
    <Button
      {...restProps}
      type='button'
      variant={variant}
      className='w-fit'
      disabled={isLoading}
      {...(!isEnoughAccess && { onClick: onHandleClick })}
    >
      <UserRoundPlus />
      <span>{text}</span>
    </Button>
  );
}
