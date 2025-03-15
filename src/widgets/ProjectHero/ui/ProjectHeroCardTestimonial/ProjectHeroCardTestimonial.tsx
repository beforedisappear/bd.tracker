import { Avatar, Card } from '@/shared/ui/s';

interface Props {}

export function ProjectHeroCardTestimonial({}: Props) {
  const avatar = <Avatar alt='' src='https://github.com/shadcn.png' />;

  return (
    <Card
      title='John Doe React'
      titleClassName='text-lg order-2 col-start-2 row-start-1'
      description='@john_doe'
      descClassName='order-3 col-start-2 row-start-1 self-end'
      className='absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10
      md:static md:w-full'
      headerClassName='grid grid-cols-[auto_1fr] gap-4'
      headerContent={avatar}
    >
      This landing page is awesome!
    </Card>
  );
}
