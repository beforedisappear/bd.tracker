import { Drawer } from '@/shared/ui/c';
import { CreateColumnForm } from '../CreateColumnForm';
import { CreateColumnTrigger } from '../CreateColumnTrigger/CreateColumnTrigger';

import { useCallback, useState } from 'react';

import { CREATE_COLUMN_TITLE } from '../../constants';

export function CreateColumnMobile() {
  const [showCreateColumnDialog, setShowCreateColumnDialog] = useState(false);

  const onClose = useCallback(() => {
    setShowCreateColumnDialog(false);
  }, []);

  return (
    <Drawer
      title={CREATE_COLUMN_TITLE}
      titleClassName='text-center'
      open={showCreateColumnDialog}
      trigger={<CreateColumnTrigger />}
      onOpenChange={setShowCreateColumnDialog}
      className='h-[250px]'
    >
      <CreateColumnForm onClose={onClose} />
    </Drawer>
  );
}
