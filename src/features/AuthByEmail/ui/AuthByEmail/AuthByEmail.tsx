'use client';

import { Button } from '@/shared/ui';
import { Select } from '@/shared/ui/Select';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {}

export function AuthByEmail({}: Props) {
  const methods = useForm();

  const onSubmit = methods.handleSubmit(data => {
    console.log('data', data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Select name='selct' options={[{ value: '1', name: '1' }]} />

        <Button type='submit'>Отправить</Button>
      </form>
    </FormProvider>
  );
}
