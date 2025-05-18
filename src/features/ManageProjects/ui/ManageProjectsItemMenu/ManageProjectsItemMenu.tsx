import { SquarePen, Users, Trash } from 'lucide-react';
import { DropdownMenu } from '@/shared/ui/c';
import { ManageProjectsItemPopoverTrigger } from '../ManageProjectsItemPopoverTrigger/ManageProjectsItemPopoverTrigger';

interface Props {
  onRenameProject: () => void;
  onParticipants: () => void;
  onDeleteProject: () => void;
}

export function ManageProjectsItemMenu(props: Props) {
  const { onRenameProject, onParticipants, onDeleteProject } = props;

  return (
    <DropdownMenu
      trigger={<ManageProjectsItemPopoverTrigger />}
      content={{
        align: 'start',
      }}
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
      className='w-56'
    />
  );
}
