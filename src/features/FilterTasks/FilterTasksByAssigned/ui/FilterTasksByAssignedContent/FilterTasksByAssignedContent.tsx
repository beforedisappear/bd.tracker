import {
  ProjectMembersField,
  ProjectMembersFieldSchema,
} from '@/entities/Project';
import { Form } from '@/shared/ui/Form';

import {
  useBoardStore,
  getMapAssigneesTaskFilterByBoardId,
} from '@/entities/Board';
import { useProject } from '@/shared/lib/navigation';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import type { CheckedState } from '@radix-ui/react-checkbox';

export function FilterTasksByAssignedContent() {
  const { boardId } = useProject();
  const {
    setMapAssigneesTaskFilterByBoardId,
    mapAssigneesTaskFilterByBoardId,
  } = useBoardStore(getMapAssigneesTaskFilterByBoardId());

  const assignees = mapAssigneesTaskFilterByBoardId[boardId] ?? [];

  const form = useForm<z.infer<typeof ProjectMembersFieldSchema>>({
    defaultValues: {
      membersIds: Object.fromEntries(assignees.map(id => [id, true])),
    },
    resolver: zodResolver(ProjectMembersFieldSchema),
  });

  const onCheckedChange = (checked: CheckedState, memberId: string) => {
    const newAssignees = [...assignees];

    if (checked) {
      newAssignees.push(memberId);
    } else {
      const memberIndex = newAssignees.indexOf(memberId);
      if (memberIndex !== -1) newAssignees.splice(memberIndex, 1);
    }

    setMapAssigneesTaskFilterByBoardId(boardId, newAssignees);
  };

  return (
    <Form {...form}>
      <ProjectMembersField
        label='Ответственный'
        labelClassName='text-[10px] font-medium uppercase text-muted-foreground'
        customHeight={120}
        onCheckedChange={onCheckedChange}
        offAll
      />
    </Form>
  );
}
