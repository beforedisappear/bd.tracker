import { BasicCreateForm, Form } from '@/shared/ui/c';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useProject, useTenant } from '@/shared/lib/navigation';
import { useRouter } from 'next/navigation';

import { boardQueries } from '@/entities/Board';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage } from '@/shared/lib/error';
import { getProjectByIdRoutePath } from '@/shared/config/routes';

import { SUCCESSFUL_SENDING_MESSAGE } from '@/shared/constants';

import { z } from 'zod';
import { CreateBoardSchema } from '../../model/schemes';

interface Props {
  onClose?: () => void;
}

export function CreateBoardForm(props: Props) {
  const { onClose } = props;

  const tenant = useTenant();
  const { projectId } = useProject();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: { name: '' },
  });

  const { mutateAsync: createBoard, isPending } = useMutation(
    boardQueries.createBoard(),
  );

  const onSubmit = form.handleSubmit(data => {
    createBoard({ ...data, projectId })
      .then(({ id }) => push(getProjectByIdRoutePath(tenant, projectId, id)))
      .then(() => onClose?.())
      .then(() => toast.success(SUCCESSFUL_SENDING_MESSAGE))
      .catch(e => form.setError('name', { message: getErrorMessage(e) }));
  });

  return (
    <Form {...form}>
      <BasicCreateForm
        inputName='name'
        onSubmit={onSubmit}
        isPending={isPending}
        inputPlaceholder='Введите название доски...'
      />
    </Form>
  );
}
