import { BasicDeleteForm } from '@/shared/ui/c';

import { useMutation } from '@tanstack/react-query';
import { useTenant } from '@/shared/lib/navigation/useTenant';

import { projectQueries } from '@/entities/Project';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';

import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

interface Props {
  projectId: string | null;
  onClose: () => void;
}

export function DeleteProjectForm(props: Props) {
  const { onClose, projectId } = props;

  const tenant = useTenant();

  const { mutateAsync: deleteProject, isPending } = useMutation(
    projectQueries.deleteProject(),
  );

  const onDeleteProject = () => {
    if (!projectId) return;

    deleteProject({ projectId, teamIdOrSlug: tenant })
      .then(() => onClose())
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .catch(e => toast.error(getErrorMessage(e)));
  };

  return (
    <BasicDeleteForm
      onClose={onClose}
      onDelete={onDeleteProject}
      isPending={isPending}
    />
  );
}
