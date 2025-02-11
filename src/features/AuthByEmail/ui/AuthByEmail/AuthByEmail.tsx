'use client';

import { Button, Input } from '@/shared/ui';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/shared/ui/Form';

interface Props {}

const FormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .min(1, 'Please enter an email address.')
    .email(),
});

export function AuthByEmail({}: Props) {
  const methods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = methods.handleSubmit(data => {
    console.log('data', data);
  });

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>
        <Input name='email' fieldLabel='Email' />

        <Button type='submit'>Отправить</Button>
      </form>
    </Form>
  );
}
