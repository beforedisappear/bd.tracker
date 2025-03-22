'use client';

import { Button, Input } from '@/shared/ui/c';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ReceiveNewsFormSchema,
  type ReceiveNewsFormValues,
} from '../../model/schemes';

interface Props {}

export function ReceiveNews({}: Props) {
  const methods = useForm<ReceiveNewsFormValues>({
    resolver: zodResolver(ReceiveNewsFormSchema),
  });

  const onSubmit = methods.handleSubmit(data => {
    console.log('data', data);
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className='flex flex-row w-4/12 mx-auto gap-4
        lg:w-6/12 
        md:gap-2 md:flex-col md:w-full'
      >
        <Input
          name='email'
          placeholder='roman23k@gmail.com'
          autoComplete='off'
          className='w-full'
          aria-label='email'
        />
        <Button>Subscribe</Button>
      </form>
    </FormProvider>
  );
}
