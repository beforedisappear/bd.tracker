import { Dialog } from '@/shared/ui/c';
import { ManageStickersContent } from '../ManageStickersContent';

import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import { getManageStickersModal } from '@/entities/Board';

import { MANAGE_STICKERS_TITLE } from '../../constants';

export function ManageStickersDesktop() {
  const { show, setShow } = usePrivateGlobalStore(getManageStickersModal());

  return (
    <Dialog
      title={MANAGE_STICKERS_TITLE}
      className='h-[400px]'
      open={show}
      onOpenChange={setShow}
    >
      <ManageStickersContent />
    </Dialog>
  );
}
