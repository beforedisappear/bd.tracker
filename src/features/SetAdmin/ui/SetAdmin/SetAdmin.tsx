import { Loader2 } from 'lucide-react';

import { Button, Dialog } from '@/shared/ui/c';
import { SetAdminTrigger } from '../SetAdminTrigger/SetAdminTrigger';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';

import { getErrorMessage } from '@/shared/lib/error';
import {
  getCurrentTeamMemberId,
  teamQueries,
  useTeamStore,
} from '@/entities/Team';
import { toast } from 'sonner';

import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

interface Props {
  isAdmin: boolean;
}

export function SetAdmin({ isAdmin }: Props) {
  const tenant = useTenant();
  const { currentTeamMemberId } = useTeamStore(getCurrentTeamMemberId());
  const [showSetAdminModal, setShowSetAdminModal] = useState(false);

  const { mutateAsync: addAdmin, isPending: isAddingAdmin } = useMutation(
    teamQueries.addAdmin(),
  );

  const { mutateAsync: deleteAdmin, isPending: isDeletingAdmin } = useMutation(
    teamQueries.deleteAdmin(),
  );

  const isPending = isAddingAdmin || isDeletingAdmin;

  const onConfirm = () => {
    const dto = {
      teamIdOrSlug: tenant,
      memberId: currentTeamMemberId as string,
    };

    let promise: Promise<unknown>;

    if (isAdmin) promise = deleteAdmin(dto);
    else promise = addAdmin(dto);

    promise
      .then(() => onClose())
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .catch(e => toast.error(getErrorMessage(e)));
  };

  const onClose = () => {
    setShowSetAdminModal(false);
  };

  return (
    <Dialog
      title='Подтверждение'
      titleClassName='text-left text-lg'
      description='Вы уверены, что хотите сделать этого пользователя администратором?'
      descClassName='text-left text-sm'
      trigger={<SetAdminTrigger isAdmin={isAdmin} />}
      className='w-[300px]'
      open={showSetAdminModal}
      onOpenChange={setShowSetAdminModal}
    >
      <div className='flex gap-2'>
        <Button variant='outline' className='w-full' onClick={onClose}>
          Отменить
        </Button>

        <Button variant='default' className='w-full' onClick={onConfirm}>
          {isPending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <span>Подтвердить</span>
          )}
        </Button>
      </div>
    </Dialog>
  );
}
