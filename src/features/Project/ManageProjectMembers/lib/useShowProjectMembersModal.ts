import { useEffect, useState } from 'react';

import { projectEventBus } from '@/entities/Project';

export const useShowProjectMembersModal = () => {
  const [showProjectMembersModal, setShowProjectMembersModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  useEffect(() => {
    const onShowProjectMembersModal = ({
      projectId,
    }: {
      projectId: string;
    }) => {
      setShowProjectMembersModal(true);
      setCurrentProjectId(projectId);
    };

    projectEventBus.on('showProjectMembersModal', onShowProjectMembersModal);

    return () => {
      projectEventBus.off('showProjectMembersModal', onShowProjectMembersModal);
    };
  }, []);

  return {
    showProjectMembersModal,
    currentProjectId,
    setShowProjectMembersModal,
    setCurrentProjectId,
    onCloseModal: () => {
      setShowProjectMembersModal(false);
      setCurrentProjectId(null);
    },
  };
};
