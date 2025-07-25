import { ManageProjectsItemMembers } from '../ManageProjectsItemMembers/ManageProjectsItemMembers';
import { ManageProjectsItemMenu } from '../ManageProjectsItemMenu';
import { RenameInput, type RenameInputMethods } from '@/shared/ui/c';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useRef, type MouseEvent } from 'react';
import { useTeamAccess } from '@/entities/Team';

import {
  projectQueries,
  RenameProjectSchema,
  type ProjectWithFirstBoardId,
} from '@/entities/Project';

import { cn } from '@/shared/lib/css';
import { toast } from 'sonner';
import { getProjectByIdRoutePath } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/error';
import { getManageProjectsItemClassName } from '../../constants';

import { RESTRICTED_VIEW_MESSAGE } from '@/shared/constants/toast.constants';

interface Props {
  tenant: string;
  project: ProjectWithFirstBoardId;
}

export function ManageProjectsItem(props: Props) {
  const { tenant, project } = props;

  const { isEnoughAccessAsMember, isMember } = useTeamAccess({
    users: project.members,
  });

  const router = useRouter();
  const methodsRef = useRef<RenameInputMethods>(null);

  const { mutateAsync: renameProject } = useMutation(
    projectQueries.renameProject(),
  );

  const onRenameProject = (name: string) => {
    renameProject({ teamIdOrSlug: tenant, projectId: project.id, name })
      .then(() => {})
      .catch(e => toast.error(getErrorMessage(e)));
  };

  const onRedirectToProjectPage = (e: MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.target as Node)) return;

    if (!isMember) return toast.error(RESTRICTED_VIEW_MESSAGE);

    const path = getProjectByIdRoutePath(
      tenant,
      project.id,
      project.firstBoardId,
    );

    router.push(path);
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
          methodsRef={methodsRef}
          initialName={project.name}
          schema={RenameProjectSchema}
          className='text-muted-foreground'
          onRename={onRenameProject}
        />

        {isEnoughAccessAsMember && (
          <ManageProjectsItemMenu
            projectId={project.id}
            onRenameProject={() => methodsRef.current?.onStartEditing?.()}
          />
        )}
      </div>

      <ManageProjectsItemMembers members={project.members} />
    </div>
  );
}
