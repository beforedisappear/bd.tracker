import { TeamMembersField, type TeamMember } from '@/entities/Team';
import { Form } from '@/shared/ui/Form';
import { useForm } from 'react-hook-form';

interface Props {
  data: TeamMember[];
}

export function ManageProjectMembersForm({ data }: Props) {
  console.log(data);

  const form = useForm();

  return (
    <Form {...form}>
      <TeamMembersField />
    </Form>
  );
}
