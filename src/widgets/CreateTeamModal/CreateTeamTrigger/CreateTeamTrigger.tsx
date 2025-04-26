import { Button } from '@/shared/ui/c';

interface Props {}

export function CreateTeamTrigger({}: Props) {
  return (
    <Button variant={null} className='mx-auto w-fit'>
      Создать команду
    </Button>
  );
}
