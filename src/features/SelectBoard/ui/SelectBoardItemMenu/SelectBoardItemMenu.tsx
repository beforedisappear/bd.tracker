import { DropdownMenu } from '@/shared/ui/c';
import { SelectBoardItemMenuTrigger } from '../SelectBoardItemMenuTrigger/SelectBoardItemMenuTrigger';

import { useState } from 'react';

export function SelectBoardItemMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      trigger={<SelectBoardItemMenuTrigger />}
      options={[
        {
          type: 'item',
          label: {
            text: 'Delete 1',
          },
        },
        {
          type: 'item',
          label: {
            text: 'Delete 2',
          },
        },
        {
          type: 'item',
          label: {
            text: 'Delete 3',
          },
        },
      ]}
      open={isOpen}
      onOpenChange={setIsOpen}
      contentProps={{
        onFocusOutside: () => setIsOpen(false),
      }}
    />
  );
}
