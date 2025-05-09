import { Button, ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {}

export function CreateTeamTrigger(props: Props) {
  return (
    <Button
      type='button'
      variant={null}
      className='mx-auto mt-2 w-fit'
      data-testid='create-team-button'
      {...props}
    >
      Создать команду
    </Button>
  );
}
