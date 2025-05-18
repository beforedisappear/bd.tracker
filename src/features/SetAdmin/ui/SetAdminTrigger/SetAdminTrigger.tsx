import { Button, type ButtonProps } from '@/shared/ui/c';

interface Props extends ButtonProps {
  isAdmin?: boolean;
}

export function SetAdminTrigger(props: Props) {
  const { isAdmin, ...restProps } = props;

  return (
    <Button
      {...restProps}
      variant={null}
      className='text-sm w-fit font-normal p-0 h-5 text-blue-500'
    >
      {isAdmin ? 'Убрать из админов' : 'Назначить администратором'}
    </Button>
  );
}
