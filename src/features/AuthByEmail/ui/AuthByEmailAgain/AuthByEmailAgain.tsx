import { Button } from '@/shared/ui/c';

import { useEffect, useState } from 'react';

interface Props {
  onSendAgain: () => void;
}

const TIMER_VALUE = 120;

export function AuthByEmailAgain(props: Props) {
  const { onSendAgain } = props;

  const [timer, setTimer] = useState(TIMER_VALUE);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (timer === 0) return;

      setTimer(timer => timer - 1);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [timer]);

  return (
    <Button
      type='button'
      variant={null}
      className='w-fit'
      data-testid='auth-by-email-again-button'
      onClick={() => {
        onSendAgain();
        setTimer(TIMER_VALUE);
      }}
      disabled={timer !== 0}
    >
      <span>{`Отправить повторно${timer !== 0 ? ` через ${timer}` : ''}`}</span>
    </Button>
  );
}
