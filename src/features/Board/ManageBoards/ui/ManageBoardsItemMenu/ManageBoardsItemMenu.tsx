import { PencilIcon, Tag, TrashIcon } from 'lucide-react';

import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { ManageBoardsItemMenuTrigger } from '../ManageBoardsItemMenuTrigger/ManageBoardsItemMenuTrigger';

import { boardEventBus } from '@/entities/Board';
import { toast } from 'sonner';

import { LAST_BOARD_ERROR_MESSAGE } from '../../constants';

interface Props {
  boardId: string;
  countOfBoards: number;
  onRenameBoard: () => void;
}

export function ManageBoardsItemMenu(props: Props) {
  const { boardId, countOfBoards, onRenameBoard } = props;

  const onShowManageStickersModal = () => {
    boardEventBus.emit('showManageStickersModal', { boardId });
  };

  const onDeleteBoard = () => {
    if (countOfBoards === 1) {
      toast.warning(LAST_BOARD_ERROR_MESSAGE);
      return;
    }

    boardEventBus.emit('showDeleteBoardModal', { boardId });
  };

  const options: DropDownMenuOptions = [
    {
      type: 'item',
      label: { text: 'Переименовать', icon: <PencilIcon /> },
      onSelect: onRenameBoard,
    },
    {
      type: 'item',
      label: { text: 'Метки доски', icon: <Tag /> },
      onSelect: onShowManageStickersModal,
    },
    {
      type: 'item',
      label: { text: 'Удалить', icon: <TrashIcon /> },
      onSelect: onDeleteBoard,
    },
  ];

  return (
    <DropdownMenu
      trigger={<ManageBoardsItemMenuTrigger />}
      options={options}
      contentProps={{ loop: false, onCloseAutoFocus: e => e.preventDefault() }}
    />
  );
}
