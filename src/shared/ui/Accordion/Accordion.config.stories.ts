import {
  TEST_TITLE,
  TEST_DESCRIPTION,
} from '@/shared/constants/test.constants';
import type { IAccordionItem } from './Accordion.types';

export const accordionDataList: IAccordionItem[] = new Array(5)
  .fill('_')
  .map((_, i) => ({
    trigger: TEST_TITLE,
    content: TEST_DESCRIPTION,
    value: `item-${i + 1}`,
  }));

export default { tags: ['hidden'] };
