import { ManageProjectsItemMembers } from '../ManageProjectsItemMembers/ManageProjectsItemMembers';
import { ManageProjectsItemMenu } from '../ManageProjectsItemMenu';
import { RenameInput } from '@/shared/ui/c';

import { useRouter } from 'next/navigation';
import { useProjectNameEditing } from '../../lib';
import { useTeamAccess } from '@/entities/Team';
import { useRef, type MouseEvent } from 'react';

import { cn } from '@/shared/lib/css';
import { getProjectByIdRoutePath } from '@/shared/config/routes';
import { getManageProjectsItemClassName } from '../../constants';

import type { ProjectWithFirstBoardId } from '@/entities/Project';

interface Props {
  tenant: string;
  project: ProjectWithFirstBoardId;
}

export function ManageProjectsItem({ project, tenant }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { isEnoughAccess } = useTeamAccess();

  const {
    isEditing,
    projectName,
    setProjectName,
    onStartEditing,
    onEndEditing,
  } = useProjectNameEditing({ project, tenant, inputRef });

  const onRedirectToProjectPage = (e: MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.target as Node)) return;

    router.push(
      getProjectByIdRoutePath(tenant, project.id, project.firstBoardId),
    );
  };

  return (
    <div
      className={cn(
        getManageProjectsItemClassName(),
        'flex flex-col justify-between p-3 bg-muted shadow-md cursor-pointer ransition-colors duration-200 hover:bg-accent',
      )}
      onClick={onRedirectToProjectPage}
    >
      <div className='flex justify-between w-full h-6 gap-1'>
        <RenameInput
          ref={inputRef}
          isEditing={isEditing}
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          onBlur={onEndEditing}
          className='text-muted-foreground'
        />

        {isEnoughAccess && (
          <ManageProjectsItemMenu
            projectId={project.id}
            onRenameProject={onStartEditing}
          />
        )}
      </div>

      <ManageProjectsItemMembers members={project.members} />
    </div>
  );
}
