'use client';

import { Drawer } from '@/shared/ui/c';
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
    <Drawer
      title={CREATE_PROJECT_TITLE}
      titleClassName='text-center'
      trigger={<CreateProjectTrigger />}
      className='h-full'
      open={showCreateProjectModal}
      onOpenChange={setShowCreateProjectModal}
    >
      <CreateProjectForm onClose={onClose} />
    </Drawer>
  );
}
