import { Loader2 } from 'lucide-react';

import { Button, Input, Form } from '@/shared/ui/c';
import { ChangeEmailSuccess } from '../ChangeEmailSuccess/ChangeEmailSuccess';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userQueries } from '@/entities/User';

import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage } from '@/shared/lib/error/getErrorMessage';

import { ChangeEmailSchema } from '../../model/schemes';

interface Props {
  email: string;
}

export const ChangeEmailForm = ({ email }: Props) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const form = useForm({
    resolver: zodResolver(ChangeEmailSchema),
  });

  const { mutateAsync: changeEmail, isPending } = useMutation({
    ...userQueries.changeEmail(),
  });

  const onSubmit = form.handleSubmit(data => {
    changeEmail({ email: data.email })
      .then(() => setShowSuccessMessage(true))
      .catch(e => form.setError('email', { message: getErrorMessage(e) }));
  });

  if (showSuccessMessage) return <ChangeEmailSuccess />;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='flex flex-col gap-6 p-6 flex-grow'>
        <span className='text-base ov text-zinc-800 dark:text-zinc-300'>
          Ваш текущий e-mail: <b>{email}</b>
        </span>

        <Input
          name='email'
          placeholder='E-mail'
          label='Новый e-mail'
          autoComplete='off'
          disabled={isPending}
        />

        <Button type='submit' className='mx-auto min-w-56 mt-auto'>
          {isPending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <span>Сменить e-mail</span>
          )}
        </Button>
      </form>
    </Form>
  );
};
