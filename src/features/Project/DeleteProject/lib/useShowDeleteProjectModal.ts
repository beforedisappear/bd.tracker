import { useState } from 'react';
import { useProjectEvent } from '@/entities/Project';

export const useShowDeleteProjectModal = () => {
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const onShowDeleteProjectModal = ({ projectId }: { projectId: string }) => {
    setShowDeleteProjectModal(true);
    setCurrentProjectId(projectId);
  };

  useProjectEvent('showDeleteProjectModal', onShowDeleteProjectModal);

  return {
    showDeleteProjectModal,
    currentProjectId,
    setShowDeleteProjectModal,
    setCurrentProjectId,
    onCloseModal: () => {
      setShowDeleteProjectModal(false);
      setCurrentProjectId(null);
    },
  };
};
