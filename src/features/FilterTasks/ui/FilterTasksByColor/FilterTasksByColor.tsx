import { Button, Popover } from '@/shared/ui/c';
import { FilterTasksByColorTrigger } from '../FilterTasksByColorTrigger/FilterTasksByColorTrigger';

import {
  getMapColorTaskFilterByBoardId,
  useBoardStore,
  BoardTaskColorsInput,
  type Color,
} from '@/entities/Board';
import { useProject } from '@/shared/lib/navigation';
import { MouseEvent } from 'react';

export function FilterTasksByColor() {
  const { boardId } = useProject();
  const { mapColorTaskFilterByBoardId, setMapColorTaskFilterByBoardId } =
    useBoardStore(getMapColorTaskFilterByBoardId());

  const selectedColors = mapColorTaskFilterByBoardId[boardId] ?? [];

  const onSelect = (_: MouseEvent<HTMLButtonElement>, color: Color) => {
    const newColors = [...selectedColors];
    const colorIndex = selectedColors.indexOf(color);

    if (colorIndex === -1) newColors.push(color);
    else newColors.splice(colorIndex, 1);

    setMapColorTaskFilterByBoardId(boardId, newColors);
  };

  const onResetFilter = () => {
    setMapColorTaskFilterByBoardId(boardId, []);
  };

  return (
    <Popover
      trigger={<FilterTasksByColorTrigger />}
      className='flex flex-col w-52 gap-2'
    >
      <BoardTaskColorsInput
        currentColor={mapColorTaskFilterByBoardId[boardId]}
        onSelect={onSelect}
        onClick={e => e.stopPropagation()}
      />

      <Button variant='outline' size='sm' onClick={onResetFilter}>
        Сбросить фильтр
      </Button>
    </Popover>
  );
}
