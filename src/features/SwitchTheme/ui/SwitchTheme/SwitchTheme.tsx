'use client';

import { Moon, Sun, Monitor } from 'lucide-react';

import { Button, DropdownMenu, type DropDownMenuOptions } from '@/shared/ui/c';

import { useTheme } from 'next-themes';

export function SwitchTheme() {
  const { setTheme } = useTheme();

  const trigger = (
    <Button variant='outline' size='icon'>
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon
        className='h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all absolute 
        dark:rotate-0 dark:scale-100'
      />
      <span className='sr-only'>Переключить тему</span>
    </Button>
  );

  const options: DropDownMenuOptions = [
    {
      type: 'item',
      label: { text: 'Светлая', icon: <Sun /> },
      onSelect: () => setTheme('light'),
    },
    {
      type: 'item',
      label: { text: 'Темная', icon: <Moon /> },
      onSelect: () => setTheme('dark'),
    },
    {
      type: 'item',
      label: { text: 'Системная', icon: <Monitor /> },
      onSelect: () => setTheme('system'),
    },
  ];

  return (
    <DropdownMenu
      trigger={trigger}
      options={options}
      contentProps={{ align: 'end' }}
    />
  );
}
