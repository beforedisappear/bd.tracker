import { Drawer } from '@/shared/ui/c';
import { ManageStickersContent } from '../ManageStickersContent';
import { ManageStickerList } from '../ManageStickerList/ManageStickerList';

import { useManageStickersModal } from '../../lib/useManageStickersModal';

import { MANAGE_STICKERS_TITLE } from '../../constants';

export function ManageStickersMobile() {
  const {
    showManageStickersModal,
    setShowManageStickersModal,
    currentBoardId,
  } = useManageStickersModal();

  return (
    <Drawer
      title={MANAGE_STICKERS_TITLE}
      open={showManageStickersModal}
      onOpenChange={setShowManageStickersModal}
    >
      <ManageStickersContent boardId={currentBoardId}>
        <ManageStickerList boardId={currentBoardId} />
      </ManageStickersContent>
    </Drawer>
  );
}
