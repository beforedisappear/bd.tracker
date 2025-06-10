import { ProjectMembersField } from '@/entities/Project';
import { Form } from '@/shared/ui/Form';

import {
  getMapAssigneesTaskFilterByBoardId,
  useBoardStore,
} from '@/entities/Board';
import { useProject } from '@/shared/lib/navigation';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { TeamMembersFieldSchema } from '@/entities/Team';

import type { CheckedState } from '@radix-ui/react-checkbox';
import { zodResolver } from '@hookform/resolvers/zod';

export function FilterTasksByAssignedContent() {
  const { boardId } = useProject();
  const {
    setMapAssigneesTaskFilterByBoardId,
    mapAssigneesTaskFilterByBoardId,
  } = useBoardStore(getMapAssigneesTaskFilterByBoardId());

  const assignees = mapAssigneesTaskFilterByBoardId[boardId] ?? [];

  const form = useForm<z.infer<typeof TeamMembersFieldSchema>>({
    defaultValues: {
      membersIds: Object.fromEntries(assignees.map(id => [id, true])),
    },
    resolver: zodResolver(TeamMembersFieldSchema),
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
        customHeight={120}
        onCheckedChange={onCheckedChange}
      />
    </Form>
  );
}
