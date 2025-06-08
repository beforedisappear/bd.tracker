import { ViewBoardTaskWrapper } from '../ViewBoardTaskWrapper/ViewBoardTaskWrapper';
import { ViewBoardTaskHeader } from '../ViewBoardTaskHeader/ViewBoardTaskHeader';
import { ViewBoardTaskContent } from '../ViewBoardTaskContent/ViewBoardTaskContent';

import type { Task } from '@/entities/Board';

interface Props {
  data: Task;
}

export function ViewBoardTask(props: Props) {
  const {
    data: { id, title, isDone, color },
  } = props;

  return (
    <ViewBoardTaskWrapper id={id} color={color}>
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
