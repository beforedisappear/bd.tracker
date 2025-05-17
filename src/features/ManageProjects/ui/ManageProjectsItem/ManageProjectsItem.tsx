import { Avatar } from '@/shared/ui/s';
import { ManageProjectsItemMenu } from '../ManageProjectsItemMenu/ManageProjectsItemMenu';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { getErrorMessage } from '@/shared/lib/error';
import { getProjectByIdRoutePath } from '@/shared/config/routes';
import { cn, getColorByFirstLetter } from '@/shared/lib/css';
import { getInitials } from '@/shared/lib/data';
import { getManageProjectsItemClassName } from '../../config';
import { projectQueries } from '@/entities/Project';
import { toast } from 'sonner';

import type { Project } from '@/entities/Project';
import type { MouseEvent } from 'react';

interface Props {
  project: Project;
  tenant: string;
}

export function ManageProjectsItem({ project, tenant }: Props) {
  const router = useRouter();

  const { mutateAsync: deleteProject } = useMutation(
    projectQueries.deleteProject(),
  );

  const onRedirectToProjectPage = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    router.push(getProjectByIdRoutePath(tenant, project.id));
  };

  const onDeleteProject = async () => {
    deleteProject({ projectId: project.id, teamIdOrSlug: tenant }).catch(e =>
      toast.error(getErrorMessage(e)),
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
        <span className='line-clamp-1 text-sm font-medium text-muted-foreground text-left'>
          {project.name}
        </span>

        <ManageProjectsItemMenu
          onRenameProject={() => {}}
          onParticipants={() => {}}
          onDeleteProject={onDeleteProject}
        />
      </div>

      <div className='flex items-center w-fit'>
        {project.members.slice(0, 5).map(member => (
          <Avatar
            key={member.id}
            src={''}
            alt={member.name}
            fallback={getInitials(member.name)}
            className='flex items-center justify-center w-6 h-6 text-xs mr-[-6px] border-2 border-muted'
            style={{ backgroundColor: getColorByFirstLetter(member.name) }}
          />
        ))}

        {project.members.length > 5 && (
          <span className='flex items-center justify-center w-7 h-6 text-xs text-muted-foreground ml-[2px] rounded-full bg-muted'>
            +{project.members.length - 5}
          </span>
        )}
      </div>
    </div>
  );
}
