'use client';

import { ViewBoard } from '@/features/ViewBoard';
import { CreateColumn } from '@/features/CreateColumn';

import { boardQueries } from '@/entities/Board';
import { useQuery } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';

export function ProjectView() {
  const { boardId } = useProject();

  const { data: board } = useQuery({
    ...boardQueries.getBoardById({ boardId: boardId as string }),
    enabled: !!boardId,
  });

  return (
    <div className='flex'>
      <ViewBoard />
      <CreateColumn />
    </div>
  );
}
