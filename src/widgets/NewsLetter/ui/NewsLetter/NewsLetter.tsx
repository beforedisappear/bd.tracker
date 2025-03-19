import { ReceiveNews } from '@/features/ReceiveNews';

interface Props {}

export function NewsLetter({}: Props) {
  return (
    <section id='newsletter'>
      <hr className='w-11/12 mx-auto' />

      <div
        className='container py-20 space-y-4      
        xl:py-16
        lg:py-10'
      >
        <h3
          className='text-center text-4xl font-bold
          md:text-3xl'
        >
          Join Our Daily{' '}
          <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
            Newsletter
          </span>
        </h3>

        <p
          className='text-lg text-muted-foreground text-center
          md:text-base'
        >
          Lorem ipsum dolor sit amet consectetur.
        </p>

        <ReceiveNews />
      </div>

      <hr className='w-11/12 mx-auto' />
    </section>
  );
}
