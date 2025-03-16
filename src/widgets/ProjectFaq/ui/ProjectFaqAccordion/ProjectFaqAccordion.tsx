'use client';

import { Accordion } from '@/shared/ui/c';
import { faqList } from './ProjectFaqAccordion.data';

interface Props {}

export function ProjectFaqAccordion({}: Props) {
  return (
    <Accordion
      type='multiple'
      items={faqList}
      className='w-full AccordionRoot'
    />
  );
}
