'use client';

import { Drawer } from '@/shared/ui/c';
import { DeleteTeamForm } from '../DeleteTeamForm';
import { DeleteTeamTrigger } from '../DeleteTeamTrigger/DeleteTeamTrigger';
import { DELETE_TEAM_DESCRIPTION, DELETE_TEAM_TITLE } from '../../constants';
import { useTeamStore } from '@/entities/Team';

interface Props {
  hideTrigger?: boolean;
}

export function DeleteTeamMobile(props: Props) {
  const { hideTrigger } = props;

  const setShowDeleteTeamModal = useTeamStore(
    state => state.setShowDeleteTeamModal,
  );
  const showDeleteTeamModal = useTeamStore(state => state.showDeleteTeamModal);

  const onCloseModal = () => {
    setShowDeleteTeamModal(false);
  };

  return (
    <Drawer
      title={DELETE_TEAM_TITLE}
      titleClassName='text-center'
      description={DELETE_TEAM_DESCRIPTION}
      descClassName='text-center'
      trigger={hideTrigger ? null : <DeleteTeamTrigger />}
      className='h-[300px]'
      open={showDeleteTeamModal}
      onOpenChange={setShowDeleteTeamModal}
    >
      <DeleteTeamForm onClose={onCloseModal} />
    </Drawer>
  );
}
