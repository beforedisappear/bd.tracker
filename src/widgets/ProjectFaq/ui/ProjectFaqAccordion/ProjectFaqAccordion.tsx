'use client';

import { Accordion } from '@/shared/ui/c';
import { faqList } from './ProjectFaqAccordion.data';

interface Props {}

export function ProjectFaqAccordion({}: Props) {
  return (
    <Accordion
      type='single'
      items={faqList}
      className='w-full AccordionRoot'
      triggerClassName='text-base md:text-sm'
      contentClassName='text-base md:text-sm'
    />
  );
}
