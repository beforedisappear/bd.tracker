import { SquarePen, Users, Trash } from 'lucide-react';

import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { ManageProjectsItemMenuTrigger } from '../ManageProjectsItemMenuTrigger/ManageProjectsItemMenuTrigger';
import {
  getProjectMembersModalActions,
  getDeleteProjectModalActions,
} from '@/entities/Project';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

interface Props {
  projectId: string;
  onRenameProject: () => void;
}

export function ManageProjectsItemMenu(props: Props) {
  const { projectId, onRenameProject } = props;

  const { setShowProjectMembersModal, setCurrentProjectId } =
    usePrivateGlobalStore(getProjectMembersModalActions());
  const { setShowDeleteProjectModal } = usePrivateGlobalStore(
    getDeleteProjectModalActions(),
  );

  const onOpenProjectMembersModal = () => {
    setCurrentProjectId(projectId);
    setShowProjectMembersModal(true);
  };

  const onOpenDeleteProjectModal = () => {
    setCurrentProjectId(projectId);
    setShowDeleteProjectModal(true);
  };

  const options: DropDownMenuOptions = [
    {
      type: 'item',
      label: {
        icon: <SquarePen className='h-4 w-4' />,
        text: 'Переименовать',
      },
      onSelect: onRenameProject,
    },
    {
      type: 'item',
      label: {
        icon: <Users className='h-4 w-4' />,
        text: 'Участники',
      },
      onSelect: onOpenProjectMembersModal,
    },
    {
      type: 'item',
      label: {
        icon: <Trash className='h-4 w-4' />,
        text: 'Удалить',
      },
      onSelect: onOpenDeleteProjectModal,
    },
  ];

  return (
    <DropdownMenu
      trigger={<ManageProjectsItemMenuTrigger />}
      contentProps={{ align: 'start' }}
      // modal={false}
      options={options}
      className='w-56'
    />
  );
}
