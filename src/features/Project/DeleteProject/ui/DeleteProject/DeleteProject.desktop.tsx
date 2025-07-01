import { Dialog } from '@/shared/ui/c';
import { DeleteProjectForm } from '../DeleteProjectForm/DeleteProjectForm';

import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import { getDeleteProjectModal } from '@/entities/Project';

import {
  DELETE_PROJECT_MODAL_TITLE,
  DELETE_PROJECT_MODAL_DESCRIPTION,
} from '../../constants/ui.constants';

export function DeleteProjectDesktop() {
  const {
    currentProjectId,
    setShowDeleteProjectModal,
    showDeleteProjectModal,
    setCurrentProjectId,
  } = usePrivateGlobalStore(getDeleteProjectModal());

  const onCloseModal = () => {
    setShowDeleteProjectModal(false);
    setCurrentProjectId(null);
  };

  return (
    <Dialog
      title={DELETE_PROJECT_MODAL_TITLE}
      description={DELETE_PROJECT_MODAL_DESCRIPTION}
      descClassName='text-left'
      open={showDeleteProjectModal}
      onOpenChange={setShowDeleteProjectModal}
      className='h-48 max-w-96'
    >
      <DeleteProjectForm onClose={onCloseModal} projectId={currentProjectId} />
    </Dialog>
  );
}
