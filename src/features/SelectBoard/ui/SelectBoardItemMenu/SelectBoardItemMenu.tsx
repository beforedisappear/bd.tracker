import { PencilIcon, TrashIcon } from 'lucide-react';

import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { SelectBoardItemMenuTrigger } from '../SelectBoardItemMenuTrigger/SelectBoardItemMenuTrigger';

import { useState } from 'react';
import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import { getDeleteBoardModal } from '@/entities/Board';
import { toast } from 'sonner';
import { LAST_BOARD_ERROR_MESSAGE } from '../../constants';

interface Props {
  boardId: string;
  countOfBoards: number;
}

export function SelectBoardItemMenu(props: Props) {
  const { boardId, countOfBoards } = props;

  const [isOpen, setIsOpen] = useState(false);

  const { setShowDeleteBoardModal, setDeletingBoardId } = usePrivateGlobalStore(
    getDeleteBoardModal(),
  );

  const onDeleteBoard = () => {
    if (countOfBoards === 1) {
      toast.warning(LAST_BOARD_ERROR_MESSAGE);
      return;
    }

    setShowDeleteBoardModal(true);
    setDeletingBoardId(boardId);
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
