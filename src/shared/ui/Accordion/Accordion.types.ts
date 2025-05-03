import type {
  AccordionSingleProps,
  AccordionMultipleProps,
} from '@radix-ui/react-accordion';

export interface IAccordionItem {
  trigger: React.ReactNode;
  content: React.ReactNode;
  value: string;
}

interface IBaseProps {
  items: IAccordionItem[];
  triggerClassName?: string;
  contentClassName?: string;
}

interface ISingleProps extends Omit<AccordionSingleProps, 'type'>, IBaseProps {
  type?: 'single';
  collapsible?: boolean;
}

interface IMultipleProps
  extends Omit<AccordionMultipleProps, 'type'>,
    IBaseProps {
  type?: 'multiple';
}

export type AccordionProps = ISingleProps | IMultipleProps;
