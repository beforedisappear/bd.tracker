'use client';

import { TeamToolbar } from '@/widgets/TeamToolbar';
import { TeamProjects } from '@/widgets/TeamProjects';
import { TeamMembers } from '@/widgets/TeamMembers';
import { TeamMemberProfileModal } from '@/widgets/TeamMemberProfileModal';

import { ManageProjectMembers } from '@/features/ManageProjectMembers';
import { DeleteProject } from '@/features/DeleteProject';

import { TeamStoreProvider } from '@/entities/Team';

interface Props {}

export function TeamPage({}: Props) {
  return (
    <TeamStoreProvider>
      <div className='flex flex-col gap-4 w-full max-w-4xl'>
        <TeamToolbar />
        <TeamProjects />
        <TeamMembers />
        <TeamMemberProfileModal />
      </div>

      <ManageProjectMembers />
      <DeleteProject />
    </TeamStoreProvider>
  );
}
