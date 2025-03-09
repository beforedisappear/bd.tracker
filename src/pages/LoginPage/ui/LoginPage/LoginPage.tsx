import {
  AuthByEmail,
  AUTH_FORM_TITLE,
  AUTH_FORM_DESC,
} from '@/features/AuthByEmail';
import { Card } from '@/shared/ui/s';

interface Props {}

export function LoginPage({}: Props) {
  return (
    <>
      <Card
        title={AUTH_FORM_TITLE}
        description={AUTH_FORM_DESC}
        className='m-auto min-h-[17rem] h-auto w-full max-w-[25rem]'
        titleClassName='text-center'
        descClassName='text-center whitespace-pre-line'
        contentClassName='flex flex-grow'
      >
        <AuthByEmail />
      </Card>
    </>
  );
}
