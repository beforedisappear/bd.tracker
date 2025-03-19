import { Avatar, CommentCard } from '@/shared/ui/s';

import { testimonialList } from './ProjectTestimonials.data';

export const ProjectTestimonials = () => {
  return (
    <section
      id='testimonials'
      className='container py-20 space-y-4       
      xl:py-16
      lg:py-10'
    >
      <h2
        className='text-3xl font-bold
        md:text-2xl'
      >
        Discover Why
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
          {' '}
          People Love{' '}
        </span>
        This Landing Page
      </h2>

      <p className='text-base text-muted-foreground'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error
        facere hic reiciendis illo
      </p>

      <div
        className='grid grid-cols-4 gap-5 md:grid-cols-2 mx-auto
        xl:grid-cols-3
        lg:grid-cols-2
        sm:grid-cols-1'
      >
        {testimonialList.map(({ image, name, userName, comment }) => {
          const avatar = <Avatar src={image} alt={userName} />;

          return (
            <CommentCard
              key={userName}
              avatar={avatar}
              title={name}
              description={userName}
              className='w-full'
            >
              {comment}
            </CommentCard>
          );
        })}
      </div>
    </section>
  );
};
