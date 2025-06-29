import { Avatar, CommentCard } from '@/shared/ui/s';

interface Props {}

export function ProjectHeroCardTestimonial({}: Props) {
  return (
    <CommentCard
      title='John Doe React'
      description='@john_doe'
      avatar={<Avatar alt='' src='https://github.com/shadcn.png' />}
      className='absolute -top-[15px]
      w-[320px]
      sm:static 
      md:static 
      md:w-full'
    >
      This landing page is awesome!
    </CommentCard>
  );
}
