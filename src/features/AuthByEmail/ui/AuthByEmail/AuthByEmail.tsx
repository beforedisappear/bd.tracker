'use client';

import { Button, Input, InputOTP, Form } from '@/shared/ui/c';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getErrorMessage } from '@/shared/lib/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { queries } from '../../api';
import { getProfileRoute } from '@/shared/config/routes';
import { saveJwt } from '@/shared/lib/cookies';

import {
  AuthFormFirstStepSchema,
  AuthFormSecondStepSchema,
  type AuthFormValues,
} from '../../model/schemes';

import type { AnyZodObject } from 'zod';

type FormStep = '1' | '2';

interface Props {}

export function AuthByEmail({}: Props) {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>('1');

  const schema: { [Key in FormStep]: AnyZodObject } = {
    '1': AuthFormFirstStepSchema,
    '2': AuthFormSecondStepSchema,
  };

  const methods = useForm<AuthFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema[currentStep]),
  });

  const { mutateAsync: onAuth, isPending: isAuthing } = useMutation(
    queries.auth(),
  );
  const {
    mutateAsync: onLogin,
    isPending: isLogging,
    isSuccess: isLoggedIn,
  } = useMutation(queries.login());

  const onSubmit = methods.handleSubmit(data => {
    //first step
    if ('email' in data) {
      onAuth(data)
        .then(() => setCurrentStep('2'))
        .catch(e => {
          methods.setError('email', { message: getErrorMessage(e) });
        });
    }
    //second step
    else {
      const email = methods.getValues('email');

      onLogin({ ...data, email })
        .then(res => {
          saveJwt(res.data.accessToken, res.data.refreshToken);
          push(getProfileRoute());
        })
        .catch(e => {
          methods.setError('code', { message: getErrorMessage(e) });
        });
    }
  });

  return (
    <Form {...methods}>
      <form
        className='container flex flex-col flex-grow items-center max-w-80'
        onSubmit={onSubmit}
      >
        {currentStep === '1' && (
          <Input
            name='email'
            label='Адрес электронной почты'
            disabled={isAuthing}
            className='w-full'
          />
        )}

        {currentStep === '2' && (
          <InputOTP
            name='code'
            length={6}
            groupSize={3}
            label='Код подтверждения'
            disabled={isLogging || isLoggedIn}
          />
        )}

        <Button
          type='submit'
          className='mt-auto w-full'
          disabled={isAuthing || isLogging || isLoggedIn}
        >
          Отправить
        </Button>
      </form>
    </Form>
  );
}
