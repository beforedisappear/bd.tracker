'use client';

import {
  ProjectMembersField,
  ProjectMembersFieldSchema,
} from '@/entities/Project/@x/board';
import { Form } from '@/shared/ui/c';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useProject } from '@/shared/lib/navigation';

import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage } from '@/shared/lib/error';

import { Task, taskQueries } from '@/entities/Board';
import type { CheckedState } from '@radix-ui/react-checkbox';

interface Props {
  taskId: Task['id'];
  assignees: Task['assignees'];
  offAll?: boolean;
}

export function BoardTaskAssigneesPopoverContent(props: Props) {
  const { taskId, assignees, offAll } = props;

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
    }).catch(e => toast.error(getErrorMessage(e)));
  };

  return (
    <Form {...form}>
      <ProjectMembersField
        onCheckedChange={onSelect}
        onClick={e => e.stopPropagation()}
        offAll={offAll}
      />
    </Form>
  );
}
