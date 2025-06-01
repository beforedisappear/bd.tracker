import type { TeamMember } from '@/entities/Team';
import type { ProjectMember } from '@/entities/Project';

export const mapTeamMembersToProjectMembers = (
  teamMembers: TeamMember[],
  projectMembers: ProjectMember[],
): TeamMember[] => {
  const projectMembersMap = Object.fromEntries(
    projectMembers.map(member => [member.id, member]),
  );

  return teamMembers.filter(teamMember => projectMembersMap[teamMember.id]);
};
