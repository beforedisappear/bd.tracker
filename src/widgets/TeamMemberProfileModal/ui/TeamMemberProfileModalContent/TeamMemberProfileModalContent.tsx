import { Mail, Crown, Signature, UserCog, Clock } from 'lucide-react';

import { ErrorBoundary } from '@/shared/ui/c';
import { Avatar } from '@/shared/ui/s';
import { SetAdmin } from '@/features/SetAdmin';
import { DeleteTeamMember } from '@/features/Team/DeleteTeamMember';
import { TeamMemberProfileModalContentLoading } from './TeamMemberProfileModalContent.loading';

import { useQuery } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';
import {
  useTeamStore,
  useTeamAccess,
  getCurrentTeamMemberId,
  getTeamMemberProfileModal,
  teamQueries,
} from '@/entities/Team';

export function TeamMemberProfileModalContent() {
  const tenant = useTenant();
  const { currentTeamMemberId } = useTeamStore(getCurrentTeamMemberId());
  const { setShowTeamMemberProfileModal } = useTeamStore(
    getTeamMemberProfileModal(),
  );

  const { isEnoughAccess } = useTeamAccess();

  const {
    data: teamMember,
    isSuccess,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    ...teamQueries.getTeamMemberById({
      teamIdOrSlug: tenant,
      memberId: currentTeamMemberId!,
    }),
    enabled: !!currentTeamMemberId,
  });

  const onComplete = () => {
    setShowTeamMemberProfileModal(false);
  };

  if (isLoading || !teamMember) return <TeamMemberProfileModalContentLoading />;
  else if (isError || !isSuccess)
    return <ErrorBoundary className='m-auto' reset={refetch} />;

  return (
    <div className='flex gap-4 items-start'>
      <Avatar
        src={''}
        alt={teamMember.name}
        className='grid place-items-center w-20 h-20 text-3xl'
        initials={teamMember.name}
      />

      <div className='flex flex-col gap-2 flex-1'>
        <div className='flex items-center text-sm text-gray-400 gap-1'>
          <Signature size={16} className='text-gray-400' />
          <span>Имя:</span>
          <span className='line-clamp-1'>{teamMember.name}</span>
        </div>

        <div className='flex items-center text-sm text-gray-400 gap-1'>
          <Mail size={16} className='text-gray-400' />
          <span>E-mail:</span>
          <span className='line-clamp-1'>{teamMember.email}</span>
        </div>

        {teamMember.isOwner && (
          <div className='flex items-center gap-1'>
            <Crown size={16} className='text-yellow-500' />
            <span className='text-sm text-gray-400'>Владелец команды</span>
          </div>
        )}

        {teamMember.isAdmin && (
          <div className='flex items-center gap-1'>
            <UserCog size={16} className='text-blue-500' />
            <span className='text-sm text-gray-400'>
              Администратор компании
            </span>
          </div>
        )}

        {!teamMember.isOwner && isEnoughAccess && (
          <SetAdmin isAdmin={teamMember.isAdmin} />
        )}

        {!teamMember.isOwner && isEnoughAccess && (
          <DeleteTeamMember onComplete={onComplete} />
        )}

        {/* datas */}
        <div className='flex flex-col gap-0.5 mt-2'>
          <div className='flex items-center text-xs text-gray-500 gap-1'>
            <Clock size={14} className='text-gray-500' />
            <span>Дата регистрации:</span>
            <span>{new Date(teamMember.createdAt).toLocaleDateString()}</span>
          </div>

          <div className='flex items-center text-xs text-gray-500 gap-1'>
            <Clock size={14} className='text-gray-500' />
            <span>Последнее обновление:</span>
            <span>{new Date(teamMember.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
