'use client';

import { useParams } from 'next/navigation';

export function useProject() {
  const { ids } = useParams<{ ids: string[] }>()!;

  const projectId = ids[0];
  const boardId = ids[1] as string | undefined;

  return { projectId, boardId };
}
