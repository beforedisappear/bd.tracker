import { Loader2, Trash } from 'lucide-react';

import { Button, Dialog } from '@/shared/ui/c';
import { DeleteTeamMemberTrigger } from '../DeleteTeamMemberTrigger/DeleteTeamMemberTrigger';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import {
  getCurrentTeamMemberId,
  teamQueries,
  useTeamStore,
} from '@/entities/Team';

import { toast } from 'sonner';
import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

interface Props {
  onComplete: () => void;
}

export function DeleteTeamMember(props: Props) {
  const { onComplete } = props;

  const { tenant } = useParams<{ tenant: string }>()!;
  const { currentTeamMemberId } = useTeamStore(getCurrentTeamMemberId());
  const [open, setOpen] = useState(false);

  const { mutateAsync: deleteMember, isPending } = useMutation(
    teamQueries.deleteTeamMember(),
  );

  const onConfirm = () => {
    const dto = {
      teamIdOrSlug: tenant,
      memberId: currentTeamMemberId as string,
    };

    deleteMember(dto)
      .then(() => onComplete())
      .then(() => setOpen(false))
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .catch(e => toast.error(e.message));
  };

  return (
    <Dialog
      title='Удалить участника?'
      titleClassName='text-left text-lg'
      description='Вы уверены, что хотите удалить этого пользователя из команды? Это действие необратимо.'
      descClassName='text-left text-sm'
      trigger={<DeleteTeamMemberTrigger />}
      className='w-[320px]'
      open={open}
      onOpenChange={setOpen}
    >
      <div className='flex gap-2'>
        <Button
          variant='outline'
          className='w-full'
          onClick={() => setOpen(false)}
        >
          Отмена
        </Button>

        <Button variant='destructive' className='w-full' onClick={onConfirm}>
          {isPending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <>
              <Trash className='h-4 w-4 mr-1' />
              Удалить
            </>
          )}
        </Button>
      </div>
    </Dialog>
  );
}
