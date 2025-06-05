import { Pencil, Trash2 } from 'lucide-react';

import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { ViewBoardColumnMenuTrigger } from '../ViewBoardColumnMenuTrigger/ViewBoardColumnMenuTrigger';

import { useBoardStore, getDeleteColumnModal } from '@/entities/Board';
import { useState } from 'react';

interface Props {
  columnId: string;
}

export function ViewBoardColumnMenu(props: Props) {
  const { columnId } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { setShowDeleteColumnModal, setCurrentColumnId } = useBoardStore(
    getDeleteColumnModal(),
  );

  const onRename = () => {
    console.log('rename');
  };

  const onDelete = () => {
    setShowDeleteColumnModal(true);
    setCurrentColumnId(columnId);
  };

  const options: DropDownMenuOptions = [
    {
      type: 'item',
      label: { text: 'Переименовать', icon: <Pencil /> },
      onSelect: onRename,
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
      contentProps={{
        onFocusOutside: () => setIsOpen(false),
      }}
      options={options}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
