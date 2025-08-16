import { useEffect, useState } from 'react';

import { boardEventBus } from '@/entities/Board';

export const useShowDeleteBoardModal = () => {
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);

  useEffect(() => {
    const onShowDeleteBoardModal = ({ boardId }: { boardId: string }) => {
      setShowDeleteBoardModal(true);
      setCurrentBoardId(boardId);
    };

    boardEventBus.on('showDeleteBoardModal', onShowDeleteBoardModal);

    return () => {
      boardEventBus.off('showDeleteBoardModal', onShowDeleteBoardModal);
    };
  }, []);

  return {
    showDeleteBoardModal,
    currentBoardId,
    setShowDeleteBoardModal,
    setCurrentBoardId,
    onCloseModal: () => {
      setShowDeleteBoardModal(false);
      setCurrentBoardId(null);
    },
  };
};
