'use client';

import { useParams } from 'next/navigation';

export function useProject() {
  const { projectId, boardId } = useParams<{
    projectId: string;
    boardId: string;
  }>()!;

  return { projectId, boardId };
}
