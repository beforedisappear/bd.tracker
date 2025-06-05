import { Trash2 } from 'lucide-react';

import { DropdownMenu } from '@/shared/ui/c';
import { ViewBoardColumnMenuTrigger } from '../ViewBoardColumnMenuTrigger/ViewBoardColumnMenuTrigger';

import { useProjectStore, getDeleteColumnModal } from '@/entities/Project';

interface Props {
  columnId: string;
}

export function ViewBoardColumnMenu(props: Props) {
  const { columnId } = props;

  const { setShowDeleteColumnModal, setDeletingColumnId } = useProjectStore(
    getDeleteColumnModal(),
  );

  const onDelete = () => {
    setShowDeleteColumnModal(true);
    setDeletingColumnId(columnId);
  };

  return (
    <DropdownMenu
      trigger={<ViewBoardColumnMenuTrigger />}
      options={[
        {
          type: 'item',
          label: { text: 'Удалить', icon: <Trash2 /> },
          onSelect: onDelete,
        },
      ]}
    />
  );
}
