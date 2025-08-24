import { ManageBoardsContent } from '../ManageBoardsContent/ManageBoardsContent';
import { ManageBoardsLoading } from './ManageBoards.loading';

import { useProject } from '@/shared/lib/navigation';
import { useQuery } from '@tanstack/react-query';
import { useManageBoardsRealTime } from '../../model';

import { boardQueries } from '@/entities/Board';

import { type RefObject } from 'react';

interface ManageBoardsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  occupiedWidth: number;
}

export function ManageBoards(props: ManageBoardsProps) {
  const { projectId } = useProject();

  const {
    data: boards,
    isLoading,
    isError,
  } = useQuery(boardQueries.getAllBoards({ projectId }));

  useManageBoardsRealTime(projectId);

  if (isLoading) return <ManageBoardsLoading />;
  else if (isError || !boards) return <></>;

  return <ManageBoardsContent boards={boards} {...props} />;
}
