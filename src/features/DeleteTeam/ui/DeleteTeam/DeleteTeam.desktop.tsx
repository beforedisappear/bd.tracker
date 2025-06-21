'use client';

import { Dialog } from '@/shared/ui/c';
import { DeleteTeamForm } from '../DeleteTeamForm';
import { DeleteTeamTrigger } from '../DeleteTeamTrigger/DeleteTeamTrigger';

import { useTeamStore } from '@/entities/Team';

import { DELETE_TEAM_DESCRIPTION, DELETE_TEAM_TITLE } from '../../constants';
interface Props {
  hideTrigger?: boolean;
}

export function DeleteTeamDesktop(props: Props) {
  const { hideTrigger } = props;

  const setShowDeleteTeamModal = useTeamStore(
    state => state.setShowDeleteTeamModal,
  );
  const showDeleteTeamModal = useTeamStore(state => state.showDeleteTeamModal);

  const onCloseModal = () => {
    setShowDeleteTeamModal(false);
  };

  return (
    <Dialog
      title={DELETE_TEAM_TITLE}
      titleClassName='text-center'
      description={DELETE_TEAM_DESCRIPTION}
      descClassName='text-left'
      trigger={hideTrigger ? null : <DeleteTeamTrigger />}
      className='h-48 max-w-96'
      data-testid='delete-team-dialog'
      onOpenChange={setShowDeleteTeamModal}
      open={showDeleteTeamModal}
    >
      <DeleteTeamForm onClose={onCloseModal} />
    </Dialog>
  );
}
