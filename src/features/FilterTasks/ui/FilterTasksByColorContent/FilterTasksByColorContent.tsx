import { Button } from '@/shared/ui/c';

import {
  BoardTaskColorsInput,
  getMapColorTaskFilterByBoardId,
  useBoardStore,
  type Color,
} from '@/entities/Board';
import { useProject } from '@/shared/lib/navigation';

import type { MouseEvent } from 'react';

export function FilterTasksByColorContent() {
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
    <>
      <BoardTaskColorsInput
        currentColor={mapColorTaskFilterByBoardId[boardId]}
        onSelect={onSelect}
        onClick={e => e.stopPropagation()}
      />

      <Button variant='outline' size='sm' onClick={onResetFilter}>
        Сбросить фильтр
      </Button>
    </>
  );
}
