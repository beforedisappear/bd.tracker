'use client';

import { Button, Form, Input } from '@/shared/ui/c';
import { Avatar } from '@/shared/ui/s';

import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userQueries } from '../../api/queries';

import { cn, getColorByFirstLetter } from '@/shared/lib/css';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { getInitials } from '@/shared/lib/data';

import {
  ERROR_MESSAGE,
  SENDING_DATA_MESSAGE,
  SUCCESSFUL_SENDING_MESSAGE,
} from '@/shared/constants/toast.constants';

import { UserFormSchema } from '../../model/schemes/UserFormSchema';
import type { UserFormValues } from '../../model/types';

interface Props {
  user: UserFormValues;
  className?: string;
}

export function UserForm(props: Props) {
  const { user, className } = props;

  const form = useForm<UserFormValues>({
    defaultValues: { name: user.name },
    resolver: zodResolver(UserFormSchema),
  });

  const { mutateAsync: updateUser } = useMutation(userQueries.updateUser());

  const onSubmit = form.handleSubmit(data => {
    const toastId = toast.loading(SENDING_DATA_MESSAGE);

    updateUser(data)
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE, { id: toastId }))
      .catch(() => toast.error(ERROR_MESSAGE, { id: toastId }));
  });

  const color = useMemo(() => getColorByFirstLetter(user.name), [user]);
  const initials = useMemo(() => getInitials(user.name), [user]);

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className={cn('flex flex-col gap-4', className)}
      >
        <Avatar
          src={''}
          alt='avatar'
          height={100}
          width={100}
          fallback={initials}
          className='grid place-items-center w-20 h-20 text-4xl font-semibold'
          style={{ backgroundColor: color }}
        />

        <Input name='name' placeholder='Отображаемое имя' />

        <Button type='submit'>Сохранить</Button>
      </form>
    </Form>
  );
}
