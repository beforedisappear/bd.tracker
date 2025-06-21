import { Pencil, Trash2 } from 'lucide-react';

import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { ViewBoardColumnMenuTrigger } from '../ViewBoardColumnMenuTrigger/ViewBoardColumnMenuTrigger';

import { useBoardStore, getDeleteColumnModal } from '@/entities/Board';

interface Props {
  columnId: string;
  onRenameColumn: () => void;
}

export function ViewBoardColumnMenu(props: Props) {
  const { columnId, onRenameColumn } = props;

  const { setShowDeleteColumnModal, setCurrentColumnId } = useBoardStore(
    getDeleteColumnModal(),
  );

  const onDelete = () => {
    setShowDeleteColumnModal(true);
    setCurrentColumnId(columnId);
  };

  const options: DropDownMenuOptions = [
    {
      type: 'item',
      label: { text: 'Переименовать', icon: <Pencil /> },
      onSelect: onRenameColumn,
    },
    {
      type: 'item',
      label: { text: 'Удалить', icon: <Trash2 /> },
      onSelect: onDelete,
    },
  ];

  return (
    <DropdownMenu
      trigger={<ViewBoardColumnMenuTrigger />}
      options={options}
      contentProps={{ loop: false, onCloseAutoFocus: e => e.preventDefault() }}
    />
  );
}
