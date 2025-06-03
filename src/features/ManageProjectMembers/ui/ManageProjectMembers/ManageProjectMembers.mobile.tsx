'use client';

import { Drawer } from '@/shared/ui/c';
import { ManageProjectMembersContent } from '../ManageProjectMembersContent';

import { getProjectMembersModal } from '@/entities/Project';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import { MANAGE_PROJECT_MEMBERS_TITLE } from '../../constants';

export function ManageProjectMembersMobile() {
  const { showProjectMembersModal, setShowProjectMembersModal } =
    usePrivateGlobalStore(getProjectMembersModal());

  return (
    <Drawer
      title={MANAGE_PROJECT_MEMBERS_TITLE}
      titleClassName='text-center'
      className='h-full'
      open={showProjectMembersModal}
      onOpenChange={setShowProjectMembersModal}
    >
      <ManageProjectMembersContent />
    </Drawer>
  );
}
