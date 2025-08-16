import { useEffect, useState } from 'react';

import { boardEventBus } from '@/entities/Board';

export const useManageStickersModal = () => {
  const [showManageStickersModal, setShowManageStickersModal] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);

  useEffect(() => {
    const onShowManageStickersModal = ({ boardId }: { boardId: string }) => {
      setShowManageStickersModal(true);
      setCurrentBoardId(boardId);
    };

    boardEventBus.on('showManageStickersModal', onShowManageStickersModal);

    return () => {
      boardEventBus.off('showManageStickersModal', onShowManageStickersModal);
    };
  }, []);

  return {
    showManageStickersModal,
    setShowManageStickersModal,
    currentBoardId,
  };
};
