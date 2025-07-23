'use client';

import { Dialog } from '@/shared/ui/c';

import { getTeamMemberProfileModal, useTeamStore } from '@/entities/Team';

import { TeamMemberProfileModalContent } from '../TeamMemberProfileModalContent/TeamMemberProfileModalContent';

export function TeamMemberProfileModal() {
  const { showTeamMemberProfileModal, setShowTeamMemberProfileModal } =
    useTeamStore(getTeamMemberProfileModal());

  return (
    <Dialog
      title='Профиль участника'
      className='h-[280px]'
      open={showTeamMemberProfileModal}
      onOpenChange={setShowTeamMemberProfileModal}
    >
      <TeamMemberProfileModalContent />
    </Dialog>
  );
}
