import {
  AuthByEmail,
  AUTH_FORM_TITLE,
  AUTH_FORM_DESC,
} from '@/features/AuthByEmail';
import { Card } from '@/shared/ui/s';

interface Props {}

export function LoginPage({}: Props) {
  return (
    <div className='container flex flex-grow items-center'>
      <Card
        title={AUTH_FORM_TITLE}
        description={AUTH_FORM_DESC}
        className='m-auto h-auto w-full max-w-[25rem]'
        titleClassName='text-center'
        descClassName='text-center whitespace-pre-line'
        contentClassName='flex flex-grow'
      >
        <AuthByEmail />
      </Card>
    </div>
  );
}
