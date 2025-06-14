import { useShallow } from 'zustand/react/shallow';

import type { PrivateGlobalStore } from '@/shared/store/privateGlobalStore';

export const getManageStickersModal = () =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useShallow((state: PrivateGlobalStore) => ({
    show: state.showManageStickersModal,
    setShow: state.setShowManageStickersModal,
  }));
