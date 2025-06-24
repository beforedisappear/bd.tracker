import Link from 'next/link';
import { ProjectFaqAccordion } from '../ProjectFaqAccordion';

import { TELEGRAM_CONTACT_URL } from '@/shared/constants';

interface Props {}

export function ProjectFaq({}: Props) {
  return (
    <section
      id='faq'
      className='container py-20 space-y-4  scroll-m-6
      xl:py-16
      lg:py-10'
    >
      <h2
        className='text-3xl font-bold mb-4
        md:text-2xl'
      >
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
          href={TELEGRAM_CONTACT_URL}
          className='text-primary transition-all border-primary hover:border-b-2'
        >
          Contact us
        </Link>
      </h3>
    </section>
  );
}
