'use client';

import { Accordion } from '@/shared/ui/c';
import { faqList } from './ProjectFaqAccordion.data';

interface Props {}

export function ProjectFaqAccordion({}: Props) {
  return (
    <Accordion
      items={faqList}
      className='w-full'
      triggerClassName='text-base md:text-sm'
      contentClassName='text-base md:text-sm'
    />
  );
}
