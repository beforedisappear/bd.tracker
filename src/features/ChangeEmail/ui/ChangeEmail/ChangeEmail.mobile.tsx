import { Drawer } from '@/shared/ui/c';
import { ChangeEmailForm } from '../ChangeEmailForm';
import { ChangeEmailTrigger } from '../ChangeEmailTrigger/ChangeEmailTrigger';

import { CHANGE_EMAIL_TITLE } from '../../constants';

interface Props {
  email: string;
}

export const ChangeEmailMobile = ({ email }: Props) => {
  return (
    <Drawer
      title={CHANGE_EMAIL_TITLE}
      titleClassName='text-center'
      trigger={<ChangeEmailTrigger />}
      className='h-[420px]'
    >
      <ChangeEmailForm email={email} />
    </Drawer>
  );
};
