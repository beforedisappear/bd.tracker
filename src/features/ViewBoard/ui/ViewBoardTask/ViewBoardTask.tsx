import { ViewBoardTaskWrapper } from '../ViewBoardTaskWrapper/ViewBoardTaskWrapper';
// import { useMutation } from '@tanstack/react-query';

// import { taskQueries } from '@/entities/Board/api/queries';

import type { Task } from '@/entities/Board';
import { ViewBoardTaskHeader } from '../ViewBoardTaskHeader/ViewBoardTaskHeader';

interface Props {
  data: Task;
}

export function ViewBoardTask(props: Props) {
  const {
    data: { id, title, isDone },
  } = props;

  // const { mutateAsync: updateTask } = useMutation(taskQueries.updateTask());

  return (
    <ViewBoardTaskWrapper id={id}>
      <ViewBoardTaskHeader taskId={id} title={title} isDone={isDone} />
    </ViewBoardTaskWrapper>
  );
}
