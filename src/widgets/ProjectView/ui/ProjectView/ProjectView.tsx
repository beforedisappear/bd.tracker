'use client';

import { ProjectViewWrapper } from '../ProjectViewWrapper/ProjectViewWrapper';
import { ViewBoard } from '@/features/ViewBoard';
import { CreateColumn } from '@/features/CreateColumn';

import { useQuery } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';
import { useDeviceType } from '@/shared/lib/deviceType/useDeviceType';

import { boardQueries } from '@/entities/Board';
import { getContentMargin } from '../../lib/getContentMargin';

export function ProjectView() {
  const { boardId } = useProject();
  const { isMobile } = useDeviceType();

  const { data: board } = useQuery({
    ...boardQueries.getBoardById({ boardId: boardId as string }),
    enabled: !!boardId,
  });

  return (
    <ProjectViewWrapper>
      <div
        className='flex'
        style={{ marginInline: getContentMargin(isMobile) }}
      >
        <ViewBoard board={board} />
        <CreateColumn />
      </div>
    </ProjectViewWrapper>
  );
}
