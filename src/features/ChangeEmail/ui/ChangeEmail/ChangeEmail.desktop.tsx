import { Dialog } from '@/shared/ui/c';
import { ChangeEmailForm } from '../ChangeEmailForm';
import { ChangeEmailTrigger } from '../ChangeEmailTrigger/ChangeEmailTrigger';

import { CHANGE_EMAIL_TITLE } from '../../constants';

interface Props {
  email: string;
}

export const ChangeEmailDesktop = ({ email }: Props) => {
  return (
    <Dialog
      title={CHANGE_EMAIL_TITLE}
      trigger={<ChangeEmailTrigger />}
      className='w-full max-w-md h-[350px]'
    >
      <ChangeEmailForm email={email} />
    </Dialog>
  );
};
