import { ViewBoardTaskWrapper } from '../ViewBoardTaskWrapper/ViewBoardTaskWrapper';
import { ViewBoardTaskContent } from '../ViewBoardTaskContent/ViewBoardTaskContent';
import { BoardTaskHeader } from '@/entities/Board';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { TASK_PARAM } from '@/shared/config/routes';

import type { Task } from '@/entities/Board';

interface Props {
  data: Task;
  isFiltered?: boolean;
}

export function ViewBoardTask(props: Props) {
  const {
    data: { id, title, isDone, color },
    isFiltered = false,
  } = props;

  const { push } = useRouter();

  const onTaskClose = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.has(TASK_PARAM)) return;

    searchParams.delete(TASK_PARAM);
    push(`?${searchParams.toString()}`);
  }, [push]);

  return (
    <ViewBoardTaskWrapper id={id} color={color} isFiltered={isFiltered}>
      <BoardTaskHeader
        key={`${id}-${isDone}`}
        taskId={id}
        title={title}
        isDone={isDone}
        color={color}
        onClose={onTaskClose}
      />

      <ViewBoardTaskContent data={props.data} />
    </ViewBoardTaskWrapper>
  );
}
