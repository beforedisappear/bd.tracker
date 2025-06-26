import { Dialog } from '@/shared/ui/c';
import { CreateColumnForm } from '../CreateColumnForm';
import { CreateColumnTrigger } from '../CreateColumnTrigger/CreateColumnTrigger';

import { useState, useCallback } from 'react';

import { CREATE_COLUMN_TITLE } from '../../constants';

export function CreateColumnDesktop() {
  const [showCreateColumnDialog, setShowCreateColumnDialog] = useState(false);

  const onClose = useCallback(() => {
    setShowCreateColumnDialog(false);
  }, []);

  return (
    <Dialog
      title={CREATE_COLUMN_TITLE}
      descClassName='text-left'
      trigger={<CreateColumnTrigger />}
      className='h-48 max-w-96'
      open={showCreateColumnDialog}
      onOpenChange={setShowCreateColumnDialog}
    >
      <CreateColumnForm onClose={onClose} />
    </Dialog>
  );
}
