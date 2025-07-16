import { SidebarTrigger } from '@/shared/ui/c';
import { SwitchTheme } from '@/features/SwitchTheme';

import { useDeviceType } from '@/shared/lib/deviceType/c';

import { cn } from '@/shared/lib/css';

interface Props {
  children: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export function PrivateHeaderLayout({ children, bottomContent }: Props) {
  const { isMobile } = useDeviceType();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex flex-col gap-2 min-h-14 h-auto px-4 py-3 bg-sidebar-background md:static md:min-h-12',
        { 'pb-0': !!bottomContent },
      )}
    >
      <div className='flex items-center justify-between'>
        {isMobile && <SidebarTrigger />}

        {children}

        <SwitchTheme />
      </div>

      {bottomContent}
    </header>
  );
}
