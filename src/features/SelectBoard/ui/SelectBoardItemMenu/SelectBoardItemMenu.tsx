import { PencilIcon, TrashIcon } from 'lucide-react';

import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { SelectBoardItemMenuTrigger } from '../SelectBoardItemMenuTrigger/SelectBoardItemMenuTrigger';

import { useState } from 'react';
import { getDeleteBoardModal } from '@/entities/Board';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

export function SelectBoardItemMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { setShowDeleteBoardModal } = usePrivateGlobalStore(
    getDeleteBoardModal(),
  );

  const onDeleteBoard = () => {
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
