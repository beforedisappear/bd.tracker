import { Dialog } from '@/shared/ui/c';

import { DeleteProjectContent } from '../DeleteProjectContent/DeleteProjectContent';
import { useState } from 'react';

interface Props {
  onConfirm: () => void;
}

// TODO: add mobile version

export function DeleteProject(props: Props) {
  const { onConfirm } = props;

  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);

  const onCloseModal = () => {
    setShowDeleteProjectModal(false);
  };

  return (
    <Dialog
      title='Удалить проект?'
      open={showDeleteProjectModal}
      onOpenChange={setShowDeleteProjectModal}
    >
      <DeleteProjectContent onClose={onCloseModal} onConfirm={onConfirm} />
    </Dialog>
  );
}
