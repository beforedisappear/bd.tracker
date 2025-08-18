import { useState } from 'react';
import { useBoardEvent } from '@/entities/Board';

export const useManageStickersModal = () => {
  const [showManageStickersModal, setShowManageStickersModal] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);

  const onShowManageStickersModal = ({ boardId }: { boardId: string }) => {
    setShowManageStickersModal(true);
    setCurrentBoardId(boardId);
  };

  useBoardEvent('showManageStickersModal', onShowManageStickersModal);

  return {
    showManageStickersModal,
    setShowManageStickersModal,
    currentBoardId,
  };
};
