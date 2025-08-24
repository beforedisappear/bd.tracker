'use client';

import { Dialog } from '@/shared/ui/c';
import { ManageProjectMembersContent } from '../ManageProjectMembersContent';

import { MANAGE_PROJECT_MEMBERS_TITLE } from '../../constants';
import { useShowProjectMembersModal } from '../../model';
import { ManageProjectMembersForm } from '../ManageProjectMembersForm/ManageProjectMembersForm';

export function ManageProjectMembersDesktop() {
  const {
    showProjectMembersModal,
    currentProjectId,
    setShowProjectMembersModal,
    onCloseModal,
  } = useShowProjectMembersModal();

  return (
    <Dialog
      title={MANAGE_PROJECT_MEMBERS_TITLE}
      className='h-[400px]'
      open={showProjectMembersModal}
      onOpenChange={setShowProjectMembersModal}
    >
      <ManageProjectMembersContent projectId={currentProjectId}>
        <ManageProjectMembersForm onCloseModal={onCloseModal} />
      </ManageProjectMembersContent>
    </Dialog>
  );
}
