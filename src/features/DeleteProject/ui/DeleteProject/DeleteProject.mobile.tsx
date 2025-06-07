import { Drawer } from '@/shared/ui/c';
import { DeleteProjectForm } from '../DeleteProjectForm/DeleteProjectForm';

import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import { getDeleteProjectModal } from '@/entities/Project';

import {
  DELETE_PROJECT_MODAL_TITLE,
  DELETE_PROJECT_MODAL_DESCRIPTION,
} from '../../constants/ui.constants';

export function DeleteProjectMobile() {
  const {
    currentProjectId,
    setShowDeleteProjectModal,
    showDeleteProjectModal,
    setCurrentProjectId,
  } = usePrivateGlobalStore(getDeleteProjectModal());

  const onClose = () => {
    setShowDeleteProjectModal(false);
    setCurrentProjectId(null);
  };

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
      <DeleteProjectForm onClose={onClose} projectId={currentProjectId} />
    </Drawer>
  );
}
