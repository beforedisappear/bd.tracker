import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { addDays } from 'date-fns';

import type { Decorator } from '@storybook/react';

export const FormDecorator: Decorator = StoryComponent => {
  const methods = useForm({
    defaultValues: {
      error: undefined,
      inputValue: 'value 123124',
      inputOtpValue: '1243',
      selectValue: 'value_1',
      switchValue: true,
      dateValue: new Date(),
      dateRangeValue: { from: new Date(), to: addDays(new Date(), 10) },
    },
  });

  useEffect(() => {
    methods.setError('error', {
      type: 'required',
      message: 'This field is required!',
    });
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(data => console.log(data))}
        className={'input_container'}
      >
        <StoryComponent />
      </form>
    </FormProvider>
  );
};
