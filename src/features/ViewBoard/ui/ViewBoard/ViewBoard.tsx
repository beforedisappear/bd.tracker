import { ViewBoardColumn } from '../ViewBoardColumn/ViewBoardColumn';
// import { ViewBoardTask } from '../ViewBoardTask/ViewBoardTask';

import type { Board } from '@/entities/Board';

interface Props {
  board: Board;
}

export function ViewBoard(props: Props) {
  const { board } = props;

  if (board.columns.length === 0) return null;

  return (
    <div className='flex gap-4 h-full overflow-x-auto pb-4'>
      {board.columns.map(column => (
        <ViewBoardColumn key={column.id} data={column} />
      ))}
    </div>
  );
}
