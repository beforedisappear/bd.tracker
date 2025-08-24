import { Dialog } from '@/shared/ui/c';
import { DeleteProjectForm } from '../DeleteProjectForm/DeleteProjectForm';

import {
  DELETE_PROJECT_MODAL_TITLE,
  DELETE_PROJECT_MODAL_DESCRIPTION,
} from '../../constants/ui.constants';

import { useShowDeleteProjectModal } from '../../model/useShowDeleteProjectModal';

export function DeleteProjectDesktop() {
  const {
    showDeleteProjectModal,
    currentProjectId,
    setShowDeleteProjectModal,
    onCloseModal,
  } = useShowDeleteProjectModal();

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
