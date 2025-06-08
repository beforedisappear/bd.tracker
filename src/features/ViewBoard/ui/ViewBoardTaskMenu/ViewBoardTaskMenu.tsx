import { PencilIcon, TrashIcon } from 'lucide-react';

import { DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';
import { ViewBoardTaskMenuTrigger } from '../ViewBoardTaskMenuTrigger/ViewBoardTaskMenuTrigger';
import { useState } from 'react';

export function ViewBoardTaskMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const options: DropDownMenuOptions = [
    {
      type: 'item',
      label: {
        text: 'Переименовать',
        icon: <PencilIcon className='size-4' />,
      },
      onSelect: e => {
        e.stopPropagation();
      },
    },
    {
      type: 'item',
      label: {
        text: 'Удалить',
        icon: <TrashIcon className='size-4' />,
      },
      onSelect: e => {
        e.stopPropagation();
      },
    },
  ];

  return (
    <DropdownMenu
      options={options}
      trigger={<ViewBoardTaskMenuTrigger />}
      open={isOpen}
      onOpenChange={setIsOpen}
      contentProps={{ onFocusOutside: () => setIsOpen(false) }}
    />
  );
}
