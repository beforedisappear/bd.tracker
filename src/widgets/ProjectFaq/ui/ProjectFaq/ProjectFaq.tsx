import Link from 'next/link';
import { ProjectFaqAccordion } from '../ProjectFaqAccordion';
interface Props {}

export function ProjectFaq({}: Props) {
  return (
    <section id='faq' className='container py-24 sm:py-32'>
      <h2 className='text-3xl md:text-4xl font-bold mb-4'>
        Frequently Asked{' '}
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
          Questions
        </span>
      </h2>

      <ProjectFaqAccordion />

      <h3 className='font-medium mt-4'>
        Still have questions?{' '}
        <Link
          rel='noreferrer noopener'
          href='#'
          className='text-primary transition-all border-primary hover:border-b-2'
        >
          Contact us
        </Link>
      </h3>
    </section>
  );
}
