import { useEffect, useState } from 'react';

import { projectEventBus } from '@/entities/Project';

export const useShowDeleteProjectModal = () => {
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  useEffect(() => {
    const onShowDeleteProjectModal = ({ projectId }: { projectId: string }) => {
      setShowDeleteProjectModal(true);
      setCurrentProjectId(projectId);
    };

    projectEventBus.on('showDeleteProjectModal', onShowDeleteProjectModal);

    return () => {
      projectEventBus.off('showDeleteProjectModal', onShowDeleteProjectModal);
    };
  }, []);

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
