import { useQuery } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';

import { ErrorBoundary, ScrollArea } from '@/shared/ui/c';
import { ViewTeamMembersHeader } from '../ViewTeamMembersHeader/ViewTeamMembersHeader';
import { ViewTeamMembersItem } from '../ViewTeamMembersItem/ViewTeamMembersItem';
import { ViewTeamMembersLoading } from './ViewTeamMembers.loading';

import {
  getCurrentTeamMemberId,
  getTeamMemberProfileModal,
  teamQueries,
  useTeamStore,
} from '@/entities/Team';

// TODO: add mobile view

export function ViewTeamMembers() {
  const tenant = useTenant();
  const { setShowTeamMemberProfileModal } = useTeamStore(
    getTeamMemberProfileModal(),
  );
  const { setCurrentTeamMemberId } = useTeamStore(getCurrentTeamMemberId());

  const {
    data: teamMembers,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(teamQueries.getTeamMembers({ idOrSlug: tenant }));

  if (isLoading) return <ViewTeamMembersLoading />;
  else if (isError || !teamMembers)
    return <ErrorBoundary className='m-auto' error={error} reset={refetch} />;

  const handleOpenTeamMemberProfileModal = (memberId: string) => {
    setCurrentTeamMemberId(memberId);
    setShowTeamMemberProfileModal(true);
  };

  return (
    <ScrollArea
      type='always'
      className='h-full w-full pb-4
      md:max-w-[calc(100vw-24px*2-16px*2-2px)]'
      scrollBar={{ orientation: 'horizontal' }}
    >
      <ViewTeamMembersHeader />
      {teamMembers.map(member => (
        <ViewTeamMembersItem
          key={member.id}
          member={member}
          onOpenProfile={handleOpenTeamMemberProfileModal}
        />
      ))}
    </ScrollArea>
  );
}
