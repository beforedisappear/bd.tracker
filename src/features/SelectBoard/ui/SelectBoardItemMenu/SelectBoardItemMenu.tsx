import { PencilIcon, TrashIcon } from 'lucide-react';

import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { SelectBoardItemMenuTrigger } from '../SelectBoardItemMenuTrigger/SelectBoardItemMenuTrigger';

import { useState } from 'react';
import { getDeleteBoardModal } from '@/entities/Board';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

interface Props {
  boardId: string;
}

export function SelectBoardItemMenu(props: Props) {
  const { boardId } = props;

  const [isOpen, setIsOpen] = useState(false);

  const { setShowDeleteBoardModal, setDeletingBoardId } = usePrivateGlobalStore(
    getDeleteBoardModal(),
  );

  const onDeleteBoard = () => {
    setDeletingBoardId(boardId);
    setShowDeleteBoardModal(true);
  };

  const options: DropDownMenuOptions = [
    {
      type: 'item',
      label: { text: 'Переименовать', icon: <PencilIcon /> },
      onSelect: () => {},
    },
    {
      type: 'item',
      label: { text: 'Удалить', icon: <TrashIcon /> },
      onSelect: onDeleteBoard,
    },
  ];

  return (
    <DropdownMenu
      trigger={<SelectBoardItemMenuTrigger />}
      options={options}
      open={isOpen}
      onOpenChange={setIsOpen}
      contentProps={{
        onFocusOutside: () => setIsOpen(false),
      }}
    />
  );
}
