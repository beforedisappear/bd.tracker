/* eslint-disable react-hooks/exhaustive-deps */
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { type ReactElement, useEffect } from 'react';

interface FormProviderWrapperProps {
  children: React.ReactNode;
  defaultValues?: Record<string, unknown>;
  errorMessage?: string;
}

const FormProviderWrapper = ({
  children,
  defaultValues = {},
  errorMessage = '',
}: FormProviderWrapperProps) => {
  const methods = useForm({ defaultValues });

  useEffect(() => {
    if (errorMessage) {
      methods.setError('error', {
        type: 'required',
        message: errorMessage,
      });
    }
  }, []);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const renderWithFormProvider = (
  ui: ReactElement,
  {
    defaultValues = {},
    errorMessage = '',
    ...renderOptions
  }: Omit<RenderOptions, 'wrapper'> & {
    defaultValues?: Record<string, unknown>;
    errorMessage?: string;
  } = {},
) => {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <FormProviderWrapper
        defaultValues={defaultValues}
        errorMessage={errorMessage}
      >
        {children}
      </FormProviderWrapper>
    ),
    ...renderOptions,
  });
};
