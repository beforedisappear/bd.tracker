import { PencilIcon, Tag, TrashIcon } from 'lucide-react';

import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { ManageBoardsItemMenuTrigger } from '../ManageBoardsItemMenuTrigger/ManageBoardsItemMenuTrigger';

import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';

import { getDeleteBoardModalActions } from '@/entities/Board';
import { toast } from 'sonner';

import { LAST_BOARD_ERROR_MESSAGE } from '../../constants';

interface Props {
  boardId: string;
  countOfBoards: number;
  onRenameBoard: () => void;
}

export function ManageBoardsItemMenu(props: Props) {
  const { boardId, countOfBoards, onRenameBoard } = props;

  const { setShowDeleteBoardModal, setCurrentBoardId } = usePrivateGlobalStore(
    getDeleteBoardModalActions(),
  );

  const setShowManageStickersModal = usePrivateGlobalStore(
    state => state.setShowManageStickersModal,
  );

  const onDeleteBoard = () => {
    if (countOfBoards === 1) {
      toast.warning(LAST_BOARD_ERROR_MESSAGE);
      return;
    }

    setShowDeleteBoardModal(true);
    setCurrentBoardId(boardId);
  };

  const onShowManageStickersModal = () => {
    setCurrentBoardId(boardId);
    setShowManageStickersModal(true);
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
