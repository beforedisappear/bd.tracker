'use client';

import { Moon, Sun } from 'lucide-react';

import { DropdownMenu } from '@/shared/ui/c';

import { useTheme } from 'next-themes';

export function SwitchTheme() {
  const { setTheme } = useTheme();

  const triggerLabel = (
    <>
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon
        className='h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all absolute 
        dark:rotate-0 dark:scale-100'
      />
      <span className='sr-only'>Переключить тему</span>
    </>
  );

  return (
    <DropdownMenu
      align='end'
      trigger={{ type: 'button', label: triggerLabel, props: { size: 'icon' } }}
      options={[
        { type: 'item', label: 'Светлая', onSelect: () => setTheme('light') },
        { type: 'item', label: 'Темная', onSelect: () => setTheme('dark') },
        {
          type: 'item',
          label: 'Системная',
          onSelect: () => setTheme('system'),
        },
      ]}
    />
  );
}
