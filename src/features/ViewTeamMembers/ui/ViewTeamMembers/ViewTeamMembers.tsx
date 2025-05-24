import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

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
  const { tenant } = useParams<{ tenant: string }>()!;
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
      className='h-full w-full pb-4
      md:max-w-[300px]'
      scrollBar={{ orientation: 'horizontal' }}
      type='always'
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
