import { Select, Form } from '@/shared/ui/c';
import { Skeleton } from '@/shared/ui/s';

import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

import { teamQueries } from '@/entities/Team';
import { selectAdapter } from '@/shared/lib/input';
import { getTeamRoutePath } from '@/shared/config/routes';

interface Props {}

export function SelectTeamQuick({}: Props) {
  const { push } = useRouter();
  const { tenant } = useParams<{ tenant: string }>()!;

  const {
    data: userTeamList,
    isLoading,
    isError,
  } = useQuery(teamQueries.getUserTeamList());

  const form = useForm<{}>({
    defaultValues: { team: tenant },
  });

  if (isLoading)
    return <Skeleton className='h-9 group-data-[collapsible=icon]:hidden' />;
  else if (isError || !userTeamList) return <></>;

  const onSubmit = form.handleSubmit(data => {
    console.log(data);
  });

  const options = selectAdapter(userTeamList, {
    labelKey: 'name',
    valueKey: 'slug',
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
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
