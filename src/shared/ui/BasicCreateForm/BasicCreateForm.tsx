import { Loader2 } from 'lucide-react';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

interface Props {
  isPending: boolean;
  onSubmit: () => void;
  inputPlaceholder: string;
  inputName: string;
}

export function BasicCreateForm(props: Props) {
  const { isPending, onSubmit, inputName, inputPlaceholder } = props;

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-2 h-full'>
      <Input name={inputName} placeholder={inputPlaceholder} />

      <Button type='submit' className='mt-auto' disabled={isPending}>
        {isPending ? (
          <Loader2 className='w-4 h-4 animate-spin' />
        ) : (
          <span>Создать</span>
        )}
      </Button>
    </form>
  );
}
