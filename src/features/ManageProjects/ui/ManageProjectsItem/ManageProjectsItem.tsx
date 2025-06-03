import { Avatar } from '@/shared/ui/s';
import { ManageProjectsItemMenu } from '../ManageProjectsItemMenu/ManageProjectsItemMenu';

import { useRouter } from 'next/navigation';

import { getProjectByIdRoutePath } from '@/shared/config/routes';
import { cn, getColorByFirstLetter } from '@/shared/lib/css';
import { getInitials } from '@/shared/lib/data';
import { getManageProjectsItemClassName } from '../../constants';
import {
  getProjectMembersModal,
  getDeleteProjectModal,
} from '@/entities/Project';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import type { Project } from '@/entities/Project';
import type { MouseEvent } from 'react';

interface Props {
  project: Project;
  tenant: string;
}

export function ManageProjectsItem({ project, tenant }: Props) {
  const router = useRouter();

  const { setShowProjectMembersModal, setCurrentProjectId } =
    usePrivateGlobalStore(getProjectMembersModal());
  const { setShowDeleteProjectModal } = usePrivateGlobalStore(
    getDeleteProjectModal(),
  );

  const onRedirectToProjectPage = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    router.push(getProjectByIdRoutePath(tenant, project.id));
  };

  const onOpenProjectMembersModal = () => {
    setCurrentProjectId(project.id);
    setShowProjectMembersModal(true);
  };

  const onOpenDeleteProjectModal = () => {
    setCurrentProjectId(project.id);
    setShowDeleteProjectModal(true);
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
          onParticipants={onOpenProjectMembersModal}
          onDeleteProject={onOpenDeleteProjectModal}
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
