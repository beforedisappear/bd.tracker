import { ViewBoard } from '@/features/ViewBoard';
import { CreateColumn } from '@/features/CreateColumn';

import { boardQueries } from '@/entities/Board';
import { useQuery } from '@tanstack/react-query';

export function ProjectView() {
  // const { data: board } = useQuery(boardQueries.getBoardById());

  return (
    <div className='flex'>
      <ViewBoard />
      <CreateColumn />
    </div>
  );
}
