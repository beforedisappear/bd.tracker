import type { TeamMember } from '@/entities/Team';
import type { ProjectMember } from '@/entities/Project';

export const mapTeamMembersToProjectMembers = (
  teamMembers: TeamMember[],
  projectMembers: ProjectMember[],
): (TeamMember & { isProjectMember: boolean })[] => {
  const projectMemberIds = new Set(projectMembers.map(member => member.id));

  return teamMembers.map(member => ({
    ...member,
    isProjectMember: projectMemberIds.has(member.id),
  }));
};
