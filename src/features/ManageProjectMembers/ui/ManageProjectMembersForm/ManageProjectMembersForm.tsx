import { Loader2 } from 'lucide-react';

import { Button, Form } from '@/shared/ui/c';
import { TeamMembersField, type TeamMember } from '@/entities/Team';

import {
  getCurrentTeamProjectId,
  projectQueries,
  getProjectMembersModal,
} from '@/entities/Project';

import { usePrivateGlobalStore } from '@/shared/store/privateGlobalStore';
import { useDeviceType } from '@/shared/lib/deviceType/c';
import { useTenant } from '@/shared/lib/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ManageProjectMembersSchema } from '../../model/schemes';
import { cn } from '@/shared/lib/css';
interface Props {
  projectId: string;
  data: (TeamMember & { isProjectMember: boolean })[];
}

export function ManageProjectMembersForm(props: Props) {
  const { data, projectId } = props;
  const { isDesktop, isMobile } = useDeviceType();

  const tenant = useTenant();

  const { setCurrentProjectId } = usePrivateGlobalStore(
    getCurrentTeamProjectId(),
  );
  const { setShowProjectMembersModal } = usePrivateGlobalStore(
    getProjectMembersModal(),
  );

  const form = useForm<z.infer<typeof ManageProjectMembersSchema>>({
    resolver: zodResolver(ManageProjectMembersSchema),
    defaultValues: {
      keyword: '',
      membersIds: Object.fromEntries(
        data.map(member => [member.id, member.isProjectMember]),
      ),
    },
  });

  const { mutateAsync: updateProjectMembers, isPending } = useMutation(
    projectQueries.updateProjectMembers(),
  );

  const onSubmit = form.handleSubmit(data => {
    const membersIds = Object.keys(data.membersIds).filter(
      key => data.membersIds?.[key],
    );

    updateProjectMembers({
      projectId,
      teamIdOrSlug: tenant,
      membersIds,
    })
      .then(() => setShowProjectMembersModal(false))
      .then(() => setCurrentProjectId(null));
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='flex flex-col gap-4 flex-1'>
        <TeamMembersField />

        <div className='flex justify-end gap-2'>
          {isDesktop && (
            <Button
              type='button'
              variant='outline'
              onClick={() => setShowProjectMembersModal(false)}
            >
              Отмена
            </Button>
          )}

          <Button
            type='submit'
            className={cn('mt-auto', {
              'w-36': isDesktop,
              'w-full': isMobile,
            })}
            disabled={!form.formState.isDirty || isPending}
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
