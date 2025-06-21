import { Drawer } from '@/shared/ui/c';
import { ManageStickersContent } from '../ManageStickersContent';

import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import { getManageStickersModal } from '@/entities/Board';

import { MANAGE_STICKERS_TITLE } from '../../constants';

export function ManageStickersMobile() {
  const { show, setShow } = usePrivateGlobalStore(getManageStickersModal());

  return (
    <Drawer title={MANAGE_STICKERS_TITLE} open={show} onOpenChange={setShow}>
      <ManageStickersContent />
    </Drawer>
  );
}
