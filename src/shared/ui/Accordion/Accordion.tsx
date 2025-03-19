'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';

import type { AccordionProps } from './Accordion.types';

const AccordionContainer = AccordionPrimitive.Root;

export function Accordion(props: AccordionProps) {
  const {
    type = 'single',
    collapsible = true,
    items,
    value,
    defaultValue,
    onValueChange,
    triggerClassName,
    contentClassName,
    ...restProps
  } = props;

  const singleProps = {
    type: 'single' as const,
    value: typeof value === 'string' ? value : undefined,
    defaultValue: typeof defaultValue === 'string' ? defaultValue : undefined,
    onValueChange: onValueChange as ((value: string) => void) | undefined,
    collapsible,
  };

  const multipleProps = {
    type: 'multiple' as const,
    value: Array.isArray(value) ? value : undefined,
    defaultValue: Array.isArray(defaultValue) ? defaultValue : undefined,
    onValueChange: onValueChange as ((value: string[]) => void) | undefined,
  };

  return (
    <AccordionContainer
      {...(type === 'single'
        ? singleProps
        : type === 'multiple'
          ? multipleProps
          : { type: 'single' })}
      {...restProps}
    >
      {items.map(el => (
        <AccordionItem key={el.value} value={el.value}>
          <AccordionTrigger className={triggerClassName}>
            {el.trigger}
          </AccordionTrigger>
          <AccordionContent className={contentClassName}>
            {el.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
}
