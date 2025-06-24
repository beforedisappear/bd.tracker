import { Select, Form } from '@/shared/ui/c';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { getTeamRoutePath } from '@/shared/config/routes';

import type { SelectOption } from '@/shared/ui/c';

interface Props {
  options: SelectOption[];
  isFetching: boolean;
  tenant: string;
}

export function SelectTeamQuickForm(props: Props) {
  const { options, tenant } = props;

  const { push } = useRouter();

  const form = useForm<{}>({
    defaultValues: { team: tenant },
  });

  return (
    <Form {...form}>
      <form>
        <Select
          name='team'
          options={options}
          className='group-data-[collapsible=icon]:hidden'
          onValueChange={v => push(getTeamRoutePath(v))}
        />
      </form>
    </Form>
  );
}
