'use client';

import { Dialog } from '@/shared/ui/c';
import { ManageProjectMembersContent } from '../ManageProjectMembersContent';

import { getProjectMembersModal } from '@/entities/Project';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import { MANAGE_PROJECT_MEMBERS_TITLE } from '../../config';

export function ManageProjectMembers() {
  const { showProjectMembersModal, setShowProjectMembersModal } =
    usePrivateGlobalStore(getProjectMembersModal());

  return (
    <Dialog
      title={MANAGE_PROJECT_MEMBERS_TITLE}
      className='h-[400px]'
      open={showProjectMembersModal}
      onOpenChange={setShowProjectMembersModal}
    >
      <ManageProjectMembersContent />
    </Dialog>
  );
}
