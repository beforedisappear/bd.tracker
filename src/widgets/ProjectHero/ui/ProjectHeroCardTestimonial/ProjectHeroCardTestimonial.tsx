import { Avatar, CommentCard } from '@/shared/ui/s';

interface Props {}

export function ProjectHeroCardTestimonial({}: Props) {
  const avatar = <Avatar alt='' src='https://github.com/shadcn.png' />;

  return (
    <CommentCard
      title='John Doe React'
      description='@john_doe'
      avatar={avatar}
      className='absolute w-[320px] -top-[15px]
      sm:static md:static md:w-full'
    >
      This landing page is awesome!
    </CommentCard>
  );
}
