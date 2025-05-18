import { UserRoundPlus } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { teamQueries } from '@/entities/Team';
import { toast } from 'sonner';

import { Button, type ButtonProps } from '@/shared/ui/c';

import { RESTRICTED_MESSAGE } from '@/shared/constants';

interface Props extends ButtonProps {
  text: string;
}

export function InviteToTeamTrigger(props: Props) {
  const { text, variant = 'outline', ...restProps } = props;

  const { tenant } = useParams<{ tenant: string }>()!;

  const { data, isLoading } = useQuery(
    teamQueries.getHaveAccessToTeam({ idOrSlug: tenant }),
  );

  const isDisabled = !(data?.isOwner || data?.isAdmin);

  const onHandleClick = () => {
    toast.error(RESTRICTED_MESSAGE);
  };

  return (
    <Button
      {...restProps}
      type='button'
      variant={variant}
      className='w-fit'
      disabled={isLoading}
      {...(isDisabled && { onClick: onHandleClick })}
    >
      <UserRoundPlus />
      <span>{text}</span>
    </Button>
  );
}
