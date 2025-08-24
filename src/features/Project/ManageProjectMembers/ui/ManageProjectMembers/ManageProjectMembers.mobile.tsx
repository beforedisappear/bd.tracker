'use client';

import { Drawer } from '@/shared/ui/c';
import { ManageProjectMembersContent } from '../ManageProjectMembersContent';

import { MANAGE_PROJECT_MEMBERS_TITLE } from '../../constants';
import { useShowProjectMembersModal } from '../../model';
import { ManageProjectMembersForm } from '../ManageProjectMembersForm/ManageProjectMembersForm';

export function ManageProjectMembersMobile() {
  const {
    showProjectMembersModal,
    currentProjectId,
    setShowProjectMembersModal,
    onCloseModal,
  } = useShowProjectMembersModal();

  return (
    <Drawer
      title={MANAGE_PROJECT_MEMBERS_TITLE}
      titleClassName='text-center'
      className='h-full'
      open={showProjectMembersModal}
      onOpenChange={setShowProjectMembersModal}
    >
      <ManageProjectMembersContent projectId={currentProjectId}>
        <ManageProjectMembersForm onCloseModal={onCloseModal} />
      </ManageProjectMembersContent>
    </Drawer>
  );
}
