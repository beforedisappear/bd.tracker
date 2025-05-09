import { MailCheck } from 'lucide-react';

export const ChangeEmailSuccess = () => {
  return (
    <div className='flex flex-col items-center gap-2 p-6'>
      <MailCheck className='h-16 w-16 text-pink-500' />
      <span className='font-medium text-base text-center'>
        Проверьте указанную почту, мы написали вам туда
      </span>

      <span className='text-sm text-zinc-400 text-center mt-4'>
        Перейдите по ссылке в письме для подтверждения смены почты. В случае
        отсутствия письма, проверьте папку спам.
      </span>
    </div>
  );
};
