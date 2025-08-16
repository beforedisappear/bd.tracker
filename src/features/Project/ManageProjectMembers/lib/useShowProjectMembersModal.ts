import { useState } from 'react';
import { useProjectEvent } from '@/entities/Project';

export const useShowProjectMembersModal = () => {
  const [showProjectMembersModal, setShowProjectMembersModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const onShowProjectMembersModal = ({ projectId }: { projectId: string }) => {
    setShowProjectMembersModal(true);
    setCurrentProjectId(projectId);
  };

  useProjectEvent('showProjectMembersModal', onShowProjectMembersModal);

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
