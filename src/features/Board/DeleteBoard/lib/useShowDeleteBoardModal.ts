import { useState } from 'react';
import { useBoardEvent } from '@/entities/Board';

export const useShowDeleteBoardModal = () => {
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);

  const onShowDeleteBoardModal = ({ boardId }: { boardId: string }) => {
    setShowDeleteBoardModal(true);
    setCurrentBoardId(boardId);
  };

  useBoardEvent('showDeleteBoardModal', onShowDeleteBoardModal);

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
