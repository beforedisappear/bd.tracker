import { Drawer } from '@/shared/ui/c';
import { DeleteProjectForm } from '../DeleteProjectForm/DeleteProjectForm';

import {
  DELETE_PROJECT_MODAL_TITLE,
  DELETE_PROJECT_MODAL_DESCRIPTION,
} from '../../constants/ui.constants';

import { useShowDeleteProjectModal } from '../../model/useShowDeleteProjectModal';

export function DeleteProjectMobile() {
  const {
    showDeleteProjectModal,
    currentProjectId,
    setShowDeleteProjectModal,
    onCloseModal,
  } = useShowDeleteProjectModal();

  return (
    <Drawer
      title={DELETE_PROJECT_MODAL_TITLE}
      titleClassName='text-center'
      description={DELETE_PROJECT_MODAL_DESCRIPTION}
      descClassName='text-center'
      className='h-[300px]'
      open={showDeleteProjectModal}
      onOpenChange={setShowDeleteProjectModal}
    >
      <DeleteProjectForm onClose={onCloseModal} projectId={currentProjectId} />
    </Drawer>
  );
}
