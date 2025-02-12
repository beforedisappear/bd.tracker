'use client';

import { Button, Input, InputOTP, Form } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  AuthFormFirstStepSchema,
  AuthFormSecondStepSchema,
  type AuthFormValues,
} from '../../model/schemes';

import type { AnyZodObject } from 'zod';

type FormStep = '1' | '2';

interface Props {}

export function AuthByEmail({}: Props) {
  const [currentStep, setCurrentStep] = useState<FormStep>('1');

  const schema: { [Key in FormStep]: AnyZodObject } = {
    '1': AuthFormFirstStepSchema,
    '2': AuthFormSecondStepSchema,
  };

  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(schema[currentStep]),
  });

  const onSubmit = methods.handleSubmit(data => {
    console.log('data', data);

    if ('email' in data) {
      setCurrentStep('2');
    } else {
      //smth
    }
  });

  return (
    <Form {...methods}>
      <form className='container max-w-80 m-auto' onSubmit={onSubmit}>
        {currentStep === '1' && (
          <Input name='email' fieldLabel='Адрес электронной почты' />
        )}

        {currentStep === '2' && (
          <InputOTP
            name='code'
            length={6}
            groupSize={3}
            fieldLabel='Код подтверждения'
          />
        )}

        <Button type='submit'>Отправить</Button>
      </form>
    </Form>
  );
}
