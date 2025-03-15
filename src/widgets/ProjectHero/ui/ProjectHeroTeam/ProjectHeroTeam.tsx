import { buttonVariants, Card } from '@/shared/ui/s';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {}

export function ProjectHeroTeam({}: Props) {
  const headerContent = (
    <Image
      src='https://i.pravatar.cc/150?img=58'
      alt='user avatar'
      className='absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover'
      width={24}
      height={24}
    />
  );

  const footerContent = (
    <div>
      <Link
        href='/'
        rel='noreferrer noopener'
        target='_blank'
        className={buttonVariants({
          variant: 'ghost',
          size: 'sm',
        })}
      >
        <span className='sr-only'>Github icon</span>
        <Star className='w-5 h-5' />
      </Link>

      <Link
        href='/'
        rel='noreferrer noopener'
        target='_blank'
        className={buttonVariants({
          variant: 'ghost',
          size: 'sm',
        })}
      >
        <span className='sr-only'>X icon</span>
        <svg
          role='img'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          className='fill-foreground w-5 h-5'
        >
          <title>X</title>
          <path d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' />
        </svg>
      </Link>

      <Link
        rel='noreferrer noopener'
        href='https://www.linkedin.com/in/leopoldo-miranda/'
        target='_blank'
        className={buttonVariants({
          variant: 'ghost',
          size: 'sm',
        })}
      >
        <span className='sr-only'>Linkedin icon</span>
        <Star size='20' />
      </Link>
    </div>
  );

  return (
    <Card
      className='absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10
      md:static md:w-full md:mt-8'
      headerClassName='mt-8 flex justify-center items-center pb-2'
      title='Leo Miranda'
      titleClassName='text-center'
      description='Frontend Developer'
      descClassName='font-normal text-primary'
      headerContent={headerContent}
      footerContent={footerContent}
    >
      <p>
        I really enjoy transforming ideas into functional software that exceeds
        expectations
      </p>
    </Card>
  );
}
