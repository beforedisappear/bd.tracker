'use client';

import { Button, Input, InputOTP, Form } from '@/shared/ui/c';
import { AuthByEmailAgain } from '../AuthByEmailAgain/AuthByEmailAgain';

import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getErrorMessage } from '@/shared/lib/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { authQueries } from '../../api';
import { getHomeRoutePath } from '@/shared/config/routes';
import { saveJwt } from '@/shared/lib/cookies';

import { AuthFirstStepSchema, AuthSecondStepSchema } from '../../model/schemes';

import type { AuthFormValues } from '../../model/types';
import type { AnyZodObject } from 'zod';

type FormStep = '1' | '2';

interface Props {}

export function AuthByEmail({}: Props) {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>('1');

  const schema: { [Key in FormStep]: AnyZodObject } = {
    '1': AuthFirstStepSchema,
    '2': AuthSecondStepSchema,
  };

  const methods = useForm<AuthFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema[currentStep]),
  });

  const { mutateAsync: onAuth, isPending: isAuthing } = useMutation(
    authQueries.auth(),
  );

  const {
    mutateAsync: onLogin,
    isPending: isLogging,
    isSuccess: isLoggedIn,
  } = useMutation(authQueries.login());

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
        .then(({ data }) => saveJwt(data.accessToken, data.refreshToken))
        .then(() => push(getHomeRoutePath()))
        .catch(e => {
          methods.setError('code', { message: getErrorMessage(e) });
        });
    }
  });

  const onSendAgain = useCallback(() => {
    const email = methods.getValues('email');
    onAuth({ email });
  }, [methods, onAuth]);

  return (
    <Form {...methods}>
      <form
        className='container flex flex-col flex-grow items-center max-w-80 h-48'
        onSubmit={onSubmit}
      >
        {currentStep === '1' && (
          <Input
            name='email'
            label='Адрес электронной почты'
            disabled={isAuthing}
            className='w-full'
            data-testid='auth-by-email-email-input'
            errorMessageTestId='auth-by-email-first-step-error-message'
          />
        )}

        {currentStep === '2' && (
          <InputOTP
            type='tel'
            name='code'
            length={6}
            groupSize={3}
            label='Код подтверждения'
            disabled={isLogging || isLoggedIn}
            className='text-md'
            onChange={v => v.length === 6 && onSubmit()}
            data-testid='auth-by-email-code-input'
            errorMessageTestId='auth-by-email-second-step-error-message'
          />
        )}

        <div className='flex flex-col items-center gap-y-2 w-full mt-auto'>
          <Button
            type='submit'
            className='w-full'
            disabled={isAuthing || isLogging || isLoggedIn}
            data-testid='auth-by-email-submit-button'
          >
            Отправить
          </Button>

          {currentStep === '2' && (
            <AuthByEmailAgain onSendAgain={onSendAgain} />
          )}
        </div>
      </form>
    </Form>
  );
}
