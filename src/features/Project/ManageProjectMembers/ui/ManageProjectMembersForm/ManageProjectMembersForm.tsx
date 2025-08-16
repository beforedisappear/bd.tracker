import { Loader2 } from 'lucide-react';

import { Button, Form } from '@/shared/ui/c';
import {
  TeamMembersField,
  useTeamAccess,
  type TeamMember,
} from '@/entities/Team';

import { projectQueries } from '@/entities/Project';

import { useDeviceType } from '@/shared/lib/deviceType/c';
import { useTenant } from '@/shared/lib/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { cn } from '@/shared/lib/css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ManageProjectMembersSchema } from '../../model/schemes';

interface Props {
  projectId?: string;
  data?: (TeamMember & { isProjectMember: boolean })[];
  onCloseModal: () => void;
}

export function ManageProjectMembersForm(props: Props) {
  const { data = [], projectId, onCloseModal } = props;

  const tenant = useTenant();
  const { isDesktop } = useDeviceType();
  const { isEnoughAccess } = useTeamAccess();

  const memberValues = data.map(member => [member.id, member.isProjectMember]);

  const form = useForm<z.infer<typeof ManageProjectMembersSchema>>({
    resolver: zodResolver(ManageProjectMembersSchema),
    defaultValues: {
      all: memberValues.every(member => member[1]),
      keyword: '',
      membersIds: Object.fromEntries(memberValues),
    },
  });

  const { mutateAsync: updateProjectMembers, isPending } = useMutation(
    projectQueries.updateProjectMembers(),
  );

  if (!projectId) return null;

  const onSubmit = form.handleSubmit(data => {
    const membersIds = Object.keys(data.membersIds).filter(
      key => data.membersIds?.[key],
    );

    updateProjectMembers({ projectId, teamIdOrSlug: tenant, membersIds })
      .then(onCloseModal)
      .catch(console.error);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='flex flex-col gap-4 flex-1'>
        <TeamMembersField disabled={!isEnoughAccess} />

        <div className='flex justify-end gap-2'>
          {isDesktop && (
            <Button type='button' variant='outline' onClick={onCloseModal}>
              Отмена
            </Button>
          )}

          <Button
            type='submit'
            className={cn('mt-auto desktop:w-36 mobile:w-full')}
            disabled={!form.formState.isDirty || isPending || !isEnoughAccess}
          >
            {isPending ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <span>Сохранить</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
