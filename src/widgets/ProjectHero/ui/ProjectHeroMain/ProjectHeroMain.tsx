import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { cn } from '@/shared/lib/css';

import { buttonVariants } from '@/shared/ui/s';
import Link from 'next/link';

import { getLoginRoute } from '@/shared/config/routes';
import { GITHUB_REPO_URL } from '@/shared/constants';
import {
  HIGHLIGHTED_PART_SUBTITLE,
  HIGHLIGHTED_PART_TITLE,
  SIMPLE_PART_SUBTITLE,
  SIMPLE_PART_TITLE,
  TITLE_UNION,
} from './ProjectHeroMain.data';

interface Props {}

export function ProjectHeroMain({}: Props) {
  return (
    <div
      className='text-start space-y-6 
      xl:max-w-[700px]
      lg:text-center'
    >
      <div
        className='text-6xl font-bold
        xl:text-center
        md:text-5xl'
      >
        <h1 className='inline'>
          <span className='inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text'>
            {HIGHLIGHTED_PART_TITLE}
          </span>{' '}
          {SIMPLE_PART_TITLE}
        </h1>{' '}
        {TITLE_UNION}{' '}
        <h2 className='inline'>
          <span className='inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text'>
            {HIGHLIGHTED_PART_SUBTITLE}
          </span>{' '}
          {SIMPLE_PART_SUBTITLE}
        </h2>
      </div>

      <p
        className='text-xl text-muted-foreground mx-0 w-10/12
        xl:mx-auto 
        md:w-full'
      >
        Управляй проектом, отслеживай задачи.
      </p>

      <div
        className='flex space-y-0 space-x-4
        xl:justify-center
        md:flex-col md:space-x-0 md:gap-y-3'
      >
        <Link
          href={getLoginRoute()}
          className={cn(buttonVariants(), 'w-1/3 md:w-full')}
        >
          Начать
        </Link>

        <Link
          rel='noreferrer noopener'
          href={GITHUB_REPO_URL}
          target='_blank'
          className={`w-1/3 md:w-full ${buttonVariants({
            variant: 'outline',
          })}`}
        >
          <span>Смотреть на Github</span>
          <GitHubLogoIcon className='ml-2 w-5 h-5' />
        </Link>
      </div>
    </div>
  );
}
