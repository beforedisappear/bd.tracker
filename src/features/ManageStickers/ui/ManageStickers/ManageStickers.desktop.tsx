import { Dialog } from '@/shared/ui/c';
import { ManageStickersContent } from '../ManageStickersContent';
import { ManageStickerList } from '../ManageStickerList/ManageStickerList';

import { useManageStickersModal } from '../../lib/useManageStickersModal';

import { MANAGE_STICKERS_TITLE } from '../../constants';

export function ManageStickersDesktop() {
  const {
    showManageStickersModal,
    setShowManageStickersModal,
    currentBoardId,
  } = useManageStickersModal();

  return (
    <Dialog
      title={MANAGE_STICKERS_TITLE}
      className='h-[400px]'
      open={showManageStickersModal}
      onOpenChange={setShowManageStickersModal}
    >
      <ManageStickersContent boardId={currentBoardId}>
        <ManageStickerList boardId={currentBoardId} />
      </ManageStickersContent>
    </Dialog>
  );
}
