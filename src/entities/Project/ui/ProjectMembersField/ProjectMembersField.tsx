import { ErrorBoundary, MembersField } from '@/shared/ui/c';
import { ProjectMembersFieldLoading } from './ProjectMembersField.loading';

import { useQuery } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';

import { projectQueries } from '../../api';

import type { CheckedState } from '@radix-ui/react-checkbox';

interface Props {
  label?: string;
  onCheckedChange: (checked: CheckedState, memberId: string) => void;
  customHeight?: number;
}

export function ProjectMembersField(props: Props) {
  const { label, onCheckedChange, customHeight } = props;

  const { projectId } = useProject();

  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery(projectQueries.getProjectMembers({ projectId }));

  if (isLoading) return <ProjectMembersFieldLoading />;
  else if (isError) return <ErrorBoundary />;

  return (
    <div className='flex flex-col gap-2 flex-1'>
      {label && <span className='text-sm font-medium'>{label}</span>}

      <MembersField
        members={members}
        onCheckedChange={onCheckedChange}
        customHeight={customHeight}
      />
    </div>
  );
}
