'use client';

import { Dialog } from '@/shared/ui/c';
import { CreateBoardForm } from '../CreateBoardForm';
import { CreateBoardTrigger } from '../CreateBoardTrigger/CreateBoardTrigger';

import { useCallback, useState } from 'react';

interface Props {}

export function CreateBoardDesktop({}: Props) {
  const [showCreateBoardDialog, setShowCreateBoardDialog] = useState(false);

  const onClose = useCallback(() => {
    setShowCreateBoardDialog(false);
  }, []);

  return (
    <Dialog
      title='Создать доску'
      titleClassName='text-center'
      trigger={<CreateBoardTrigger />}
      className='h-80 max-w-96'
      open={showCreateBoardDialog}
      onOpenChange={setShowCreateBoardDialog}
    >
      <CreateBoardForm onClose={onClose} />
    </Dialog>
  );
}
