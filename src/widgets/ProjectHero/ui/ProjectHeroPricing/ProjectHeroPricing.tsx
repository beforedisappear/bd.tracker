import { Button } from '@/shared/ui/c';
import { Badge, Card } from '@/shared/ui/s';
import { Check } from 'lucide-react';

interface Props {}

export function ProjectHeroPricing({}: Props) {
  const cardTitle = (
    <>
      <h3 className='text-2xl'>Free</h3>
      <Badge variant='secondary' className='text-sm text-primary'>
        Most popular
      </Badge>
    </>
  );

  const headerContent = (
    <div className='order-1'>
      <span className='text-3xl font-bold'>$0</span>
      <span className='text-muted-foreground'> /month</span>
    </div>
  );

  const footerContent = (
    <div className='space-y-4'>
      {['4 Team member', '4 GB Storage', 'Upto 6 pages'].map(
        (benefit: string) => (
          <span key={benefit} className='flex'>
            <Check className='text-green-500' />{' '}
            <h3 className='ml-2'>{benefit}</h3>
          </span>
        ),
      )}
    </div>
  );

  return (
    <Card
      title={cardTitle}
      titleClassName='flex item-center justify-between order-0'
      description='Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.'
      descClassName='order-2'
      className='absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10
      md:static md:w-full'
      headerContent={headerContent}
      footerContent={footerContent}
    >
      <Button className='w-full'>Start Free Trial</Button>
    </Card>
  );
}
