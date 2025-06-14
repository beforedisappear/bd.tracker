import { ViewBoardTaskWrapper } from '../ViewBoardTaskWrapper/ViewBoardTaskWrapper';
import { ViewBoardTaskHeader } from '../ViewBoardTaskHeader/ViewBoardTaskHeader';
import { ViewBoardTaskContent } from '../ViewBoardTaskContent/ViewBoardTaskContent';

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

  return (
    <ViewBoardTaskWrapper id={id} color={color} isFiltered={isFiltered}>
      <ViewBoardTaskHeader
        taskId={id}
        title={title}
        isDone={isDone}
        color={color}
      />

      <ViewBoardTaskContent data={props.data} />
    </ViewBoardTaskWrapper>
  );
}
