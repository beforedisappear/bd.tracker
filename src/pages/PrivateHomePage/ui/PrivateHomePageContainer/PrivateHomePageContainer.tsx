import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export function PrivateHomePageContainer({ children }: Props) {
  return (
    <div className='container flex flex-col gap-y-4 justify-center items-center flex-grow w-full'>
      {children}
    </div>
  );
}
