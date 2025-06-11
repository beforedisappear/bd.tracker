import {
  ProjectMembersField,
  ProjectMembersFieldSchema,
} from '@/entities/Project';
import { Form } from '@/shared/ui/c';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { taskQueries, type Task } from '@/entities/Board';
import type { CheckedState } from '@radix-ui/react-checkbox';

interface Props {
  taskId: Task['id'];
  assignees: Task['assignees'];
}

export function ViewBoardAssigneesPopoverContent(props: Props) {
  const { taskId, assignees } = props;

  const { boardId } = useProject();

  const { mutateAsync: updateTask } = useMutation(taskQueries.updateTask());

  const form = useForm<z.infer<typeof ProjectMembersFieldSchema>>({
    defaultValues: {
      membersIds: Object.fromEntries(assignees.map(user => [user.id, true])),
    },
    resolver: zodResolver(ProjectMembersFieldSchema),
  });

  const onSelect = (checked: CheckedState, memberId: string) => {
    const newAssigneeIds = [...assignees.map(el => el.id)];

    if (checked) newAssigneeIds.push(memberId);
    else newAssigneeIds.splice(newAssigneeIds.indexOf(memberId), 1);

    updateTask({
      taskId,
      boardId,
      assigneeIds: newAssigneeIds,
    });
  };

  return (
    <Form {...form}>
      <ProjectMembersField
        onCheckedChange={onSelect}
        onClick={e => e.stopPropagation()}
      />
    </Form>
  );
}
