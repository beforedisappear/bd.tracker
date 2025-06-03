'use client';

import { Dialog } from '@/shared/ui/c';
import { CreateProjectTrigger } from '../CreateProjectTrigger/CreateProjectTrigger';
import { CreateProjectForm } from '../CreateProjectForm/CreateProjectForm';

import { useCallback, useState } from 'react';

import { CREATE_PROJECT_TITLE } from '../../constants';

export function CreateProject() {
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  const onClose = useCallback(() => {
    setShowCreateProjectModal(false);
  }, []);

  return (
    <Dialog
      title={CREATE_PROJECT_TITLE}
      trigger={<CreateProjectTrigger />}
      className='h-[500px] w-full max-w-[600px]'
      open={showCreateProjectModal}
      onOpenChange={setShowCreateProjectModal}
    >
      <CreateProjectForm onClose={onClose} />
    </Dialog>
  );
}
