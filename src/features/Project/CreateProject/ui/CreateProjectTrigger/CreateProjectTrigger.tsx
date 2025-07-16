import { PlusCircle } from 'lucide-react';

import { toast } from 'sonner';

import { Button, type ButtonProps } from '@/shared/ui/c';
import { useTeamAccess } from '@/entities/Team';
import { RESTRICTED_ACTION_MESSAGE } from '@/shared/constants';

interface Props extends ButtonProps {}

export function CreateProjectTrigger(props: Props) {
  const { isEnoughAccess, isLoading } = useTeamAccess();

  const onHandleClick = () => {
    if (!isEnoughAccess) return toast.error(RESTRICTED_ACTION_MESSAGE);
  };

  return (
    <Button
      variant={null}
      className='gap-2 w-fit'
      disabled={isLoading}
      {...props}
      {...(!isEnoughAccess && { onClick: onHandleClick })}
    >
      <PlusCircle className='w-4 h-4' />
      <span>Добавить проект</span>
    </Button>
  );
}
