import { SquarePen, Users, Trash } from 'lucide-react';

import { DropdownMenu } from '@/shared/ui/c';
import { ManageProjectsItemMenuTrigger } from '../ManageProjectsItemMenuTrigger/ManageProjectsItemMenuTrigger';

import { useState } from 'react';

interface Props {
  onRenameProject: () => void;
  onParticipants: () => void;
  onDeleteProject: () => void;
}

export function ManageProjectsItemMenu(props: Props) {
  const { onRenameProject, onParticipants, onDeleteProject } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      trigger={<ManageProjectsItemMenuTrigger />}
      contentProps={{
        align: 'start',
        onFocusOutside: () => setIsOpen(false),
      }}
      // TODO: add handling
      options={[
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
          onSelect: onParticipants,
        },
        {
          type: 'item',
          label: {
            icon: <Trash className='h-4 w-4' />,
            text: 'Удалить',
          },
          onSelect: onDeleteProject,
        },
      ]}
      open={isOpen}
      onOpenChange={setIsOpen}
      className='w-56'
    />
  );
}
