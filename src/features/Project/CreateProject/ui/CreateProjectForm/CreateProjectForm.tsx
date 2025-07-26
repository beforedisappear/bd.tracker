import { Button, Form, Input } from '@/shared/ui/c';
import { TeamMembersField } from '@/entities/Team';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation';

import { z } from 'zod';
import { projectQueries } from '@/entities/Project';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/css';

import {
  SENDING_DATA_MESSAGE,
  SUCCESSFUL_SENDING_MESSAGE,
} from '@/shared/constants';

import { CreateProjectSchema } from '../../model/schemes';
interface Props {
  onClose: () => void;
  className?: string;
}

export function CreateProjectForm(props: Props) {
  const { onClose, className } = props;

  const tenant = useTenant();
  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
  });

  const { mutateAsync: createProject } = useMutation(
    projectQueries.createProject(),
  );

  const onSubmit = form.handleSubmit(data => {
    const dto = {
      ...data,
      teamIdOrSlug: tenant,
      membersIds: Object.keys(data.membersIds).filter(
        key => data.membersIds[key],
      ),
    };

    const toastId = toast.loading(SENDING_DATA_MESSAGE);

    createProject(dto)
      .then(() => onClose())
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE, { id: toastId }))
      .catch(e => toast.error(getErrorMessage(e), { id: toastId }));
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className={cn('flex flex-col h-full gap-6', className)}
      >
        <Input
          name='name'
          label='Название проекта'
          placeholder='Название проекта'
        />

        <TeamMembersField label='Участники Проекта' />

        <div className='flex justify-end gap-2 mt-auto'>
          <Button type='submit' className='mobile:w-full'>
            Создать
          </Button>
        </div>
      </form>
    </Form>
  );
}
