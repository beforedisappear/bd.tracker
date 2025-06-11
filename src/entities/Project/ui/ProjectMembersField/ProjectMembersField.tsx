import { ErrorBoundary, MembersField } from '@/shared/ui/c';
import { ProjectMembersFieldLoading } from './ProjectMembersField.loading';

import { useQuery } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';

import { projectQueries } from '../../api';

import { cn } from '@/shared/lib/css';

import type { CheckedState } from '@radix-ui/react-checkbox';
import type { MouseEvent } from 'react';

interface Props {
  label?: string;
  labelClassName?: string;
  onCheckedChange: (checked: CheckedState, memberId: string) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  customHeight?: number;
}

export function ProjectMembersField(props: Props) {
  const { label, onCheckedChange, customHeight, labelClassName, onClick } =
    props;

  const { projectId } = useProject();

  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery(projectQueries.getProjectMembers({ projectId }));

  if (isLoading) return <ProjectMembersFieldLoading />;
  else if (isError) return <ErrorBoundary />;

  return (
    <div className='flex flex-col gap-2 flex-1' onClick={onClick}>
      {label && (
        <span className={cn('text-sm font-medium', labelClassName)}>
          {label}
        </span>
      )}

      <MembersField
        members={members}
        onCheckedChange={onCheckedChange}
        customHeight={customHeight}
      />
    </div>
  );
}
