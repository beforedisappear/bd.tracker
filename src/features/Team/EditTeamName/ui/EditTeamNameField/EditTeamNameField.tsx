import { PencilIcon } from 'lucide-react';

import { Button, Form, Input } from '@/shared/ui/c';
import { EditTeamNameLabel } from '../EditTeamNameLabel/EditTeamNameLabel';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTenant } from '@/shared/lib/navigation';
import { useTeamAccess, RenameTeamSchema, teamQueries } from '@/entities/Team';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { getTeamRoutePath } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/error';

interface Props {
  name: string;
}

export function EditTeamNameField({ name }: Props) {
  const { push } = useRouter();
  const tenant = useTenant();

  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: renameTeam } = useMutation(teamQueries.renameTeam());
  const { isEnoughAccess } = useTeamAccess();

  const form = useForm<z.infer<typeof RenameTeamSchema>>({
    resolver: zodResolver(RenameTeamSchema),
    defaultValues: { name },
  });

  const onStartEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      form.setFocus('name');
    }, 100);
  };

  const onEndEditing = () => {
    setIsEditing(false);
    onSubmit();
  };

  const onSubmit = form.handleSubmit(
    data => {
      if (data.name === name) return;

      renameTeam({ idOrSlug: tenant, name: data.name })
        .then(({ data: { slug } }) => push(getTeamRoutePath(slug)))
        .catch(e => {
          toast.error(getErrorMessage(e));
          form.resetField('name');
        });
    },
    errors => {
      toast.error(errors.name?.message);
      form.resetField('name');
    },
  );

  return (
    <Form {...form}>
      <form
        className='flex items-center gap-2 
        mobile:flex-col mobile:items-start'
        onSubmit={onSubmit}
      >
        <EditTeamNameLabel as='h3' label={'Команда'} />

        <div className='flex items-center gap-2 w-full'>
          <Input
            name='name'
            value={name}
            className='flex h-7 w-full'
            inputClassName='text-xl font-bold h-7 p-0 border-none rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none
            md:text-base'
            disabled={!isEditing}
            onBlur={onEndEditing}
            hideErrorMessage={true}
          />

          {isEnoughAccess && (
            <Button
              type='button'
              size='icon'
              variant='ghost'
              className='w-6 h-6 ml-auto'
              onClick={onStartEditing}
            >
              <PencilIcon className='w-4 h-4' />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
