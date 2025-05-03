import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

import type { IAccordionItem } from './Accordion.types';

const firstTriggerName = 'Section 1';
const secondTriggerName = 'Section 2';
const firstContentName = 'Content 1';
const secondContentName = 'Content 2';

const mockItems: IAccordionItem[] = [
  {
    trigger: firstTriggerName,
    content: <span>{firstContentName}</span>,
    value: 'item-1',
  },
  {
    trigger: secondTriggerName,
    content: <span>{secondContentName}</span>,
    value: 'item-2',
  },
];

describe('Accordion ui component', () => {
  it('should render all items', () => {
    render(<Accordion items={mockItems} />);

    expect(screen.getByText(firstTriggerName)).toBeInTheDocument();
    expect(screen.getByText(secondTriggerName)).toBeInTheDocument();
    expect(screen.queryByText(firstContentName)).not.toBeInTheDocument();
    expect(screen.queryByText(secondContentName)).not.toBeInTheDocument();
  });

  it('should be open by default', () => {
    render(<Accordion items={mockItems} defaultValue='item-1' />);

    expect(screen.getByText(firstContentName)).toBeVisible();
  });

  it('should not be collapsible', async () => {
    render(<Accordion items={mockItems} collapsible={false} />);

    const trigger = screen.getByText(firstTriggerName);
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    expect(screen.getByText(firstContentName)).toBeVisible();
  });

  it('should show content when trigger is clicked', async () => {
    render(<Accordion items={mockItems} />);

    const trigger = screen.getByText(firstTriggerName);
    await userEvent.click(trigger);

    expect(screen.getByText(firstContentName)).toBeVisible();
  });

  it('should hide content when trigger is clicked again', async () => {
    render(<Accordion items={mockItems} collapsible />);

    const trigger = screen.getByText(firstTriggerName);
    await userEvent.click(trigger);
    expect(screen.getByText(firstContentName)).toBeVisible();

    await userEvent.click(trigger);
    expect(screen.queryByText(firstContentName)).not.toBeInTheDocument();
  });

  it('should hide first item after trigger second item', async () => {
    render(<Accordion items={mockItems} />);

    const trigger = screen.getByText(firstTriggerName);
    await userEvent.click(trigger);
    expect(screen.getByText(firstContentName)).toBeVisible();

    const trigger2 = screen.getByText(secondTriggerName);
    await userEvent.click(trigger2);
    expect(screen.queryByText(firstContentName)).not.toBeInTheDocument();
  });

  it('should support multiple selection mode', async () => {
    render(<Accordion items={mockItems} type='multiple' />);

    const trigger1 = screen.getByText(firstTriggerName);
    const trigger2 = screen.getByText(secondTriggerName);

    await userEvent.click(trigger1);
    await userEvent.click(trigger2);

    expect(screen.getByText(firstContentName)).toBeVisible();
    expect(screen.getByText(secondContentName)).toBeVisible();
  });

  it('should be open by default in multiple mode', () => {
    render(
      <Accordion
        type='multiple'
        items={mockItems}
        defaultValue={['item-1', 'item-2']}
      />,
    );

    expect(screen.getByText(firstContentName)).toBeVisible();
    expect(screen.getByText(secondContentName)).toBeVisible();
  });

  it('should apply custom classes', async () => {
    const triggerClassName = 'custom-trigger';
    const contentClassName = 'custom-content';

    render(
      <Accordion
        items={mockItems}
        triggerClassName={triggerClassName}
        contentClassName={contentClassName}
      />,
    );

    const trigger = screen.getByText(firstTriggerName);
    expect(trigger).toHaveClass(triggerClassName);

    await userEvent.click(trigger);

    const content = screen.getByText(firstContentName).parentElement;
    expect(content).toHaveClass(contentClassName);
  });

  it('should handle value change callback', async () => {
    const onValueChange = jest.fn();
    render(<Accordion items={mockItems} onValueChange={onValueChange} />);

    const trigger = screen.getByText(firstTriggerName);
    await userEvent.click(trigger);

    expect(onValueChange).toHaveBeenCalledWith('item-1');
  });
});
